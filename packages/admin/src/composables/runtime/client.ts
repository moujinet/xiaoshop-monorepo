import { type Component, createApp } from 'vue'
import { type Router, createRouter } from 'vue-router/auto'
import type { _RouterOptions } from 'unplugin-vue-router/types'
import { defu } from 'defu'
import { createHead } from '@unhead/vue'
import { setupLayouts } from 'virtual:generated-layouts'

import type { IContextCallback, IGlobalContext, IGlobalOptions } from '~/types'
import { DEFAULT_SPACES } from '~/configs/defaults'
import { description as desc, version } from '~~/package.json'

export function createAdminClient(
  App: Component,
  routerOptions: _RouterOptions,
  userOptions: Partial<IGlobalOptions> = {},
  ready?: IContextCallback<Promise<void>>,
  rootContainer = '#app',
) {
  const options: IGlobalOptions = defu(userOptions, {
    name: 'XiaoShop',
    desc,
    version,
    debug: false,
  })

  async function createGlobalContext(): Promise<IGlobalContext> {
    const app = createApp(App)
    const pinia = createPinia()
    const head = createHead()

    app.use(pinia)
    app.use(head)

    // Defaults admin spaces
    const context = useContext()
    DEFAULT_SPACES.forEach(space => context.createSpace(space))

    context.updateOptions(options)

    // Load admin modules
    loadModules()

    // Create admin router
    const router = createRouter({
      ...routerOptions,
      extendRoutes: (r) => {
        const { nestedMenus } = storeToRefs(context)
        const routes = setupLayouts(r)
        return extendRoutesMeta(routes, nestedMenus.value)
      },
    }) as Router

    const ctx: IGlobalContext = {
      app,
      router,
      options,
    }

    app.use(router)

    // Ready
    await ready?.(ctx)

    return ctx
  }

  ;(async () => {
    const ctx = await createGlobalContext()
    await ctx.router.isReady()

    ctx.app.mount(rootContainer, true)
  })()
}
