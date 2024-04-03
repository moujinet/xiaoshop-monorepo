import permission from './directives/permission'

export default definePlugin(({ app }) => {
  app.directive('permission', permission)

  const { hasPermission } = usePermission()
  app.config.globalProperties.$permission = hasPermission
})
