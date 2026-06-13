import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { CARD_BACK } from '../data/cards'
import { useLang } from '../context/LanguageContext'

type Phase = 'idle' | 'shuffling' | 'done'

const FAN = [-28, -18, -9, 0, 9, 18, 28]

export default function Shuffle() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<number[]>([])

  // Clear any pending timers if the user leaves before the auto-advance fires.
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const shuffle = () => {
    if (phase !== 'idle') return
    setPhase('shuffling')
    timers.current.push(
      window.setTimeout(() => {
        setPhase('done')
        // Pause on "ready" briefly, then fan the cards out automatically.
        timers.current.push(window.setTimeout(() => navigate('/draw'), 2000))
      }, 2400),
    )
  }

  return (
    <Layout showBack center>
      <motion.div className="screen narrow center-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="screen-title">{t('shuffleTitle')}</h2>
        <p className="field-hint">{t('shuffleHint')}</p>

        <div className="shuffle-stage">
          {FAN.map((deg, i) => (
            <motion.img
              key={i}
              src={CARD_BACK}
              alt=""
              className="shuffle-card"
              draggable={false}
              initial={{ rotate: deg, x: 0, y: 0 }}
              animate={
                phase === 'shuffling'
                  ? {
                      rotate: [deg, deg + (i % 2 ? 40 : -40), deg],
                      x: [0, i % 2 ? 70 : -70, 0],
                      y: [0, -24, 0],
                    }
                  : { rotate: phase === 'done' ? deg * 0.5 : deg, x: 0, y: 0 }
              }
              transition={{
                duration: 0.7,
                repeat: phase === 'shuffling' ? Infinity : 0,
                delay: i * 0.05,
                ease: 'easeInOut',
              }}
              style={{ zIndex: i }}
            />
          ))}
        </div>

        <div className="screen-actions column">
          {phase !== 'done' ? (
            <button className="btn btn-primary" onClick={shuffle} disabled={phase === 'shuffling'}>
              {phase === 'shuffling' ? t('shuffling') : t('shuffleNow')}
            </button>
          ) : (
            <p className="ready-text">✦ {t('shuffleDone')} ✦</p>
          )}
        </div>
      </motion.div>
    </Layout>
  )
}
