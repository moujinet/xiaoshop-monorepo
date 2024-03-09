import type { App } from 'vue'
import type { Router } from 'unplugin-vue-router/types'

export interface ICallback<T = void> {
  (): T
}

export interface IContextCallback<T = void> {
  (ctx: IGlobalContext): T
}

/**
 * Global options
 */
export interface IGlobalOptions {
  name: string
  desc: string
  version: string
  debug: boolean
}

/**
 * Global context
 */
export interface IGlobalContext {
  options: Readonly<IGlobalOptions>

  app: App
  router: Router
}
