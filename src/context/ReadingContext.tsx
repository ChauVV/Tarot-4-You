import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { DrawnCard, Topic } from '../types'

interface ReadingState {
  topic: Topic
  question: string
  spreadId: string
  drawn: DrawnCard[]
}

interface ReadingContextValue extends ReadingState {
  setTopic: (t: Topic) => void
  setQuestion: (q: string) => void
  setSpreadId: (id: string) => void
  setDrawn: (cards: DrawnCard[]) => void
  reset: () => void
}

const ReadingContext = createContext<ReadingContextValue | null>(null)

const initial: ReadingState = { topic: 'daily', question: '', spreadId: 'daily', drawn: [] }

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<Topic>(initial.topic)
  const [question, setQuestion] = useState(initial.question)
  const [spreadId, setSpreadId] = useState(initial.spreadId)
  const [drawn, setDrawn] = useState<DrawnCard[]>(initial.drawn)

  const value = useMemo<ReadingContextValue>(
    () => ({
      topic,
      question,
      spreadId,
      drawn,
      setTopic,
      setQuestion,
      setSpreadId,
      setDrawn,
      reset: () => {
        setTopic(initial.topic)
        setQuestion(initial.question)
        setSpreadId(initial.spreadId)
        setDrawn([])
      },
    }),
    [topic, question, spreadId, drawn],
  )

  return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReading(): ReadingContextValue {
  const ctx = useContext(ReadingContext)
  if (!ctx) throw new Error('useReading must be used within ReadingProvider')
  return ctx
}
