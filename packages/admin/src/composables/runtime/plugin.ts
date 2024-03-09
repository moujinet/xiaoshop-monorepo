import type { IContextCallback, IGlobalContext } from '~/types'

/**
 * Define plugin
 *
 * @param plugin IContextCallback
 * @returns IContextCallback
 */
export function definePlugin(plugin: IContextCallback): IContextCallback {
  return (ctx: IGlobalContext) => plugin(ctx)
}

/**
 * Load all admin plugins
 *
 * @param ctx IGlobalContext
 */
export async function loadPlugins(ctx: IGlobalContext) {
  Object.values(import.meta.glob<IContextCallback>('~/plugins/**/*.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    plugin => plugin(ctx),
  )
}
