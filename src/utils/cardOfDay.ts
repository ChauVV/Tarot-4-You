import { DECK } from '../data/cards'
import type { DrawnCard } from '../types'

/** YYYY-MM-DD in local time. */
export function todayKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Deterministic hash from a string. */
function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Same card for the whole day; orientation also deterministic per day. */
export function cardOfDay(dateKey = todayKey()): DrawnCard {
  const h = hash(dateKey)
  const card = DECK[h % DECK.length]
  const reversed = ((h >> 8) & 1) === 1 && (h >> 12) % 5 < 2 // ~ deterministic, biased upright
  return { card, reversed }
}
