import type { RouteRecordRaw } from 'vue-router/auto'
import { describe, expect, it } from 'vitest'
import { goodsRoutes, metas } from './_fixtures/meta'
import { transId2Path } from '~/utils/runtime/utils'

function extendRoutesMeta(userRoutes: RouteRecordRaw[], parentPath = ''): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const _parentPath = parentPath

  userRoutes.forEach((r) => {
    const route = { ...r }
    const meta = metas.find((m) => {
      if (route.path === '' || route.path === '/')
        return false

      if (route.path.startsWith('/') || (route.name && (route.name as string).startsWith('/'))) {
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

describe('meta', () => {
  it('extendRoutesMeta', () => {
    expect(extendRoutesMeta(goodsRoutes as RouteRecordRaw[])).toMatchSnapshot()
  })
})
