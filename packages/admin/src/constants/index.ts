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
 * 商品类型
 */
export const GOODS_TYPE_REAL_THING = 'real-thing'
export const GOODS_TYPE_VIRTUAL = 'virtual'
export const GOODS_TYPE_CARD = 'card'

export const GOODS_TYPES = [
  { value: GOODS_TYPE_REAL_THING, label: '实物商品' },
  { value: GOODS_TYPE_VIRTUAL, label: '虚拟商品' },
  { value: GOODS_TYPE_CARD, label: '电子卡密' },
]

/**
 * 商品状态
 */
export const GOODS_STATUS_DRAFT = 'draft'
export const GOODS_STATUS_IN_STOCK = 'in-stock'
export const GOODS_STATUS_SOLD_OUT = 'sold-out'

export const GOODS_STATUSES = [
  { value: GOODS_STATUS_IN_STOCK, label: '在售' },
  { value: GOODS_STATUS_SOLD_OUT, label: '下架' },
  { value: GOODS_STATUS_DRAFT, label: '草稿' },
]

/**
 * 商品参数项类型
 */
export const ATTRIBUTE_TYPE_RADIO = 'radio'
export const ATTRIBUTE_TYPE_CHECKBOX = 'checkbox'
export const ATTRIBUTE_TYPE_INPUT = 'input'

export const ATTRIBUTE_TYPES = [
  { value: ATTRIBUTE_TYPE_RADIO, label: '单选' },
  { value: ATTRIBUTE_TYPE_CHECKBOX, label: '多选' },
  { value: ATTRIBUTE_TYPE_INPUT, label: '输入框' },
]
