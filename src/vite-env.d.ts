/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Ad Manager rewarded ad unit path, e.g. "/1234567/tarot_rewarded". */
  readonly VITE_GAM_REWARDED_AD_UNIT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
