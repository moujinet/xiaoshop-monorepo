import { type Component, createApp } from 'vue'
import { type Router, createRouter, createWebHistory } from 'vue-router/auto'
import { createHead } from '@unhead/vue'
import { setupLayouts } from 'virtual:generated-layouts'

import type { IContextCallback, IGlobalContext, IGlobalOptions } from '~/types'
import { DEFAULT_SPACES } from '~/constants/defaults'
import { description, version } from '~~/package.json'

export function createAdminClient(
  App: Component,
  ready?: IContextCallback<Promise<void>>,
  rootContainer = '#app',
) {
  const options: IGlobalOptions = {
    name: import.meta.env.VITE_APP_NAME || 'XiaoShop',
    desc: import.meta.env.VITE_APP_DESC || description || 'XiaoShop Admin',
    version: version || '1.0.0',
    debug: import.meta.env.DEV,
  }

  async function createGlobalContext(): Promise<IGlobalContext> {
    const app = createApp(App)
    const pinia = createPinia()
    const head = createHead()

    app
      .use(pinia)
      .use(head)

    // Defaults admin spaces
    const context = useContext()
    DEFAULT_SPACES.forEach(space => context.createSpace(space))

    context.updateOptions(options)

    // Load admin modules
    loadModules()

    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      scrollBehavior: () => ({ left: 0, top: 0 }),
      extendRoutes: (r) => {
        const { menusMeta } = storeToRefs(useContext())
        const routes = setupLayouts(r)
        return extendRoutesMeta(routes, menusMeta.value)
      },
    }) as Router

    const ctx: IGlobalContext = {
      app,
      router,
      options,
    }

    // Load admin middlewares
    loadMiddlewares(ctx)

    // Load admin plugins
    loadPlugins(ctx)

    app.use(router)

    await ready?.(ctx)

    return ctx
  }

  ;(async () => {
    const ctx = await createGlobalContext()
    await ctx.router.isReady()

    ctx.app.mount(rootContainer, true)
  })()
}
