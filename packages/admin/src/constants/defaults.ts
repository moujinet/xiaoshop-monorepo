import type { ISpace } from '~/types'

export const DEFAULT_NAME = 'XiaoShop'

export const DEFAULT_VERSION = '1.0.0'

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_AVATAR = '/img/logo.png'

export const DEFAULT_POSTER = '/img/poster.png'

export const DEFAULT_MESSAGE_ID = 'GLOBAL.MESSAGE'
export const DEFAULT_MESSAGE_DURATION = 1200
export const DEFAULT_NOTIFICATION_DURATION = 3500

export const DEFAULT_SPACES: ISpace[] = [
  { id: 'shop', name: '店铺', desc: '店铺管理', icon: 'mingcute:store', path: '/goods/manage/goods', sort: 1 },
  { id: 'app', name: '应用', desc: '应用管理', icon: 'mingcute:classify-3', path: '/editor/pages/home', sort: 2 },
  { id: 'connect', name: '云链', desc: '接入云链', icon: 'xiaoshop:connect', path: '/editor/pages/home', sort: 3 },
  { id: 'manage', name: '管理', desc: '系统管理', icon: 'mingcute:settings-5', path: '/settings/store/info', sort: 999 },
  { id: 'built-in', name: '内建', desc: '', icon: '-', path: '', sort: -9999, isShow: false },
]
