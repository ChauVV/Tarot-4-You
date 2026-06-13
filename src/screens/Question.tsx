import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { SPREADS, TOPICS } from '../data/spreads'
import type { Topic } from '../types'

const DEFAULT_SPREAD: Record<Topic, string> = {
  daily: 'daily',
  love: 'ppf',
  career: 'ppf',
  finance: 'ppf',
  custom: 'ppf',
}

export default function Question() {
  const { t, bi } = useLang()
  const navigate = useNavigate()
  const { topic, setTopic, question, setQuestion, spreadId, setSpreadId } = useReading()

  const pickTopic = (id: Topic) => {
    setTopic(id)
    setSpreadId(DEFAULT_SPREAD[id])
  }

  return (
    <Layout showBack>
      <motion.div
        className="screen narrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="screen-title">{t('chooseTopic')}</h2>
        <div className="topic-grid">
          {TOPICS.map((tp) => (
            <button
              key={tp.id}
              className={`topic-chip ${topic === tp.id ? 'active' : ''}`}
              onClick={() => pickTopic(tp.id)}
            >
              <span className="topic-icon">{tp.icon}</span>
              <span>{bi(tp.label)}</span>
            </button>
          ))}
        </div>

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
        <p className="field-hint">{t('optionalQuestion')}</p>

        <h2 className="screen-title">{t('chooseSpread')}</h2>
        <div className="spread-list">
          {SPREADS.map((s) => (
            <button
              key={s.id}
              className={`spread-card ${spreadId === s.id ? 'active' : ''}`}
              onClick={() => setSpreadId(s.id)}
            >
              <div className="spread-card-head">
                <span className="spread-name">{bi(s.name)}</span>
                <span className="spread-count">
                  {s.count} {t('cards')}
                </span>
              </div>
              <p className="spread-desc">{bi(s.description)}</p>
            </button>
          ))}
        </div>

        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigate('/shuffle')}>
            {t('next')}
          </button>
        </div>
      </motion.div>
    </Layout>
  )
}
