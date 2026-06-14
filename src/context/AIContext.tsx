import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  buildAuthUrl,
  chat,
  clearKey,
  exchangeCode,
  getKey,
  POPUP_NAME,
  setKey,
  type ChatMessage,
} from '../utils/openrouter'

const SKIP_STORAGE = 't4y.ai.skipped'

interface AIContextValue {
  connected: boolean
  connecting: boolean
  connectError: string | null
  /** True once the user chose to use the app without AI. */
  skipped: boolean
  connect: () => Promise<void>
  /** Connect by pasting an OpenRouter API key directly (bypasses OAuth). */
  connectWithKey: (key: string) => void
  disconnect: () => void
  /** Mark AI as skipped so the app is usable without connecting. */
  skip: () => void
  /** Run a chat completion with the connected account. Throws if not connected. */
  generate: (messages: ChatMessage[], maxTokens?: number) => Promise<string>
}

const AIContext = createContext<AIContextValue | null>(null)

export function AIProvider({ children }: { children: ReactNode }) {
  const [key, setKeyState] = useState<string | null>(() => getKey())
  const [connecting, setConnecting] = useState(false)
  const [connectError, setConnectError] = useState<string | null>(null)
  const [skipped, setSkipped] = useState<boolean>(() => localStorage.getItem(SKIP_STORAGE) === '1')
  // Capture the OAuth `?code=` synchronously during the first render, before any
  // child <Navigate> can rewrite the URL and drop the query string.
  const [pendingCode] = useState<string | null>(
    () => new URLSearchParams(window.location.search).get('code'),
  )

  // On return from the auth page with a `?code=`, finish the exchange in-page
  // and clean the URL. This handles both the popup-blocked desktop case and
  // the mobile full-page redirect. (A real popup is already short-circuited by
  // maybeHandleOAuthPopup before the app renders, so if we got here with a code
  // it's always meant to be exchanged in this tab.)
  useEffect(() => {
    if (!pendingCode) return
    setConnecting(true)
    exchangeCode(pendingCode)
      .then((k) => {
        setKey(k)
        setKeyState(k)
      })
      .catch((err) => {
        setConnectError(err instanceof Error ? err.message : 'unknown')
      })
      .finally(() => {
        setConnecting(false)
        const params = new URLSearchParams(window.location.search)
        params.delete('code')
        const url = window.location.pathname + (params.toString() ? `?${params}` : '')
        window.history.replaceState({}, '', url)
      })
  }, [pendingCode])

  // Keep `connected` in sync if the key changes in another tab.
  useEffect(() => {
    const onStorage = () => setKeyState(getKey())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const connect = useCallback(async () => {
    setConnecting(true)
    setConnectError(null)
    try {
      const url = await buildAuthUrl()

      // Mobile browsers open window.open() as a new tab, not a popup — the
      // postMessage handshake breaks. Use a full-page redirect instead; we come
      // back to the callback URL with `?code=` and exchange it in the useEffect.
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      if (isMobile) {
        window.location.assign(url)
        return
      }

      const popup = window.open(url, POPUP_NAME, 'width=520,height=720')

      // Popup blocked (common on desktop too) — fall back to full-page redirect.
      if (!popup) {
        window.location.assign(url)
        return
      }

      const code = await new Promise<string>((resolve, reject) => {
        const onMsg = (e: MessageEvent) => {
          if (e.origin !== window.location.origin) return
          if (e.data?.type === 'or-oauth' && e.data.code) {
            cleanup()
            resolve(e.data.code as string)
          }
        }
        const iv = window.setInterval(() => {
          if (popup && popup.closed) {
            cleanup()
            reject(new Error('cancelled'))
          }
        }, 500)
        const cleanup = () => {
          window.removeEventListener('message', onMsg)
          window.clearInterval(iv)
        }
        window.addEventListener('message', onMsg)
      })
      const k = await exchangeCode(code)
      setKey(k)
      setKeyState(k)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown'
      if (msg !== 'cancelled') setConnectError(msg)
      throw err
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    clearKey()
    setKeyState(null)
  }, [])

  const connectWithKey = useCallback((raw: string) => {
    const k = raw.trim()
    if (!/^sk-or-/.test(k)) {
      setConnectError('invalid-key')
      throw new Error('invalid-key')
    }
    setConnectError(null)
    setKey(k)
    setKeyState(k)
  }, [])

  const skip = useCallback(() => {
    localStorage.setItem(SKIP_STORAGE, '1')
    setSkipped(true)
  }, [])

  const generate = useCallback(
    async (messages: ChatMessage[], maxTokens?: number) => {
      if (!key) throw new Error('Not connected')
      return chat(key, messages, maxTokens)
    },
    [key],
  )

  const value = useMemo<AIContextValue>(
    () => ({ connected: !!key, connecting, connectError, skipped, connect, connectWithKey, disconnect, skip, generate }),
    [key, connecting, connectError, skipped, connect, connectWithKey, disconnect, skip, generate],
  )

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAI(): AIContextValue {
  const ctx = useContext(AIContext)
  if (!ctx) throw new Error('useAI must be used within AIProvider')
  return ctx
}
