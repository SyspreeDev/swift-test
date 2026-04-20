/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_OPTIMIZER_LOCATION_ID: string
  readonly VITE_LEAD_OPTIMIZER_WEBHOOK_URL: string
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}