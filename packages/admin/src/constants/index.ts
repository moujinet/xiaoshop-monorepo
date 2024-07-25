export const NOTIFICATION_TYPE_NOTICE = 'notice'
export const NOTIFICATION_TYPE_MESSAGE = 'message'

export const NOTIFICATION_TYPES = [
  { value: NOTIFICATION_TYPE_NOTICE, label: '通知' },
  { value: NOTIFICATION_TYPE_MESSAGE, label: '消息' },
]

export const NOTIFICATION_CATEGORY_SYSTEM = 'system'
export const NOTIFICATION_CATEGORY_UPGRADE = 'upgrade'
export const NOTIFICATION_CATEGORY_ORDER = 'order'

export const NOTIFICATION_CATEGORIES = [
  { id: NOTIFICATION_CATEGORY_SYSTEM, name: '系统通知', color: '#3370ff', icon: 'ph:bell-duotone' },
  { id: NOTIFICATION_CATEGORY_UPGRADE, name: '版本更新', color: '#00d0b6', icon: 'ph:circle-wavy-warning-duotone' },
  { id: NOTIFICATION_CATEGORY_ORDER, name: '订单通知', color: '#ff7d00', icon: 'ph:shopping-cart-simple-duotone' },
]

/**
 * 来源 (注册、登录、支付、下单等)
 */
export const SOURCE_WEB = 'web'
export const SOURCE_H5 = 'h5'
export const SOURCE_APP_IOS = 'ios'
export const SOURCE_APP_ANDROID = 'android'
export const SOURCE_WECHAT_OFFIACCOUNT = 'wechat-offiaccount'
export const SOURCE_WECHAT_MINIPROGRAM = 'wechat-miniprogram'
export const SOURCE_ADMIN = 'admin'
