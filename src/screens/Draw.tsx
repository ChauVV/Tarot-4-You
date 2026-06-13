import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { CARD_BACK } from '../data/cards'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { getSpread } from '../data/spreads'
import { drawCards } from '../utils/draw'

export default function Draw() {
  const { t } = useLang()
  const navigate = useNavigate()
  const { spreadId, setDrawn } = useReading()
  const spread = getSpread(spreadId)

  useEffect(() => {
    if (!spread) navigate('/question', { replace: true })
  }, [spread, navigate])

  const count = spread?.count ?? 1
  // How many face-down cards to offer for the choice.
  const pool = Math.max(9, count + 5)

  // Predetermined draw (which actual cards + orientation) — assigned in pick order.
  const predrawn = useMemo(() => drawCards(count), [count])
  const [selected, setSelected] = useState<number[]>([])

  if (!spread) return null

  const toggle = (i: number) => {
    setSelected((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i)
      if (prev.length >= count) return prev
      return [...prev, i]
    })
  }

  const reveal = () => {
    // selection order -> predetermined cards
    setDrawn(predrawn)
    navigate('/reading')
  }

  return (
    <Layout showBack>
      <div className="screen">
        <h2 className="screen-title">{t('drawTitle')}</h2>
        <p className="field-hint">{t('drawHint')}</p>
        <p className="draw-counter">
          {t('selected')}: {selected.length} / {count}
        </p>

        <div className="draw-fan">
          {Array.from({ length: pool }).map((_, i) => {
            const order = selected.indexOf(i)
            const isSel = order !== -1
            return (
              <motion.button
                key={i}
                type="button"
                className={`fan-card ${isSel ? 'selected' : ''}`}
                onClick={() => toggle(i)}
                whileHover={{ y: -14 }}
                animate={{ y: isSel ? -28 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                aria-pressed={isSel}
              >
                <img src={CARD_BACK} alt="" draggable={false} />
                {isSel && <span className="fan-badge">{order + 1}</span>}
              </motion.button>
            )
          })}
        </div>

        <div className="screen-actions">
          <button className="btn btn-primary" onClick={reveal} disabled={selected.length !== count}>
            {t('reveal')}
          </button>
        </div>
      </div>
    </Layout>
  )
}
