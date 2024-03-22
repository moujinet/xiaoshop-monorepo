import type { NavigationGuard, RouteLocationNormalized } from 'unplugin-vue-router/types'
import type { IContextCallback } from '~/types'

export interface IMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}

export type IMiddlewareInstaller = IContextCallback
