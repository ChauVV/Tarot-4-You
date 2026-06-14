/**
 * OpenRouter OAuth (PKCE) + chat helpers — runs entirely client-side.
 * The user connects their own OpenRouter account in one click; we never see a
 * password and never store a key of our own. Docs: openrouter.ai/docs/use-cases/oauth-pkce
 */

const KEY_STORAGE = 't4y.or.key'
const VERIFIER_STORAGE = 't4y.or.verifier'
const AUTH_URL = 'https://openrouter.ai/auth'
const EXCHANGE_URL = 'https://openrouter.ai/api/v1/auth/keys'
const CHAT_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODELS_URL = 'https://openrouter.ai/api/v1/models'
const MODELS_STORAGE = 't4y.or.models'
const MODELS_TTL = 6 * 60 * 60 * 1000 // 6h

export const POPUP_NAME = 'or-oauth'

const callbackUrl = () => `${window.location.origin}/`

function base64url(bytes: ArrayBuffer): string {
  let s = ''
  const arr = new Uint8Array(bytes)
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i])
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function randomVerifier(): string {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return base64url(arr.buffer) // 43 url-safe chars — a valid PKCE verifier
}

async function challengeFrom(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
  return base64url(digest)
}

export function getKey(): string | null {
  return localStorage.getItem(KEY_STORAGE)
}
export function setKey(key: string) {
  localStorage.setItem(KEY_STORAGE, key)
}
export function clearKey() {
  localStorage.removeItem(KEY_STORAGE)
}

/** Build the authorization URL and stash the PKCE verifier for the exchange step. */
export async function buildAuthUrl(): Promise<string> {
  const verifier = randomVerifier()
  localStorage.setItem(VERIFIER_STORAGE, verifier)
  const challenge = await challengeFrom(verifier)
  const params = new URLSearchParams({
    callback_url: callbackUrl(),
    code_challenge: challenge,
    code_challenge_method: 'S256',
  })
  return `${AUTH_URL}?${params.toString()}`
}

/** Exchange the authorization code for a user-controlled API key. */
export async function exchangeCode(code: string): Promise<string> {
  const verifier = localStorage.getItem(VERIFIER_STORAGE) ?? undefined
  const res = await fetch(EXCHANGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, code_verifier: verifier, code_challenge_method: 'S256' }),
  })
  localStorage.removeItem(VERIFIER_STORAGE)
  if (!res.ok) throw new Error(`Exchange failed (${res.status})`)
  const data = (await res.json()) as { key?: string }
  if (!data.key) throw new Error('No key in response')
  return data.key
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ModelInfo {
  id: string
  pricing?: { prompt?: string; completion?: string }
}

/** Rank free models so we try sensible general-purpose chat models first. */
function modelScore(id: string): number {
  if (/safety|guard|embed|moderation|content-safety/i.test(id)) return -100
  const families = ['llama', 'gemma', 'qwen', 'deepseek', 'mistral', 'gemini', 'nemotron']
  const idx = families.findIndex((f) => id.includes(f))
  return idx === -1 ? 0 : families.length - idx
}

/** Fetch and cache the list of currently-available free models, best first. */
async function getFreeModels(key: string): Promise<string[]> {
  try {
    const raw = localStorage.getItem(MODELS_STORAGE)
    if (raw) {
      const { at, ids } = JSON.parse(raw) as { at: number; ids: string[] }
      if (Date.now() - at < MODELS_TTL && Array.isArray(ids) && ids.length) return ids
    }
  } catch {
    /* ignore */
  }

  const res = await fetch(MODELS_URL, { headers: { Authorization: `Bearer ${key}` } })
  if (!res.ok) throw new Error(`Could not list models (${res.status})`)
  const data = (await res.json()) as { data?: ModelInfo[] }
  const ids = (data.data ?? [])
    .filter((m) => typeof m.id === 'string' && m.id.endsWith(':free'))
    .map((m) => m.id)
    .sort((a, b) => modelScore(b) - modelScore(a))
  if (!ids.length) throw new Error('No free models available')
  try {
    localStorage.setItem(MODELS_STORAGE, JSON.stringify({ at: Date.now(), ids }))
  } catch {
    /* ignore */
  }
  return ids
}

async function callChat(key: string, messages: ChatMessage[], model: string): Promise<string> {
  const res = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Tarot 4 You',
    },
    body: JSON.stringify({ model, messages, max_tokens: 600 }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    const err = new Error(`AI error ${res.status}: ${detail.slice(0, 200)}`) as Error & {
      retriable?: boolean
      gone?: boolean
      rateLimited?: boolean
    }
    // 404/"no endpoints" => model removed; 429/5xx => busy. Both: try the next model.
    err.gone = res.status === 404 || /no endpoints|not found/i.test(detail)
    // Daily free-tier cap — retrying other free models won't help today.
    err.rateLimited = res.status === 429 || /free-models-per-day|rate limit exceeded/i.test(detail)
    err.retriable =
      err.gone || res.status === 429 || res.status >= 500 || /rate.?limit|temporarily|overloaded/i.test(detail)
    throw err
  }
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  return data.choices?.[0]?.message?.content?.trim() ?? ''
}

/**
 * Call chat completions, trying free models in turn so a single removed model
 * never breaks the feature. Reliability over a specific model choice.
 */
export async function chat(key: string, messages: ChatMessage[]): Promise<string> {
  const models = await getFreeModels(key)
  let lastErr: unknown
  // Try more models since free ones are frequently rate-limited.
  for (const model of models.slice(0, 8)) {
    try {
      const text = await callChat(key, messages, model)
      if (text) return text
    } catch (err) {
      lastErr = err
      const e = err as { retriable?: boolean; gone?: boolean }
      if (!e.retriable) throw err
      // Only a removed model invalidates the cached list; a busy one does not.
      if (e.gone) localStorage.removeItem(MODELS_STORAGE)
    }
  }
  throw lastErr ?? new Error('No free model produced a response')
}

/**
 * If this page load is the OAuth popup returning with a `?code=`, hand the code
 * back to the opener window and close. Returns true if it handled the callback
 * (in which case the app should not render).
 */
export function maybeHandleOAuthPopup(): boolean {
  const code = new URLSearchParams(window.location.search).get('code')
  if (code && window.opener && window.name === POPUP_NAME) {
    window.opener.postMessage({ type: 'or-oauth', code }, window.location.origin)
    window.close()
    return true
  }
  return false
}
