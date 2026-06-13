import type { TarotCard } from '../types'
import { majorArcana } from './cards.major'
import { minorArcana } from './cards.minor'

/** The full 78-card Rider-Waite-Smith deck. */
export const DECK: TarotCard[] = [...majorArcana, ...minorArcana]

export const CARD_BACK = '/cards/card-back.jpg'

const byId = new Map(DECK.map((c) => [c.id, c]))

export function getCard(id: string): TarotCard | undefined {
  return byId.get(id)
}
