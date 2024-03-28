import type { ISpace } from '~/types'

export const DEFAULT_NAME = 'XiaoShop'

export const DEFAULT_VERSION = '1.0.0'

export const DEFAULT_SPACES: ISpace[] = [
  { id: 'shop', name: '店铺', desc: '店铺管理', icon: 'ph:storefront', path: '', sort: 1 },
  { id: 'app', name: '应用', desc: '应用管理', icon: 'ph:vibrate', path: '/editor/pages/home', sort: 2 },
  { id: 'manage', name: '管理', desc: '系统管理', icon: 'ph:gear', path: '/settings/store/info', sort: 9999 },
  { id: 'built-in', name: '内建', desc: '', icon: '-', path: '', sort: -9999, isShow: false },
]

export const DEFAULT_PAGE_SIZE = 20
