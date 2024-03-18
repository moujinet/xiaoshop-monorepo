import type { ISpace } from '~/types'

/**
 * Default spaces
 */
export const DEFAULT_SPACES: ISpace[] = [
  { id: 'global', name: '系统', desc: '系统菜单', icon: 'ph:globe', sort: -99 },
  { id: 'shop', name: '店铺', desc: '店铺管理', icon: 'ph:storefront', sort: 1 },
  { id: 'app', name: '应用', desc: '应用管理', icon: 'ph:vibrate', sort: 2 },
  { id: 'settings', name: '管理', desc: '系统管理', icon: 'ph:gear-six', sort: 99999 },
]
