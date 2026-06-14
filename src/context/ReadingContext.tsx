import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { DrawnCard, SubTopic, Topic } from '../types'

interface ReadingState {
  topic: Topic
  /** The specific angle within the topic, e.g. "Current partner". */
  subtopic: SubTopic | null
  question: string
  spreadId: string
  drawn: DrawnCard[]
}

interface ReadingContextValue extends ReadingState {
  setTopic: (t: Topic) => void
  setSubtopic: (s: SubTopic | null) => void
  setQuestion: (q: string) => void
  setSpreadId: (id: string) => void
  setDrawn: (cards: DrawnCard[]) => void
  reset: () => void
}

const ReadingContext = createContext<ReadingContextValue | null>(null)

const initial: ReadingState = { topic: 'daily', subtopic: null, question: '', spreadId: 'daily', drawn: [] }

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<Topic>(initial.topic)
  const [subtopic, setSubtopic] = useState<SubTopic | null>(initial.subtopic)
  const [question, setQuestion] = useState(initial.question)
  const [spreadId, setSpreadId] = useState(initial.spreadId)
  const [drawn, setDrawn] = useState<DrawnCard[]>(initial.drawn)

  const value = useMemo<ReadingContextValue>(
    () => ({
      topic,
      subtopic,
      question,
      spreadId,
      drawn,
      setTopic,
      setSubtopic,
      setQuestion,
      setSpreadId,
      setDrawn,
      reset: () => {
        setTopic(initial.topic)
        setSubtopic(initial.subtopic)
        setQuestion(initial.question)
        setSpreadId(initial.spreadId)
        setDrawn([])
      },
    }),
    [topic, subtopic, question, spreadId, drawn],
  )

  return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReading(): ReadingContextValue {
  const ctx = useContext(ReadingContext)
  if (!ctx) throw new Error('useReading must be used within ReadingProvider')
  return ctx
}
