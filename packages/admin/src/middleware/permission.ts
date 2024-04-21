export default defineMiddleware((to) => {
  // 检查权限
  usePermission().checkPermission(
    [to.meta?.id as string],
    to.meta?.name || '',
  )
})
