import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const DURATION = 1.6 // seconds for the full close → hold → open sequence

/**
 * Door-opening transition overlay.
 *
 * On every route change two doors snap shut over the screen and then swing
 * open, revealing the new screen underneath. The overlay never blocks clicks
 * once the animation has finished (it unmounts on completion).
 */
export default function DoorTransition() {
  const { pathname } = useLocation()
  const [playing, setPlaying] = useState(false)
  // Skip the very first render so the app doesn't "open" on initial load.
  const [primed, setPrimed] = useState(false)

  useEffect(() => {
    if (!primed) {
      setPrimed(true)
      return
    }
    setPlaying(true)
  }, [pathname])

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          className="door-overlay"
          aria-hidden
          // A short exit fade absorbs any final-frame flicker on unmount.
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Mystical smoke covers the whole screen first so the centre gap
              between the closing doors never reveals what's behind. It fades
              out in step with the doors opening (no abrupt flash). */}
          <motion.div
            className="door-smoke"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: DURATION, times: [0, 0.5, 1], ease: 'easeInOut' }}
          >
            <span className="smoke-wisp smoke-wisp-a" />
            <span className="smoke-wisp smoke-wisp-b" />
            <span className="smoke-wisp smoke-wisp-c" />
          </motion.div>

          {/* Doors swing in to shut, hold a beat, then swing open. */}
          <motion.div
            className="door door-left"
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '0%', '-100%'] }}
            transition={{ duration: DURATION, times: [0, 0.22, 0.5, 0.8], ease: 'easeInOut' }}
            onAnimationComplete={() => setPlaying(false)}
          >
            <img src="/images/leftDoor.png" className="door-img" alt="" />
          </motion.div>
          <motion.div
            className="door door-right"
            initial={{ x: '100%' }}
            animate={{ x: ['100%', '0%', '0%', '100%'] }}
            transition={{ duration: DURATION, times: [0, 0.22, 0.5, 0.8], ease: 'easeInOut' }}
          >
            <img src="/images/rightDoor.png" className="door-img" alt="" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
