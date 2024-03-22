import { APP_NAME } from '~/constants/env'

export default defineMiddleware((to) => {
  useHead({
    title: to.meta.desc
      ? `${to.meta.desc} | ${APP_NAME}`
      : to.meta.name
        ? `${to.meta.name} | ${APP_NAME}`
        : APP_NAME,
  })
})
