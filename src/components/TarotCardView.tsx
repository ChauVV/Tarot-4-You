import { motion } from 'framer-motion'
import { CARD_BACK } from '../data/cards'
import type { DrawnCard } from '../types'
import { useLang } from '../context/LanguageContext'

interface Props {
  drawn: DrawnCard
  faceUp: boolean
  onClick?: () => void
  /** Show the reversed badge / name overlay under the card. */
  showLabel?: boolean
  className?: string
}

/** A single tarot card with a 3D flip between its back and face. */
export default function TarotCardView({ drawn, faceUp, onClick, showLabel, className }: Props) {
  const { bi, t } = useLang()
  const { card, reversed } = drawn

  return (
    <div className={`card-wrap ${className ?? ''}`}>
      <motion.button
        type="button"
        className="card-flip"
        onClick={onClick}
        disabled={!onClick}
        aria-label={faceUp ? bi(card.name) : t('tapToFlip')}
        animate={{ rotateY: faceUp ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <span className="card-face card-back-face">
          <img src={CARD_BACK} alt="" draggable={false} />
        </span>
        <span className="card-face card-front-face">
          <img
            src={card.image}
            alt={bi(card.name)}
            draggable={false}
            style={{ transform: reversed ? 'rotate(180deg)' : undefined }}
          />
        </span>
      </motion.button>

      {showLabel && faceUp && (
        <div className="card-label">
          <span className="card-name">{bi(card.name)}</span>
          <span className={`orientation ${reversed ? 'rev' : 'up'}`}>
            {reversed ? t('reversed') : t('upright')}
          </span>
        </div>
      )}
    </div>
  )
}
