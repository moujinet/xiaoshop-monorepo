import type { RouteRecordRaw } from 'vue-router/auto'
import type { IMenu, IMeta } from '~/types'

export const useMeta = defineStore('meta', () => {
  /**
   * 元信息，用于扩展路由 (内部)
   * 将空间、模块及菜单的基础信息放到元信息中
   */
  const _metas = ref<IMeta[]>([])

  /**
   * 返回已排序的元信息
   */
  const metas = computed(() => {
    if (_metas.value.length === 0)
      refreshMetas()

    return _metas.value.sort((a, b) => a.id.localeCompare(b.id))
  })

  /**
   * 返回指定元信息
   *
   * @param id string
   * @returns IMeta | undefined
   */
  function getMeta(id: string): IMeta | undefined {
    return metas.value.find(m => m.id === id)
  }

  /**
   * 扩展路由 Meta
   *
   * @param userRoutes RouteRecordRaw[]
   * @returns RouteRecordRaw[]
   */
  function extendRoutesMeta(userRoutes: RouteRecordRaw[], parentPath = ''): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []
    const _parentPath = parentPath

    userRoutes.forEach((r) => {
      const route = { ...r }
      const meta = metas.value.find((m) => {
        if (route.path === '' || route.path === '/')
          return false

        if (
          route.path.startsWith('/')
          || (route.name && (route.name as string).startsWith('/'))
        ) {
          return transId2Path(m.id) === route.name
            || `${transId2Path(m.id)}/` === route.name
            || transId2Path(m.id) === route.path
        }

        return transId2Path(m.id) === `${parentPath}/${route.path}`
      })

      if (meta) {
        parentPath += route.path.startsWith('/') ? route.path : `/${route.path}`

        route.meta = {
          ...route.meta,
          id: meta.id,
          space: meta.space,
          module: meta.module,
          name: meta.name,
          desc: meta.desc,
          icon: meta.icon,
        }
      }

      if (route.children && route.children.length > 0)
        route.children = extendRoutesMeta(route.children, parentPath)

      parentPath = meta ? _parentPath : ''

      routes.push(route)
    })

    return routes
  }

  /**
   * 刷新元信息
   */
  function refreshMetas() {
    // Clear all
    _metas.value = []

    // Spaces
    _refreshSpaces()
    // Modules
    _refreshModules()
    // Menus
    _refreshMenus()
  }

  /**
   * 刷新空间元信息
   */
  function _refreshSpaces() {
    const { spaces } = storeToRefs(useSpaces())

    spaces.value.forEach((space) => {
      _metas.value.push({
        id: space.id,
        space: '',
        module: '',
        name: space.name,
        desc: space.desc || '',
        icon: space.icon,
      })
    })
  }

  /**
   * 刷新模块元信息
   */
  function _refreshModules() {
    const { modules } = storeToRefs(useModules())

    modules.value.forEach((module) => {
      _metas.value.push({
        id: module.id,
        space: module.space,
        module: '',
        name: module.name,
        desc: module.desc || '',
        icon: module.icon,
      })
    })
  }

  /**
   * 刷新菜单元信息
   */
  function _refreshMenus() {
    const { menus } = storeToRefs(useMenus())
    _refreshMenusChildren(menus.value)
  }

  /**
   * 刷新菜单子元信息
   *
   * @param children IMenu[]
   */
  function _refreshMenusChildren(children: IMenu[]) {
    children.forEach((menu) => {
      _metas.value.push({
        id: menu.id,
        space: menu.space,
        module: menu.module,
        name: menu.name,
        desc: menu.desc || '',
        icon: menu.icon,
      })

      if (menu.children && menu.children.length > 0)
        _refreshMenusChildren(menu.children)
    })
  }

  return {
    /**
     * 所有元信息
     */
    metas,
    /**
     * 返回指定元信息
     */
    getMeta,
    /**
     * 刷新元信息
     */
    refreshMetas,
    /**
     * 扩展路由 Meta
     */
    extendRoutesMeta,
  }
})
