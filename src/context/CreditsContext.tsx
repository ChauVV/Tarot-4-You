import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'tarot-credits'
const DATE_KEY = 'tarot-credits-date'
const INITIAL_CREDITS = 5

interface CreditsContextValue {
  credits: number
  isPanelOpen: boolean
  openPanel: () => void
  closePanel: () => void
  /** Deducts 1 credit. Returns false if none left. */
  spendCredit: () => boolean
  addCredits: (n: number) => void
}

const CreditsContext = createContext<CreditsContextValue | null>(null)

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

export function CreditsProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored !== null ? parseInt(stored, 10) : INITIAL_CREDITS
  })
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  // Daily +1: give one credit for each new day
  useEffect(() => {
    const today = todayStr()
    const lastDate = localStorage.getItem(DATE_KEY)
    if (lastDate !== today) {
      localStorage.setItem(DATE_KEY, today)
      if (lastDate !== null) {
        setCredits((c) => c + 1)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(credits))
  }, [credits])

  const openPanel = useCallback(() => setIsPanelOpen(true), [])
  const closePanel = useCallback(() => setIsPanelOpen(false), [])

  const spendCredit = useCallback(() => {
    setCredits((c) => {
      if (c <= 0) return c
      return c - 1
    })
    return credits > 0
  }, [credits])

  const addCredits = useCallback((n: number) => {
    setCredits((c) => c + n)
  }, [])

  const value = useMemo<CreditsContextValue>(
    () => ({ credits, isPanelOpen, openPanel, closePanel, spendCredit, addCredits }),
    [credits, isPanelOpen, openPanel, closePanel, spendCredit, addCredits],
  )

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCredits(): CreditsContextValue {
  const ctx = useContext(CreditsContext)
  if (!ctx) throw new Error('useCredits must be used within CreditsProvider')
  return ctx
}
