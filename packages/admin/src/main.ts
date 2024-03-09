import { createWebHistory } from 'vue-router/auto'
import App from '~/app.vue'

import 'tdesign-vue-next/es/style/index.css'
import '~/styles/index.less'

createAdminClient(
  App,
  {
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => ({ left: 0, top: 0 }),
  },
  {
    name: import.meta.env.VITE_APP_NAME || '',
    debug: import.meta.env.DEV,
  },
  async (ctx) => {
    // install all middlewares under `middleware/`
    await loadMiddlewares(ctx)
    // install all plugins under `plugins/`
    await loadPlugins(ctx)
  },
)
