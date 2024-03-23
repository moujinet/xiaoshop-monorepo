import { type Component, createApp } from 'vue'
import { type Router, createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { createHead } from '@unhead/vue'

import { useStorage } from '@vueuse/core'
import type { IAsyncCallback, IContextCallback, IGlobalContext } from '~/types'
import { version } from '~~/package.json'

export function createAdminClient(
  App: Component,
  ready?: IContextCallback<IAsyncCallback>,
  rootContainer = '#app',
) {
  async function createGlobalContext(): IAsyncCallback<IGlobalContext> {
    const app = createApp(App)
    const pinia = createPinia()
    const head = createHead()

    app
      .use(pinia)
      .use(head)

    // 加载模块
    loadModules()

    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      scrollBehavior: () => ({ left: 0, top: 0 }),
      extendRoutes: (r) => {
        const routes = setupLayouts(r)
        const { extendRoutesMeta } = useMeta()
        return extendRoutesMeta(routes)
      },
    }) as Router

    app.use(router)

    const ctx: IGlobalContext = {
      app,
      router,
    }

    // 加载中间件及插件
    loadMiddlewares(ctx)
    loadPlugins(ctx)

    await ready?.(ctx)

    return ctx
  }

  ;(async () => {
    const ctx = await createGlobalContext()
    await ctx.router.isReady()

    useStorage('xiaoshop-version', version, localStorage)

    ctx.app.mount(rootContainer, true)
  })()
}
