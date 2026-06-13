import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { CARD_BACK } from '../data/cards'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { getSpread } from '../data/spreads'
import { buildShuffledDeck } from '../utils/draw'

type Phase = 'idle' | 'shuffling' | 'fanned'

/** Original riffle stack (the look we want to keep during shuffling). */
const STACK = [-28, -18, -9, 0, 9, 18, 28]

/** Fan the whole deck (78 cards) across this arc, in degrees. */
const FAN_COUNT = 78
const FAN_ARC = 290

export default function Shuffle() {
  const { t } = useLang()
  const navigate = useNavigate()
  const { spreadId, setDrawn } = useReading()
  const spread = getSpread(spreadId)
  const count = spread?.count ?? 1

  const [phase, setPhase] = useState<Phase>('idle')
  const [selected, setSelected] = useState<number[]>([])
  const deck = useMemo(() => buildShuffledDeck(), [])
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  if (!spread) return null

  const shuffle = () => {
    if (phase !== 'idle') return
    setPhase('shuffling')
    timers.current.push(window.setTimeout(() => setPhase('fanned'), 2400))
  }

  const toggle = (i: number) => {
    setSelected((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i)
      if (prev.length >= count) return prev
      return [...prev, i]
    })
  }

  const reveal = () => {
    setDrawn(selected.map((i) => deck[i]))
    navigate('/reading')
  }

  const fanned = phase === 'fanned'

  return (
    <Layout showBack center>
      <motion.div className="screen narrow center-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="screen-title">{fanned ? t('drawTitle') : t('shuffleTitle')}</h2>
        <p className="field-hint">{fanned ? t('drawHint') : t('shuffleHint')}</p>
        {fanned && (
          <p className="draw-counter">
            {t('selected')}: {selected.length} / {count}
          </p>
        )}

        {!fanned ? (
          // Original riffle stack — kept intact.
          <div className="shuffle-stage">
            {STACK.map((deg, i) => (
              <motion.img
                key={i}
                src={CARD_BACK}
                alt=""
                className="shuffle-card"
                draggable={false}
                initial={{ rotate: deg }}
                animate={
                  phase === 'shuffling'
                    ? {
                      rotate: [deg, deg + (i % 2 ? 40 : -40), deg],
                      x: [0, i % 2 ? 70 : -70, 0],
                      y: [0, -24, 0],
                    }
                    : { rotate: deg, x: 0, y: 0 }
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
        ) : (
          // Fan the deck out across 180° to pick from.
          <div className="deck-stage">
            {deck.slice(0, FAN_COUNT).map((_, i) => {
              const rot = -FAN_ARC / 2 + (i / (FAN_COUNT - 1)) * FAN_ARC
              const order = selected.indexOf(i)
              const isSel = order !== -1
              return (
                <motion.button
                  key={i}
                  type="button"
                  className={`deck-card pickable ${isSel ? 'selected' : ''}`}
                  onClick={() => toggle(i)}
                  aria-pressed={isSel}
                  initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: rot, scale: 1, opacity: 1, y: isSel ? -40 : 0 }}
                  whileHover={{ y: isSel ? -40 : -18 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.012 }}
                  transformTemplate={({ rotate, y, scale }) => `rotate(${rotate || '0deg'}) translateY(${y || '0px'}) scale(${scale || 1})`}
                  style={{ zIndex: i }}
                >
                  <img src={CARD_BACK} alt="" draggable={false} />
                  {isSel && <span className="deck-badge">{order + 1}</span>}
                </motion.button>
              )
            })}
          </div>
        )}

        <div className="screen-actions column">
          {phase === 'idle' && (
            <button className="btn btn-primary" onClick={shuffle}>
              {t('shuffleNow')}
            </button>
          )}
          {phase === 'shuffling' && <p className="ready-text">✦ {t('shuffling')} ✦</p>}
          {fanned && (
            <button className="btn btn-primary" onClick={reveal} disabled={selected.length !== count}>
              {t('reveal')}
            </button>
          )}
        </div>
      </motion.div>
    </Layout>
  )
}
