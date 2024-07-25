import { type Component, createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { createHead } from '@unhead/vue'

import type { IAsyncCallback, ICallback, IGlobalContext } from '~/types'
import { version } from '~~/package.json'

export function createAdminClient(
  App: Component,
  ready?: ICallback,
  rootContainer = '#app',
) {
  async function createGlobalContext(): IAsyncCallback<IGlobalContext> {
    const app = createApp(App)
    const pinia = createPinia()
    const head = createHead()

    app
      .use(pinia)
      .use(head)

    ready?.()

    // 加载模块
    loadModules()

    const { extendRoutesMeta } = useMeta()

    const router = createRouter({
      routes: extendRoutesMeta(
        setupLayouts(routes),
      ),
      history: createWebHistory(import.meta.env.BASE_URL),
      scrollBehavior: () => ({ left: 0, top: 0 }),
    })

    app.use(router)

    const ctx: IGlobalContext = {
      app,
      router,
    }

    // 加载中间件及插件
    loadMiddlewares(ctx)
    loadPlugins(ctx)

    return ctx
  }

  ;(async () => {
    const ctx = await createGlobalContext()
    await ctx.router.isReady()

    useApp().setVersion(version)

    ctx.app.mount(rootContainer, true)
  })()
}
