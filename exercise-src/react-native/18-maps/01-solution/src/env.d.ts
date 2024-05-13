/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PMO_API: string
      readonly PMO_ASSETS: string
      readonly GOOGLE_MAPS_API_KEY: string
      readonly GOOGLE_OAUTH_CLIENT_ID: string
    }
  }
}

export {}
