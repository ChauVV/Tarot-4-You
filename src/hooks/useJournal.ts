import { useCallback, useEffect, useState } from 'react'
import type { JournalEntry } from '../types'

const STORAGE_KEY = 't4y.journal'

function load(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as JournalEntry[]) : []
  } catch {
    return []
  }
}

function save(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(load)

  // Keep multiple hook instances / tabs roughly in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setEntries(load())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((entry: JournalEntry) => {
    setEntries((prev) => {
      const next = [entry, ...prev]
      save(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id)
      save(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    save([])
    setEntries([])
  }, [])

  return { entries, add, remove, clear }
}

/** Stable-ish id without external deps. */
export function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}
