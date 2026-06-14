import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '../components/Layout'
import TarotCardView from '../components/TarotCardView'
import ConfirmDialog from '../components/ConfirmDialog'
import { useLang } from '../context/LanguageContext'
import { useJournal } from '../hooks/useJournal'
import { getCard } from '../data/cards'
import { getSpread, TOPICS } from '../data/spreads'
import { summarize } from '../utils/summary'
import { deepInterpret } from '../utils/interpret'
import type { DrawnCard, JournalEntry, Topic } from '../types'

function topicLabel(id: Topic, lang: 'vi' | 'en') {
  const tp = TOPICS.find((x) => x.id === id)
  return tp ? tp.label[lang] : id
}

/** Rebuild the drawn cards (card + orientation) from a stored entry. */
function reconstruct(entry: JournalEntry): DrawnCard[] {
  return entry.cards
    .map((c) => {
      const card = getCard(c.cardId)
      return card ? { card, reversed: c.reversed } : null
    })
    .filter((d): d is DrawnCard => d !== null)
}

export default function Journal() {
  const { t, bi, lang } = useLang()
  const { entries, remove, clear } = useJournal()
  const [openId, setOpenId] = useState<string | null>(null)
  const [deepKeys, setDeepKeys] = useState<Set<string>>(() => new Set())
  const [confirmClearOpen, setConfirmClearOpen] = useState(false)

  const toggleDeep = (key: string) =>
    setDeepKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <Layout showBack>
      <div className="screen">
        <div className="journal-head">
          <h2 className="screen-title">{t('journal')}</h2>
          {entries.length > 0 && (
            <button className="btn btn-ghost small" onClick={() => setConfirmClearOpen(true)}>
              {t('clearAll')}
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <p className="empty-state">{t('journalEmpty')}</p>
        ) : (
          <ul className="journal-list">
            {entries.map((e) => {
              const spread = getSpread(e.spreadId)
              const drawn = reconstruct(e)
              const open = openId === e.id
              return (
                <li key={e.id} className="journal-entry">
                  <div className="entry-meta">
                    <span className="entry-date">{fmt(e.date)}</span>
                    <span className="entry-topic">{topicLabel(e.topic, lang)}</span>
                  </div>
                  {e.question.trim() && <p className="entry-question">“{e.question.trim()}”</p>}
                  {spread && <p className="entry-spread">{bi(spread.name)}</p>}

                  {!open && (
                    <div className="entry-cards">
                      {drawn.map((d, i) => (
                        <figure key={i} className="entry-card">
                          <img
                            src={d.card.image}
                            alt={bi(d.card.name)}
                            style={{ transform: d.reversed ? 'rotate(180deg)' : undefined }}
                          />
                          <figcaption>
                            {bi(d.card.name)}
                            <span className={d.reversed ? 'rev' : 'up'}>
                              {' · '}
                              {d.reversed ? t('reversed') : t('upright')}
                            </span>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  <AnimatePresence initial={false}>
                    {open && spread && (
                      <motion.div
                        className="entry-detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className={`reading-spread layout-${spread.layout}`}>
                          {drawn.map((d, i) => {
                            const pos = spread.positions[i]
                            const m = d.reversed ? d.card.reversed : d.card.upright
                            return (
                              <div key={i} className="reading-slot">
                                {pos && (
                                  <>
                                    <span className="pos-title">{bi(pos.title)}</span>
                                    <span className="pos-hint">{bi(pos.hint)}</span>
                                  </>
                                )}
                                <TarotCardView drawn={d} faceUp showLabel />
                                {(() => {
                                  const aiCard = e.aiCards?.[i]
                                  if (aiCard && (aiCard.overview || aiCard.message)) {
                                    return (
                                      <div className="interp interp-static">
                                        <p className="interp-keywords">
                                          <span className="kw-label">{t('keywords')}:</span> {bi(m.keywords)}
                                        </p>
                                        {aiCard.overview && (
                                          <div className="ai-section">
                                            <span className="ai-section-label">✦ {t('overview')}</span>
                                            <p className="interp-text">{aiCard.overview}</p>
                                          </div>
                                        )}
                                        {aiCard.message && (
                                          <div className="ai-section">
                                            <span className="ai-section-label">✦ {t('messageForYou')}</span>
                                            <p className="interp-text">{aiCard.message}</p>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  }
                                  return (
                                    <div className="interp interp-static">
                                      <p className="interp-keywords">
                                        <span className="kw-label">{t('keywords')}:</span> {bi(m.keywords)}
                                      </p>
                                      <p className="interp-text">{bi(m.text)}</p>
                                      <div className="interp-deep">
                                        <button
                                          className="deep-toggle"
                                          onClick={() => toggleDeep(`${e.id}:${i}`)}
                                          aria-expanded={deepKeys.has(`${e.id}:${i}`)}
                                        >
                                          <span className="deep-label">✦ {t('inDepth')}</span>
                                          <span className={`deep-chevron ${deepKeys.has(`${e.id}:${i}`) ? 'open' : ''}`}>
                                            ›
                                          </span>
                                        </button>
                                        <AnimatePresence>
                                          {deepKeys.has(`${e.id}:${i}`) && (
                                            <motion.div
                                              className="deep-body"
                                              initial={{ opacity: 0, height: 0 }}
                                              animate={{ opacity: 1, height: 'auto' }}
                                              exit={{ opacity: 0, height: 0 }}
                                              transition={{ duration: 0.3 }}
                                            >
                                              <p className="interp-text">{bi(deepInterpret(d, pos, e.topic))}</p>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                  )
                                })()}
                              </div>
                            )
                          })}
                        </div>

                        <div className="reading-summary">
                          {e.aiMystic || e.aiAdvice ? (
                            <>
                              {e.aiMystic && (
                                <div className="summary-block">
                                  <h4 className="summary-title">✦ {t('mysticMessage')} ✦</h4>
                                  <p className="summary-text">{e.aiMystic}</p>
                                </div>
                              )}
                              {e.aiAdvice && (
                                <div className="summary-block">
                                  <h4 className="summary-title">✦ {t('combinedAdvice')} ✦</h4>
                                  <p className="summary-text">{e.aiAdvice}</p>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="summary-block">
                              <h4 className="summary-title">✦ {t('summary')} ✦</h4>
                              <p className="summary-text">
                                {e.aiSummary ? e.aiSummary : bi(summarize(drawn, spread))}
                              </p>
                            </div>
                          )}
                        </div>

                        {e.followups && e.followups.length > 0 && (
                          <div className="followup-thread followup-thread--journal">
                            {e.followups.map((f, i) => (
                              <div key={i} className="followup-item">
                                <p className="followup-q">“{f.question}”</p>
                                <p className="followup-a">{f.answer}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="entry-actions">
                    <button className="btn btn-ghost small" onClick={() => setOpenId(open ? null : e.id)}>
                      {open ? t('hideDetails') : t('viewDetails')}
                    </button>
                    <button className="btn btn-ghost small danger" onClick={() => remove(e.id)}>
                      {t('delete')}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={confirmClearOpen}
        title={t('confirmClear')}
        message={t('confirmClearMsg')}
        confirmLabel={t('clearAll')}
        cancelLabel={t('cancel')}
        danger
        onConfirm={() => {
          clear()
          setConfirmClearOpen(false)
        }}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </Layout>
  )
}
