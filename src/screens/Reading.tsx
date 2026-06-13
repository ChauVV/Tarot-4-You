import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import TarotCardView from '../components/TarotCardView'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { getSpread } from '../data/spreads'
import { useJournal, makeId } from '../hooks/useJournal'
import { summarize } from '../utils/summary'

export default function Reading() {
  const { t, bi } = useLang()
  const navigate = useNavigate()
  const { topic, question, spreadId, drawn, reset } = useReading()
  const spread = getSpread(spreadId)
  const { add } = useJournal()

  const [flipped, setFlipped] = useState<boolean[]>(() => drawn.map(() => false))
  const [savedId, setSavedId] = useState<string | null>(null)

  useEffect(() => {
    if (!drawn.length || !spread) navigate('/question', { replace: true })
  }, [drawn.length, spread, navigate])

  if (!drawn.length || !spread) return null

  const flip = (i: number) => setFlipped((p) => p.map((v, idx) => (idx === i ? true : v)))
  const flipAll = () => setFlipped(drawn.map(() => true))
  const allFlipped = flipped.every(Boolean)

  const save = () => {
    if (savedId) return
    const id = makeId()
    add({
      id,
      date: new Date().toISOString(),
      topic,
      question,
      spreadId,
      cards: drawn.map((d) => ({ cardId: d.card.id, reversed: d.reversed })),
    })
    setSavedId(id)
  }

  const newReading = () => {
    reset()
    navigate('/question')
  }

  return (
    <Layout showBack>
      <div className="screen">
        <h2 className="screen-title">{t('readingTitle')}</h2>
        {question.trim() && <p className="reading-question">“{question.trim()}”</p>}

        <div className={`reading-spread layout-${spread.layout}`}>
          {drawn.map((d, i) => {
            const pos = spread.positions[i]
            const m = d.reversed ? d.card.reversed : d.card.upright
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
                  onClick={flipped[i] ? undefined : () => flip(i)}
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
                      <p className="interp-keywords">
                        <span className="kw-label">{t('keywords')}:</span> {bi(m.keywords)}
                      </p>
                      <p className="interp-text">{bi(m.text)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
          {allFlipped && (
            <motion.section
              className="reading-summary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="summary-title">✦ {t('summary')} ✦</h3>
              <p className="summary-text">{bi(summarize(drawn, spread))}</p>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="screen-actions column">
          {!allFlipped && (
            <button className="btn btn-ghost" onClick={flipAll}>
              ✦ {t('reveal')}
            </button>
          )}
          {allFlipped && (
            <button className="btn btn-secondary" onClick={save} disabled={!!savedId}>
              {savedId ? t('saved') : t('saveToJournal')}
            </button>
          )}
          <button className="btn btn-primary" onClick={newReading}>
            {t('newReading')}
          </button>
        </div>
      </div>
    </Layout>
  )
}
