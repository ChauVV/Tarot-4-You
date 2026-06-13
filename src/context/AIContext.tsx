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

interface AIContextValue {
  connected: boolean
  connecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  /** Run a chat completion with the connected account. Throws if not connected. */
  generate: (messages: ChatMessage[]) => Promise<string>
}

const AIContext = createContext<AIContextValue | null>(null)

export function AIProvider({ children }: { children: ReactNode }) {
  const [key, setKeyState] = useState<string | null>(() => getKey())
  const [connecting, setConnecting] = useState(false)

  // Fallback: if the OAuth popup was blocked and we got redirected in-page,
  // finish the exchange here and clean the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code && !window.opener) {
      setConnecting(true)
      exchangeCode(code)
        .then((k) => {
          setKey(k)
          setKeyState(k)
        })
        .catch(() => {})
        .finally(() => {
          setConnecting(false)
          params.delete('code')
          const url = window.location.pathname + (params.toString() ? `?${params}` : '')
          window.history.replaceState({}, '', url)
        })
    }
  }, [])

  const connect = useCallback(async () => {
    setConnecting(true)
    try {
      const url = await buildAuthUrl()
      const popup = window.open(url, POPUP_NAME, 'width=520,height=720')
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
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    clearKey()
    setKeyState(null)
  }, [])

  const generate = useCallback(
    async (messages: ChatMessage[]) => {
      if (!key) throw new Error('Not connected')
      return chat(key, messages)
    },
    [key],
  )

  const value = useMemo<AIContextValue>(
    () => ({ connected: !!key, connecting, connect, disconnect, generate }),
    [key, connecting, connect, disconnect, generate],
  )

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAI(): AIContextValue {
  const ctx = useContext(AIContext)
  if (!ctx) throw new Error('useAI must be used within AIProvider')
  return ctx
}
