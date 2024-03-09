import type { IAdminSpace } from '~/types'

/**
 * Default spaces
 */
export const DEFAULT_SPACES: IAdminSpace[] = [
  { id: 'shop', name: '店铺', desc: '店铺管理', icon: 'ph:storefront', sort: 0 },
  { id: 'app', name: '应用', desc: '应用管理', icon: 'ph:vibrate', sort: 1 },
  { id: 'settings', name: '管理', desc: '系统管理', icon: 'ph:gear-six', sort: 99 },
]
