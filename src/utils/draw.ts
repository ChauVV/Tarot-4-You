import { DECK } from '../data/cards'
import type { DrawnCard } from '../types'

/** Fisher–Yates shuffle, returns a new array. */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Probability a card lands reversed. */
const REVERSED_CHANCE = 0.4

/** Draw `count` distinct cards from a freshly shuffled deck, each with a chance of being reversed. */
export function drawCards(count: number): DrawnCard[] {
  return shuffle(DECK)
    .slice(0, count)
    .map((card) => ({ card, reversed: Math.random() < REVERSED_CHANCE }))
}
