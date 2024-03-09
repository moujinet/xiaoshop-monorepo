import type { RouteRecordRaw } from 'vue-router/auto'
import type { IMenu } from '~/types'

/**
 * Transform id to path
 *
 * @param id string
 * @returns string
 */
export function transId2Path(id: string): string {
  return `/${id.split('.').splice(1).join('/')}`
}

/**
 * Extend routes meta
 *
 * @param userRoutes RouteRecordRaw[]
 * @param menus IMenu[]
 *
 * @returns RouteRecordRaw[]
 */
export function extendRoutesMeta(userRoutes: RouteRecordRaw[], menus: IMenu[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  userRoutes.forEach((r) => {
    const route = { ...r }
    const meta = _deepFind(menus, route)

    if (meta) {
      route.meta = {
        ...route.meta,
        id: meta.id,
        space: meta.space,
        module: meta.module,
        title: meta.name,
        desc: meta.desc,
        icon: meta.icon,
        isPermission: meta.isPermission,
      }
    }

    if (route.children && route.children.length > 0)
      route.children = extendRoutesMeta(route.children, menus) || []

    routes.push(route)
  })

  return routes
}

/**
 * Deep find menu by route name
 *
 * @param menus IMenu[]
 * @param route RouteRecordRaw
 *
 * @returns IMenu | undefined
 */
function _deepFind(menus: IMenu[], route: RouteRecordRaw): IMenu | undefined {
  const target = ((route.name || route.path) as string).replace(/\/+$/, '')

  let matched: IMenu | undefined

  for (const menu of menus) {
    if (transId2Path(menu.id) === target) {
      matched = menu
      break
    }

    if (menu.children && menu.children.length > 0)
      matched = _deepFind(menu.children, route) || matched
  }

  return matched
}
