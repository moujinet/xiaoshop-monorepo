import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { IContextCallback } from '~/types'

export interface IMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): ReturnType<NavigationGuard>
}

export type IMiddlewareInstaller = IContextCallback
