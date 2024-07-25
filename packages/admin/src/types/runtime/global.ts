import type { App } from 'vue'
import type { Router } from 'vue-router'

export interface IGlobalContext {
  app: App
  router: Router
}
