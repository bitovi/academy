/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PMO_API: string
      readonly PMO_ASSETS: string
    }
  }
}

export {}
