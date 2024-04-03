import type { IGlobalContext, IPlugin, IPluginInstaller } from '~/types'

/**
 * 定义插件
 *
 * @param plugin IPlugin
 * @returns IPluginInstaller
 */
export function definePlugin(plugin: IPlugin): IPluginInstaller {
  return (ctx: IGlobalContext) => plugin(ctx)
}

/**
 * 加载所有插件
 *
 * @param ctx IGlobalContext
 */
export function loadPlugins(ctx: IGlobalContext) {
  Object.values(import.meta.glob<IPluginInstaller>('~/plugins/**/install.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    plugin => plugin(ctx),
  )
}
