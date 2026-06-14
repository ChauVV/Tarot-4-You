import { useEffect, useRef, useState } from 'react'
import { useAI } from '../context/AIContext'
import { useLang } from '../context/LanguageContext'
import {
  buildFollowupMessages,
  buildReadingMessages,
  parseStructuredReading,
  type ParsedReading,
} from '../utils/aiPrompt'
import type { DrawnCard, FollowUp, Spread, Topic } from '../types'

/** Strip stray markdown so plain prose renders cleanly. */
function strip(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .trim()
}

interface Params {
  active: boolean
  topic: Topic
  question: string
  spread: Spread
  drawn: DrawnCard[]
  focus?: string
}

/**
 * Orchestrates the AI reading: ONE call interprets every card plus a two-part
 * summary; each follow-up question is a separate call. Auto-runs once the
 * reading is active and AI is connected.
 */
export function useAiReading({ active, topic, question, spread, drawn, focus }: Params) {
  const { connected, generate } = useAI()
  const { lang } = useLang()

  const [result, setResult] = useState<ParsedReading | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const [followups, setFollowups] = useState<FollowUp[]>([])
  const [asking, setAsking] = useState(false)
  const startedRef = useRef(false)

  const isRateLimit = (err: unknown): boolean =>
    !!(err as { rateLimited?: boolean } | null)?.rateLimited

  const run = async () => {
    setLoading(true)
    setFailed(false)
    setRateLimited(false)
    setResult(null)
    try {
      const messages = buildReadingMessages(lang, topic, question, spread, drawn, focus)
      const raw = await generate(messages)
      const parsed = parseStructuredReading(raw, drawn.length)
      if (!parsed) throw new Error('unparseable')
      // Clean each section.
      setResult({
        cards: parsed.cards.map((c) => ({ overview: strip(c.overview), message: strip(c.message) })),
        mystic: strip(parsed.mystic),
        advice: strip(parsed.advice),
      })
    } catch (err) {
      if (isRateLimit(err)) setRateLimited(true)
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const ask = async (q: string) => {
    const text = q.trim()
    if (!text || asking) return
    setAsking(true)
    setRateLimited(false)
    try {
      const messages = buildFollowupMessages(lang, topic, question, spread, drawn, text, focus)
      const answer = strip(await generate(messages))
      setFollowups((prev) => [...prev, { question: text, answer }])
    } catch (err) {
      // On a daily-limit error, surface the notice but DON'T record a failed
      // exchange (so history isn't polluted and nothing extra is saved).
      if (isRateLimit(err)) {
        setRateLimited(true)
        return
      }
      setFollowups((prev) => [
        ...prev,
        {
          question: text,
          answer:
            lang === 'vi'
              ? 'Có lỗi khi hỏi AI. Model miễn phí có thể đang bận — hãy thử lại.'
              : 'Something went wrong. The free model may be busy — please try again.',
        },
      ])
    } finally {
      setAsking(false)
    }
  }

  // Auto-run once, when revealed and connected.
  useEffect(() => {
    if (active && connected && !startedRef.current) {
      startedRef.current = true
      void run()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, connected])

  return { connected, result, loading, failed, rateLimited, followups, asking, run, ask }
}
