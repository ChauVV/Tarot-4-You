import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import TarotCardView from '../components/TarotCardView'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { useAI } from '../context/AIContext'
import { getSpread } from '../data/spreads'
import { useJournal, makeId } from '../hooks/useJournal'
import { useAiReading } from '../hooks/useAiReading'
import { summarize } from '../utils/summary'

export default function Reading() {
  const { t, bi } = useLang()
  const navigate = useNavigate()
  const { topic, subtopic, question, spreadId, drawn, reset } = useReading()
  const spread = getSpread(spreadId)
  const { add, update } = useJournal()
  const { connected, connecting, connect } = useAI()

  const [flipped, setFlipped] = useState<boolean[]>(() => drawn.map(() => false))
  const [savedId, setSavedId] = useState<string | null>(null)
  const [followInput, setFollowInput] = useState('')
  const savedRef = useRef(false)

  const focus = subtopic ? bi(subtopic.label) : undefined
  const allFlipped = flipped.length > 0 && flipped.every(Boolean)

  const ai = useAiReading({
    active: allFlipped,
    topic,
    question,
    spread: spread!,
    drawn,
    focus,
  })

  useEffect(() => {
    if (!drawn.length || !spread) navigate('/question', { replace: true })
  }, [drawn.length, spread, navigate])

  // Save the reading as soon as the cards are revealed — for EVERY outcome
  // (no AI, AI success, AI failure, rate limit). This guarantees the per-card
  // interpretations are always persisted; the AI text (if any) is layered on
  // afterwards by the effect below. The Journal renders the static per-card
  // meaning whenever `aiCards` is absent, so a base entry is enough.
  useEffect(() => {
    if (!allFlipped || savedRef.current || !spread) return
    savedRef.current = true
    const id = makeId()
    add({
      id,
      date: new Date().toISOString(),
      topic,
      question,
      spreadId,
      cards: drawn.map((d) => ({ cardId: d.card.id, reversed: d.reversed })),
      followups: [],
    })
    setSavedId(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFlipped])

  // Enrich the saved entry with the AI per-card interpretations + summary once
  // (or whenever) the reading is ready — including after a manual regenerate.
  useEffect(() => {
    if (!ai.result || !savedId) return
    update(savedId, {
      aiCards: ai.result.cards,
      aiMystic: ai.result.mystic,
      aiAdvice: ai.result.advice,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai.result, savedId])

  // Keep the saved entry's follow-ups in sync.
  useEffect(() => {
    if (savedId && ai.followups.length) update(savedId, { followups: ai.followups })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai.followups])

  if (!drawn.length || !spread) return null

  const flipAll = () => setFlipped(drawn.map(() => true))

  const newReading = () => {
    reset()
    navigate('/question')
  }

  const askFollowup = () => {
    const q = followInput.trim()
    if (!q) return
    setFollowInput('')
    void ai.ask(q)
  }

  // Suggested follow-ups: the chosen subtopic's questions, minus what's used.
  const askedSet = new Set(ai.followups.map((f) => f.question))
  const suggestions = (subtopic?.questions ?? [])
    .map((q) => bi(q))
    .filter((text) => text !== question && !askedSet.has(text))
    .slice(0, 5)

  const usingAI = connected
  // Every revealed reading is auto-saved (with its per-card interpretations),
  // so there is no separate manual-save path anymore.

  return (
    <Layout showBack>
      <div className="screen">
        <h2 className="screen-title">{t('readingTitle')}</h2>
        {question.trim() && <p className="reading-question">“{question.trim()}”</p>}

        <div className={`reading-spread layout-${spread.layout}`}>
          {drawn.map((d, i) => {
            const pos = spread.positions[i]
            const m = d.reversed ? d.card.reversed : d.card.upright
            const card = ai.result?.cards[i]
            return (
              <motion.div
                key={i}
                className="reading-slot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="pos-title">{bi(pos.title)}</span>
                <span className="pos-hint">{bi(pos.hint)}</span>

                <TarotCardView
                  drawn={d}
                  faceUp={flipped[i]}
                  onClick={flipped[i] ? undefined : flipAll}
                  showLabel
                />

                <AnimatePresence>
                  {flipped[i] && (
                    <motion.div
                      className="interp"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.4 }}
                    >
                      {usingAI ? (
                        card && (card.overview || card.message) ? (
                          <>
                            {card.overview && (
                              <div className="ai-section">
                                <span className="ai-section-label">✦ {t('overview')}</span>
                                <p className="interp-text">{card.overview}</p>
                              </div>
                            )}
                            {card.message && (
                              <div className="ai-section">
                                <span className="ai-section-label">✦ {t('messageForYou')}</span>
                                <p className="interp-text">{card.message}</p>
                              </div>
                            )}
                          </>
                        ) : ai.failed ? (
                          // AI errored — fall back to the static meaning.
                          <>
                            <p className="interp-keywords">
                              <span className="kw-label">{t('keywords')}:</span> {bi(m.keywords)}
                            </p>
                            <p className="interp-text">{bi(m.text)}</p>
                          </>
                        ) : (
                          <p className="ai-thinking">
                            <span className="ai-dots" aria-hidden>
                              <span />
                              <span />
                              <span />
                            </span>
                            {t('interpreting')}
                          </p>
                        )
                      ) : (
                        // No AI connected — static meaning only.
                        <>
                          <p className="interp-keywords">
                            <span className="kw-label">{t('keywords')}:</span> {bi(m.keywords)}
                          </p>
                          <p className="interp-text">{bi(m.text)}</p>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ---------- Summary ---------- */}
        {allFlipped && (
          <section className="reading-summary">
            {usingAI && ai.result ? (
              <>
                <div className="summary-block">
                  <h3 className="summary-title">✦ {t('mysticMessage')} ✦</h3>
                  <p className="summary-text">{ai.result.mystic}</p>
                </div>
                {ai.result.advice && (
                  <div className="summary-block">
                    <h3 className="summary-title">✦ {t('combinedAdvice')} ✦</h3>
                    <p className="summary-text">{ai.result.advice}</p>
                  </div>
                )}
              </>
            ) : usingAI && ai.loading ? (
              <p className="ai-thinking">
                <span className="ai-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                {t('interpreting')}
              </p>
            ) : (
              <div className="summary-block">
                {connected && ai.rateLimited && (
                  <div className="ai-limit-note">
                    <strong>⚠ {t('aiLimitTitle')}</strong>
                    <p>{t('aiLimitNote')}</p>
                  </div>
                )}
                <h3 className="summary-title">✦ {t('summary')} ✦</h3>
                <p className="summary-text">{bi(summarize(drawn, spread))}</p>
                {!connected && (
                  <button
                    className="btn btn-ghost small summary-action"
                    onClick={() => connect().catch(() => {})}
                    disabled={connecting}
                  >
                    {connecting ? '…' : `✨ ${t('aiConnect')}`}
                  </button>
                )}
                {connected && ai.failed && !ai.rateLimited && (
                  <button className="btn btn-ghost small summary-action" onClick={ai.run}>
                    {t('aiRegenerate')}
                  </button>
                )}
              </div>
            )}
          </section>
        )}

        {/* ---------- Follow-up ---------- */}
        {usingAI && ai.result && (
          <section className="followup">
            <div className="followup-head">
              <span className="followup-spark">✦</span>
              <h3 className="followup-title">{t('askMoreTitle')}</h3>
              <p className="followup-hint">{t('askMoreHint')}</p>
            </div>

            {ai.followups.length > 0 && (
              <div className="followup-thread">
                {ai.followups.map((f, i) => (
                  <div key={i} className="followup-item">
                    <p className="followup-q">“{f.question}”</p>
                    <p className="followup-a">{f.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="followup-suggests">
                {suggestions.map((text) => (
                  <button
                    key={text}
                    className="followup-chip"
                    onClick={() => void ai.ask(text)}
                    disabled={ai.asking}
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}

            {ai.rateLimited && (
              <div className="ai-limit-note">
                <strong>⚠ {t('aiLimitTitle')}</strong>
                <p>{t('aiLimitNote')}</p>
              </div>
            )}

            <div className="followup-input-row">
              <textarea
                className="question-input"
                placeholder={t('askPlaceholder')}
                value={followInput}
                onChange={(e) => setFollowInput(e.target.value)}
                rows={2}
              />
              <button
                className="btn btn-primary"
                onClick={askFollowup}
                disabled={ai.asking || !followInput.trim()}
              >
                {ai.asking ? t('asking') : t('ask')}
              </button>
            </div>
          </section>
        )}

        {/* ---------- Actions ---------- */}
        <div className="screen-actions column">
          {!allFlipped && (
            <button className="btn btn-ghost" onClick={flipAll}>
              ✦ {t('reveal')}
            </button>
          )}
          {savedId && <p className="auto-saved-note">{t('autoSaved')}</p>}
          <button className="btn btn-primary" onClick={newReading}>
            {t('newReading')}
          </button>
        </div>
      </div>
    </Layout>
  )
}
