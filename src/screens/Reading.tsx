import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import TarotCardView from '../components/TarotCardView'
import AIReadingPanel from '../components/AIReadingPanel'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { getSpread } from '../data/spreads'
import { useJournal, makeId } from '../hooks/useJournal'
import { deepInterpret } from '../utils/interpret'

export default function Reading() {
  const { t, bi } = useLang()
  const navigate = useNavigate()
  const { topic, question, spreadId, drawn, reset } = useReading()
  const spread = getSpread(spreadId)
  const { add } = useJournal()

  const [flipped, setFlipped] = useState<boolean[]>(() => drawn.map(() => false))
  const [deepOpen, setDeepOpen] = useState<boolean[]>(() => drawn.map(() => false))
  const [savedId, setSavedId] = useState<string | null>(null)
  const [aiSummary, setAiSummary] = useState('')
  const [interpretReady, setInterpretReady] = useState(false)

  useEffect(() => {
    if (!drawn.length || !spread) navigate('/question', { replace: true })
  }, [drawn.length, spread, navigate])

  if (!drawn.length || !spread) return null

  const flip = (i: number) => setFlipped((p) => p.map((v, idx) => (idx === i ? true : v)))
  const toggleDeep = (i: number) => setDeepOpen((p) => p.map((v, idx) => (idx === i ? !v : v)))
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
      aiSummary: aiSummary || undefined,
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
                      <div className="interp-deep">
                        <button
                          className="deep-toggle"
                          onClick={() => toggleDeep(i)}
                          aria-expanded={deepOpen[i]}
                        >
                          <span className="deep-label">✦ {t('inDepth')}</span>
                          <span className={`deep-chevron ${deepOpen[i] ? 'open' : ''}`}>›</span>
                        </button>
                        <AnimatePresence>
                          {deepOpen[i] && (
                            <motion.div
                              className="deep-body"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="interp-text">{bi(deepInterpret(d, pos, topic))}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <AIReadingPanel
          active={allFlipped}
          topic={topic}
          question={question}
          spread={spread}
          drawn={drawn}
          onResult={setAiSummary}
          onReadyChange={setInterpretReady}
        />

        <div className="screen-actions column">
          {!allFlipped && (
            <button className="btn btn-ghost" onClick={flipAll}>
              ✦ {t('reveal')}
            </button>
          )}
          {allFlipped && (
            <button className="btn btn-secondary" onClick={save} disabled={!!savedId || !interpretReady}>
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
