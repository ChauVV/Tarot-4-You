import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'

export default function Home() {
  const { t } = useLang()
  const navigate = useNavigate()
  const { reset } = useReading()

  const begin = () => {
    reset()
    navigate('/question')
  }

  return (
    <Layout center>
      <motion.div
        className="home"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="home-emblem">
          <span className="moon">☾</span>
          <span className="sparkle s1">✦</span>
          <span className="sparkle s2">✧</span>
          <span className="sparkle s3">✦</span>
        </div>

        <h1 className="home-title">Tarot 4 You</h1>
        <p className="home-tagline">{t('tagline')}</p>

        <div className="home-actions">
          <button className="btn btn-primary" onClick={begin}>
            {t('start')}
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/card-of-the-day')}>
            {t('cardOfDay')}
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/journal')}>
            {t('journal')}
          </button>
        </div>
      </motion.div>
    </Layout>
  )
}
