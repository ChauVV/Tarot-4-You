/* ============================================================
   Google Ad Manager (GAM) rewarded ads for the web.
   Uses the Google Publisher Tag (GPT) rewarded format.

   Setup:
   1. Create a Google Ad Manager account.
   2. Create a "Rewarded" ad unit and copy its path
      (e.g. "/1234567/tarot_rewarded").
   3. Put it in an .env file:
        VITE_GAM_REWARDED_AD_UNIT=/1234567/tarot_rewarded

   If the env var is missing, showRewardedAd() rejects with
   'not-configured' and the UI shows a "no ad available" message.
   ============================================================ */

const AD_UNIT_PATH = import.meta.env.VITE_GAM_REWARDED_AD_UNIT as string | undefined

const GPT_SRC = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js'

// Minimal GPT typings — we only touch what we use.
interface GptSlot {
  addService(service: unknown): GptSlot
}
interface GptPubAds {
  addEventListener(type: string, listener: (event: unknown) => void): void
  removeEventListener?(type: string, listener: (event: unknown) => void): void
}
interface GoogleTag {
  cmd: Array<() => void>
  defineOutOfPageSlot(adUnitPath: string, format: unknown): GptSlot | null
  pubads(): GptPubAds
  enableServices(): void
  display(slot: GptSlot): void
  destroySlots(slots: GptSlot[]): void
  enums: { OutOfPageFormat: { REWARDED: unknown } }
}

declare global {
  interface Window {
    googletag?: GoogleTag
  }
}

/** True if a real GAM rewarded ad unit is configured. */
export function isRewardedConfigured(): boolean {
  return typeof AD_UNIT_PATH === 'string' && AD_UNIT_PATH.length > 0
}

let gptLoading: Promise<void> | null = null

function loadGpt(): Promise<void> {
  if (window.googletag?.pubads) return Promise.resolve()
  if (gptLoading) return gptLoading
  gptLoading = new Promise<void>((resolve, reject) => {
    window.googletag = window.googletag || ({ cmd: [] } as unknown as GoogleTag)
    const s = document.createElement('script')
    s.src = GPT_SRC
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      gptLoading = null
      reject(new Error('gpt-load-failed'))
    }
    document.head.appendChild(s)
  })
  return gptLoading
}

export type RewardedResult = 'granted' | 'dismissed'

/**
 * Shows a GAM rewarded ad. Resolves 'granted' if the user watched
 * long enough to earn the reward, 'dismissed' if they closed early.
 * Rejects if no ad is available or GPT fails to load — callers should
 * fall back to the demo flow in that case.
 */
export function showRewardedAd(): Promise<RewardedResult> {
  if (!isRewardedConfigured()) {
    return Promise.reject(new Error('not-configured'))
  }

  return loadGpt().then(
    () =>
      new Promise<RewardedResult>((resolve, reject) => {
        const googletag = window.googletag!
        let settled = false
        let granted = false

        googletag.cmd.push(() => {
          const slot = googletag.defineOutOfPageSlot(
            AD_UNIT_PATH!,
            googletag.enums.OutOfPageFormat.REWARDED,
          )

          if (!slot) {
            reject(new Error('no-rewarded-slot'))
            return
          }

          slot.addService(googletag.pubads())

          const onReady = (event: unknown) => {
            // event.makeRewardedVisible() shows the ad overlay.
            const fn = (event as { makeRewardedVisible?: () => void }).makeRewardedVisible
            if (typeof fn === 'function') fn()
          }
          const onGranted = () => {
            granted = true
          }
          const onClosed = () => {
            if (settled) return
            settled = true
            googletag.destroySlots([slot])
            resolve(granted ? 'granted' : 'dismissed')
          }

          googletag.pubads().addEventListener('rewardedSlotReady', onReady)
          googletag.pubads().addEventListener('rewardedSlotGranted', onGranted)
          googletag.pubads().addEventListener('rewardedSlotClosed', onClosed)

          googletag.enableServices()
          googletag.display(slot)

          // Safety timeout: if nothing fires (e.g. no fill), bail out.
          setTimeout(() => {
            if (settled) return
            settled = true
            googletag.destroySlots([slot])
            reject(new Error('rewarded-timeout'))
          }, 8000)
        })
      }),
  )
}
