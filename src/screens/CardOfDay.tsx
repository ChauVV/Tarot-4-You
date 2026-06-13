import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import TarotCardView from '../components/TarotCardView'
import { useAI } from '../context/AIContext'
import { useLang } from '../context/LanguageContext'
import { buildCotdMessages } from '../utils/aiPrompt'
import { cardOfDay, todayKey } from '../utils/cardOfDay'

const SEEN_KEY = 't4y.cotd.seen'

/** Remove leftover markdown so plain prose renders cleanly. */
function stripMarkdown(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .trim()
}

export default function CardOfDay() {
  const { t, bi, lang } = useLang()
  const today = todayKey()
  const drawn = useMemo(() => cardOfDay(today), [today])
  const m = drawn.reversed ? drawn.card.reversed : drawn.card.upright

  const [flipped, setFlipped] = useState(() => localStorage.getItem(SEEN_KEY) === today)

  // AI state
  const { connected, connecting, connect, generate } = useAI()
  const [aiText, setAiText] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiFailed, setAiFailed] = useState(false)
  const startedRef = useRef(false)

  const flip = () => {
    setFlipped(true)
    localStorage.setItem(SEEN_KEY, today)
  }

  const runAI = async () => {
    setAiLoading(true)
    setAiFailed(false)
    setAiText('')
    try {
      const messages = buildCotdMessages(lang, drawn)
      setAiText(stripMarkdown(await generate(messages)))
    } catch {
      setAiFailed(true)
    } finally {
      setAiLoading(false)
    }
  }

  // Auto-run AI when card is flipped and AI is connected
  useEffect(() => {
    if (flipped && connected && !startedRef.current) {
      startedRef.current = true
      void runAI()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped, connected])

  const connectThenRun = async () => {
    try {
      await connect()
      startedRef.current = true
      void runAI()
    } catch {
      /* user closed the popup */
    }
  }

  const showAI = connected && !!aiText
  const showDefault = !connected || aiFailed || (!aiLoading && !aiText)

  return (
    <Layout showBack center>
      <motion.div className="screen narrow center-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="screen-title">{t('cotdTitle')}</h2>
        <p className="field-hint">{new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}</p>

        <div className="cotd-card">
          <TarotCardView drawn={drawn} faceUp={flipped} onClick={flipped ? undefined : flip} showLabel />
        </div>

        {flipped && (
          <motion.div className="interp center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* AI loading state */}
            {connected && aiLoading && (
              <p className="ai-thinking">
                <span className="ai-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                {t('aiThinking')}
              </p>
            )}

            {/* AI result — hides default when successful */}
            {showAI && (
              <>
                <p className="interp-text">
                  <span className="ai-badge" style={{ marginRight: 6 }}>✨ AI</span>
                  {aiText}
                </p>
                <button className="btn btn-ghost small summary-action" onClick={runAI}>
                  {t('aiRegenerate')}
                </button>
              </>
            )}

            {/* Default result — shown when AI not connected, failed, or hasn't returned */}
            {showDefault && !aiLoading && (
              <>
                <p className="interp-keywords">
                  <span className="kw-label">{t('keywords')}:</span> {bi(m.keywords)}
                </p>
                <p className="interp-text">{bi(m.text)}</p>
              </>
            )}

            {/* Connect AI button when not connected */}
            {!connected && (
              <button
                className="btn btn-ghost small summary-action"
                onClick={connectThenRun}
                disabled={connecting}
              >
                {connecting ? t('aiConnecting') : `✨ ${t('aiConnect')}`}
              </button>
            )}

            <p className="ready-text small">{t('cotdReturn')}</p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  )
}
