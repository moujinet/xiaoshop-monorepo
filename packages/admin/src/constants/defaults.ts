import type { ISpace } from '~/types'

export const DEFAULT_NAME = 'XiaoShop'

export const DEFAULT_VERSION = '1.0.0'

export const DEFAULT_SPACES: ISpace[] = [
  { id: 'shop', name: '店铺', desc: '店铺管理', icon: 'ph:storefront', path: '', sort: 1 },
  { id: 'app', name: '应用', desc: '应用管理', icon: 'ph:vibrate', path: '', sort: 2 },
  { id: 'manage', name: '管理', desc: '系统管理', icon: 'ph:gear-six', path: '', sort: 9999 },
  { id: 'system', name: '系统', desc: '', icon: 'ph:globe', path: '', sort: -9999, isShow: false },
]
