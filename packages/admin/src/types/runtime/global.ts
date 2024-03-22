import type { App } from 'vue'
import type { Router } from 'unplugin-vue-router/types'

export interface IGlobalContext {
  app: App
  router: Router
}
