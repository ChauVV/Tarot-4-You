import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import TarotCardView from '../components/TarotCardView'
import { useLang } from '../context/LanguageContext'
import { cardOfDay, todayKey } from '../utils/cardOfDay'

const SEEN_KEY = 't4y.cotd.seen'

export default function CardOfDay() {
  const { t, bi } = useLang()
  const today = todayKey()
  const drawn = useMemo(() => cardOfDay(today), [today])
  const m = drawn.reversed ? drawn.card.reversed : drawn.card.upright

  const [flipped, setFlipped] = useState(() => localStorage.getItem(SEEN_KEY) === today)

  const flip = () => {
    setFlipped(true)
    localStorage.setItem(SEEN_KEY, today)
  }

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
            <p className="interp-keywords">
              <span className="kw-label">{t('keywords')}:</span> {bi(m.keywords)}
            </p>
            <p className="interp-text">{bi(m.text)}</p>
            <p className="ready-text small">{t('cotdReturn')}</p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  )
}
