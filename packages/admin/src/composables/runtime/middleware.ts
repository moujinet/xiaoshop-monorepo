import type {
  IContextCallback,
  IGlobalContext,
  IRouteMiddleware,
} from '~/types'

/**
 * Define middleware
 *
 * @param middleware IRouteMiddleware
 * @returns IContextCallback
 */
export function defineMiddleware(middleware: IRouteMiddleware): IContextCallback {
  return ({ router }) => {
    router.beforeEach((to, from, next) => {
      if (!middleware(to, from))
        next()
    })
  }
}

/**
 * Load all middleware
 *
 * @param ctx IGlobalContext
 */
export async function loadMiddlewares(ctx: IGlobalContext) {
  Object.values(import.meta.glob<IContextCallback>('~/middleware/**/*.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    middleware => middleware(ctx),
  )
}
