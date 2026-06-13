import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAI } from '../context/AIContext'
import { useLang } from '../context/LanguageContext'
import { buildReadingMessages } from '../utils/aiPrompt'
import { summarize } from '../utils/summary'
import type { DrawnCard, Spread, Topic } from '../types'

/** Remove leftover markdown so plain prose renders cleanly. */
function stripMarkdown(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .trim()
}

interface Props {
  /** Becomes true once all cards are revealed. */
  active: boolean
  topic: Topic
  question: string
  spread: Spread
  drawn: DrawnCard[]
}

/**
 * The single "Summary" block. It shows the static interpretation by default;
 * if the user has connected OpenRouter it interprets with AI automatically
 * (showing a loading state), and falls back to the static text on failure.
 */
export default function AIReadingPanel({ active, topic, question, spread, drawn }: Props) {
  const { t, bi, lang } = useLang()
  const { connected, connecting, connect, disconnect, generate } = useAI()

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const startedRef = useRef(false)

  const fallback = bi(summarize(drawn, spread))

  const run = async () => {
    setLoading(true)
    setFailed(false)
    setText('')
    try {
      const messages = buildReadingMessages(lang, topic, question, spread, drawn)
      setText(stripMarkdown(await generate(messages)))
    } catch {
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  // When connected, interpret automatically once the reading is revealed.
  useEffect(() => {
    if (active && connected && !startedRef.current) {
      startedRef.current = true
      void run()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, connected])

  const connectThenRun = async () => {
    try {
      await connect()
      startedRef.current = true
      void run()
    } catch {
      /* user closed the popup */
    }
  }

  if (!active) return null

  const showAI = connected && !!text

  return (
    <motion.section
      className="reading-summary"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="summary-head">
        <h3 className="summary-title">
          ✦ {t('summary')} ✦{showAI && <span className="ai-badge">✨ AI</span>}
        </h3>
        {connected && (
          <button className="ai-disconnect" onClick={disconnect}>
            {t('aiDisconnect')}
          </button>
        )}
      </div>

      {connected && loading ? (
        <p className="ai-thinking">
          <span className="ai-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          {t('aiThinking')}
        </p>
      ) : (
        <>
          <p className="summary-text">{showAI ? text : fallback}</p>

          {connected && (text || failed) && (
            <button className="btn btn-ghost small summary-action" onClick={run}>
              {t('aiRegenerate')}
            </button>
          )}

          {!connected && (
            <button
              className="btn btn-ghost small summary-action"
              onClick={connectThenRun}
              disabled={connecting}
            >
              {connecting ? t('aiConnecting') : `✨ ${t('aiConnect')}`}
            </button>
          )}
        </>
      )}
    </motion.section>
  )
}
