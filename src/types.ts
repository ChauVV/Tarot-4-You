export type Lang = 'vi' | 'en'
export type Theme = 'dark' | 'light'

export type Suit = 'major' | 'cups' | 'pentacles' | 'swords' | 'wands'
export type Arcana = 'major' | 'minor'

/** Bilingual string. */
export interface Bi {
  vi: string
  en: string
}

export interface CardMeaning {
  keywords: Bi
  /** Full interpretation text. */
  text: Bi
}

export interface TarotCard {
  id: string
  /** Display number, e.g. "0", "XII", "Ace", "Knight". */
  number: string
  arcana: Arcana
  suit: Suit
  name: Bi
  image: string
  upright: CardMeaning
  reversed: CardMeaning
}

/** A card as drawn into a reading: which card, and whether reversed. */
export interface DrawnCard {
  card: TarotCard
  reversed: boolean
}

export interface SpreadPosition {
  /** Short label for the position, e.g. "Past". */
  title: Bi
  /** What this position represents. */
  hint: Bi
}

export interface Spread {
  id: string
  name: Bi
  description: Bi
  count: number
  positions: SpreadPosition[]
  /** Visual layout name for CSS. */
  layout: 'single' | 'row3' | 'choice5'
}

export type Topic = 'daily' | 'love' | 'career' | 'finance' | 'custom'

export interface JournalEntry {
  id: string
  /** ISO timestamp. */
  date: string
  topic: Topic
  question: string
  spreadId: string
  cards: { cardId: string; reversed: boolean }[]
  /** AI-generated summary, saved when the reading was interpreted by AI. */
  aiSummary?: string
}
