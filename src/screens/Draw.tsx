import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { CARD_BACK } from '../data/cards'
import { useLang } from '../context/LanguageContext'
import { useReading } from '../context/ReadingContext'
import { getSpread } from '../data/spreads'
import { buildShuffledDeck } from '../utils/draw'

// Fan tuning: degrees of tilt per card away from centre, and how far the arc drops.
const ROT_PER_CARD = 9
const MAX_ROT = 46
const ARC_RADIUS = 300

export default function Draw() {
  const { t } = useLang()
  const navigate = useNavigate()
  const { spreadId, setDrawn } = useReading()
  const spread = getSpread(spreadId)

  useEffect(() => {
    if (!spread) navigate('/question', { replace: true })
  }, [spread, navigate])

  const count = spread?.count ?? 1

  // The full 78-card deck, shuffled once — each position is a real card.
  const deck = useMemo(() => buildShuffledDeck(), [])
  const [selected, setSelected] = useState<number[]>([])

  const scrollerRef = useRef<HTMLDivElement>(null)
  const cardEls = useRef<(HTMLButtonElement | null)[]>([])
  // True when the last pointer interaction was a drag, so we don't also select a card.
  const draggedRef = useRef(false)

  // Hand-fan effect: the card nearest the centre stands upright and large;
  // the rest tilt and arc outward like cards held in a hand.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    let raf = 0
    const update = () => {
      raf = 0
      const centre = scroller.scrollLeft + scroller.clientWidth / 2
      for (const el of cardEls.current) {
        if (!el) continue
        const cardCentre = el.offsetLeft + el.offsetWidth / 2
        const d = (cardCentre - centre) / el.offsetWidth
        const ad = Math.min(Math.abs(d), 6)
        const rot = Math.max(-MAX_ROT, Math.min(MAX_ROT, d * ROT_PER_CARD))
        const ty = ARC_RADIUS * (1 - Math.cos((rot * Math.PI) / 180))
        const scale = Math.max(0.7, 1 - 0.05 * ad)
        const opacity = Math.max(0.5, 1 - 0.1 * ad)
        el.style.transform = `translateY(${ty}px) rotate(${rot}deg) scale(${scale})`
        el.style.opacity = String(opacity)
        el.style.zIndex = String(1000 - Math.round(ad * 10))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    // --- Mouse drag-to-scroll (desktop) + wheel-to-scroll-horizontally ---
    let isDown = false
    let startX = 0
    let startScroll = 0
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return // touch/pen scroll natively
      isDown = true
      draggedRef.current = false
      startX = e.clientX
      startScroll = scroller.scrollLeft
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return
      const dx = e.clientX - startX
      // Only enter "drag" mode once the mouse actually moves — otherwise it's a click.
      if (!draggedRef.current && Math.abs(dx) > 4) {
        draggedRef.current = true
        scroller.classList.add('dragging')
      }
      if (draggedRef.current) scroller.scrollLeft = startScroll - dx
    }
    const endDrag = () => {
      isDown = false
      scroller.classList.remove('dragging')
    }
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return // already horizontal
      e.preventDefault()
      scroller.scrollLeft += e.deltaY
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    scroller.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endDrag)
    scroller.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', onScroll)
    // Start with the middle of the deck centred.
    scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2
    update()
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      scroller.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', endDrag)
      scroller.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [deck.length])

  if (!spread) return null

  const toggle = (i: number) => {
    setSelected((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i)
      if (prev.length >= count) return prev
      return [...prev, i]
    })
  }

  const onCard = (i: number) => {
    // Ignore the click that ends a drag.
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }
    cardEls.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    toggle(i)
  }

  const reveal = () => {
    setDrawn(selected.map((i) => deck[i]))
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

        <div className="draw-fan" ref={scrollerRef}>
          {deck.map((_, i) => {
            const order = selected.indexOf(i)
            const isSel = order !== -1
            return (
              <button
                key={i}
                ref={(el) => {
                  cardEls.current[i] = el
                }}
                type="button"
                className={`fan-card ${isSel ? 'selected' : ''}`}
                onClick={() => onCard(i)}
                aria-pressed={isSel}
              >
                <img src={CARD_BACK} alt="" draggable={false} />
                {isSel && <span className="fan-badge">{order + 1}</span>}
              </button>
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
