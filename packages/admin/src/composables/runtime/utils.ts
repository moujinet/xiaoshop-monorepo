import type { RouteRecordRaw } from 'vue-router/auto'
import type { TMenuMeta } from '~/types'

/**
 * Transform id to path
 *
 * @param id string
 * @returns string
 */
export function transId2Path(id: string): string {
  const parts: string[] = id.split('.')

  if (parts[parts.length - 1] === 'index')
    parts.pop()

  return `/${parts.splice(1).join('/')}`
}

/**
 * Extend routes meta
 *
 * @param userRoutes RouteRecordRaw[]
 * @param metas TMenuMeta[]
 *
 * @returns RouteRecordRaw[]
 */
export function extendRoutesMeta(userRoutes: RouteRecordRaw[], metas: TMenuMeta[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  userRoutes.forEach((r) => {
    const route = { ...r }
    const meta = metas.find(m => transId2Path(m.id) === route.name || `${transId2Path(m.id)}/` === route.name)

    if (meta) {
      route.meta = {
        ...route.meta,
        id: meta.id,
        space: meta.space,
        type: meta.type,
        module: meta.module,
        title: meta.name,
        desc: meta.desc,
        icon: meta.icon,
      }
    }

    if (route.children && route.children.length > 0)
      route.children = extendRoutesMeta(route.children, metas) || []

    routes.push(route)
  })

  return routes
}
