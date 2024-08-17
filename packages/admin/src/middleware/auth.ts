const whiteList = ['/', '/login']

export default defineMiddleware((to, from, next) => {
  const { isLogin } = useSession()
  const { spaces } = useApp()

  if (!isLogin.value) {
    // 白名单
    if (!whiteList.includes(to.path)) {
      next({ path: '/login', query: { redirect: to.path } })
      return true
    }
  }
  else {
    if (whiteList.includes(to.path)) {
      next({ path: spaces.value.find(space => space.id === 'shop')?.path })
      return true
    }
  }
})
