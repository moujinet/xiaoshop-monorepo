import type {
  IGlobalContext,
  IMiddleware,
  IMiddlewareInstaller,
} from '~/types'

/**
 * 定义中间件
 *
 * @param middleware IMiddleware
 * @returns IMiddlewareInstaller
 */
export function defineMiddleware(middleware: IMiddleware): IMiddlewareInstaller {
  return ({ router }) => {
    router.beforeEach((to, from, next) => {
      if (!middleware(to, from))
        next()
    })
  }
}

/**
 * 加载中间件
 *
 * @param ctx IGlobalContext
 */
export function loadMiddlewares(ctx: IGlobalContext) {
  Object.values(import.meta.glob<IMiddlewareInstaller>('~/middleware/**/*.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    middleware => middleware(ctx),
  )
}
