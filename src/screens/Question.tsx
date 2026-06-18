import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { SPREADS, TOPICS } from '../data/spreads'
import { getSubTopics } from '../data/questionGuide'
import type { Topic } from '../types'

const DEFAULT_SPREAD: Record<Topic, string> = {
  daily: 'daily',
  love: 'ppf',
  career: 'ppf',
  finance: 'ppf',
  health: 'ppf',
  custom: 'ppf',
}

export default function Question() {
  const { t, bi } = useLang()
  const navigate = useNavigate()
  const { topic, setTopic, setSubtopic, question, setQuestion, spreadId, setSpreadId } = useReading()
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [subId, setSubId] = useState<string | null>(null)

  const subtopics = getSubTopics(topic)

  const pickTopic = (id: Topic) => {
    setTopic(id)
    setSpreadId(DEFAULT_SPREAD[id])
    // Reset the drill-down when the topic changes.
    setSubId(null)
    setSubtopic(null)
    setQuestion('')
  }

  const pickSubtopic = (id: string) => {
    const st = subtopics.find((s) => s.id === id)
    if (!st) return
    setSubId(id)
    setSubtopic(st)
    setQuestion('')
  }

  const goNext = () => {
    setDir(1)
    setStep((s) => s + 1)
  }
  const goBack = () => {
    setDir(-1)
    setStep((s) => s - 1)
  }

  const handleNext = () => {
    if (step < 3) goNext()
    else navigate('/shuffle')
  }

  const variants = {
    initial: (customDir: number) => ({ opacity: 0, x: customDir > 0 ? 40 : -40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.22, ease: 'easeOut' } },
    exit: (customDir: number) => ({
      opacity: 0,
      x: customDir > 0 ? -40 : 40,
      transition: { duration: 0.18, ease: 'easeIn' },
    }),
  }

  const selectedSub = subtopics.find((s) => s.id === subId)

  return (
    <Layout showBack>
      <div className="screen narrow">
        <AnimatePresence mode="wait" custom={dir}>
          {/* ---------- Step 1: Topic ---------- */}
          {step === 1 && (
            <motion.div key="step1" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit">
              <h2 className="screen-title">{t('chooseTopic')}</h2>
              <div className="topic-grid">
                {TOPICS.map((tp, i) => (
                  <motion.button
                    key={tp.id}
                    className={`topic-chip ${topic === tp.id ? 'active' : ''}`}
                    onClick={() => pickTopic(tp.id)}
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="topic-icon">{tp.icon}</span>
                    <span>{bi(tp.label)}</span>
                  </motion.button>
                ))}
              </div>

              <div className="screen-actions">
                <button className="btn btn-primary" onClick={handleNext}>
                  {t('next')}
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------- Step 2: Drill-down (focus + question) ---------- */}
          {step === 2 && (
            <motion.div key="step2" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit">
              <h2 className="screen-title">{t('chooseFocus')}</h2>

              {topic === 'daily' ? (
                <p className="field-hint">{t('dailyFocusNote')}</p>
              ) : (
                <>
                  {subtopics.length > 0 && (
                    <>
                      <span className="field-label">{t('chooseAspect')}</span>
                      <div className="subtopic-grid">
                        {subtopics.map((st, i) => (
                          <motion.button
                            key={st.id}
                            className={`topic-chip ${subId === st.id ? 'active' : ''}`}
                            onClick={() => pickSubtopic(st.id)}
                            initial={{ opacity: 0, y: 14, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            <span className="topic-icon">{st.icon}</span>
                            <span>{bi(st.label)}</span>
                          </motion.button>
                        ))}
                      </div>
                    </>
                  )}

                  {selectedSub && (
                    <>
                      <span className="field-label">{t('suggestedQuestions')}</span>
                      <div className="suggest-list">
                        {selectedSub.questions.map((q) => {
                          const text = bi(q)
                          return (
                            <button
                              key={text}
                              className={`suggest-chip ${question === text ? 'active' : ''}`}
                              onClick={() => setQuestion(text)}
                            >
                              {text}
                            </button>
                          )
                        })}
                      </div>
                    </>
                  )}

                  {(selectedSub || subtopics.length === 0) && (
                    <>
                      <label className="field-label" htmlFor="q">
                        {t('yourQuestion')}
                      </label>
                      <textarea
                        id="q"
                        className="question-input"
                        placeholder={t('questionPlaceholder')}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={3}
                      />
                      <p className="field-hint">
                        {subtopics.length > 0 ? t('pickOrWrite') : t('optionalQuestion')}
                      </p>
                    </>
                  )}
                </>
              )}

              <div className="screen-actions">
                <button className="btn btn-secondary" onClick={goBack}>
                  {t('back')}
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  {t('next')}
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------- Step 3: Spread ---------- */}
          {step === 3 && (
            <motion.div key="step3" custom={dir} variants={variants} initial="initial" animate="animate" exit="exit">
              <h2 className="screen-title">{t('chooseSpread')}</h2>
              <div className="spread-list">
                {SPREADS.map((s, i) => (
                  <motion.button
                    key={s.id}
                    className={`spread-card ${spreadId === s.id ? 'active' : ''}`}
                    onClick={() => setSpreadId(s.id)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: i * 0.07, ease: 'easeOut' }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="spread-card-head">
                      <span className="spread-name">{bi(s.name)}</span>
                      <span className="spread-count">
                        {s.count} {t('cards')}
                      </span>
                    </div>
                    <p className="spread-desc">{bi(s.description)}</p>
                  </motion.button>
                ))}
              </div>

              <div className="screen-actions">
                <button className="btn btn-secondary" onClick={goBack}>
                  {t('back')}
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  {t('next')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}
