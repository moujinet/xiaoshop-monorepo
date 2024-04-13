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
 * 素材类型
 */
export const ASSET_TYPE_IMAGE = 'image'
export const ASSET_TYPE_VIDEO = 'video'
export const ASSET_TYPE_ICON = 'icon'

export const ASSET_TYPES = [
  { value: ASSET_TYPE_IMAGE, label: '图片', icon: 'ph:image-bold' },
  { value: ASSET_TYPE_VIDEO, label: '视频', icon: 'ph:video-bold' },
  { value: ASSET_TYPE_ICON, label: '图标', icon: 'ph:plus-bold' },
]

/**
 * 素材上传文件类型
 */
export const ASSET_ACCEPT_IMAGE = 'image/png,image/jpg,image/jpeg'
export const ASSET_ACCEPT_VIDEO = 'video/mp4'
export const ASSET_ACCEPT_ICON = 'image/png,image/svg+xml'

export const ASSET_ACCEPTS = {
  [ASSET_TYPE_IMAGE]: ASSET_ACCEPT_IMAGE,
  [ASSET_TYPE_VIDEO]: ASSET_ACCEPT_VIDEO,
  [ASSET_TYPE_ICON]: ASSET_ACCEPT_ICON,
}

/**
 * 商品类型
 */
export const GOODS_TYPE_GOODS = 'goods'
export const GOODS_TYPE_VIRTUAL = 'virtual'
export const GOODS_TYPE_CARD = 'card'

export const GOODS_TYPES = [
  { value: GOODS_TYPE_GOODS, label: '实物商品', desc: '(需要物流)' },
  { value: GOODS_TYPE_VIRTUAL, label: '虚拟商品', desc: '(无需物流)' },
  { value: GOODS_TYPE_CARD, label: '电子卡密', desc: '(无需物流)' },
]

/**
 * 商品状态
 */
export const GOODS_STATUS_DRAFT = 'draft'
export const GOODS_STATUS_IN_STOCK = 'in-stock'
export const GOODS_STATUS_SOLD_OUT = 'sold-out'

export const GOODS_STATUSES = [
  { value: GOODS_STATUS_IN_STOCK, label: '在售' },
  { value: GOODS_STATUS_SOLD_OUT, label: '仓库' },
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

/**
 * 商品库存扣减方式
 */
export const GOODS_STOCK_DEDUCT_TYPE_ORDER = 'order'
export const GOODS_STOCK_DEDUCT_TYPE_PAYMENT = 'payment'

export const GOODS_STOCK_DEDUCT_TYPES = [
  { value: GOODS_STOCK_DEDUCT_TYPE_ORDER, label: '拍下减库存' },
  { value: GOODS_STOCK_DEDUCT_TYPE_PAYMENT, label: '付款减库存' },
]

/**
 * 商品物流费用支付方式
 */
export const GOODS_FREIGHT_COSTS_TYPE_UNIFIED = 'unified'
export const GOODS_FREIGHT_COSTS_TYPE_TEMPLATE = 'template'
export const GOODS_FREIGHT_COSTS_TYPE_COLLECT = 'collect'

export const GOODS_FREIGHT_COSTS_TYPES = [
  { value: GOODS_FREIGHT_COSTS_TYPE_UNIFIED, label: '统一运费' },
  { value: GOODS_FREIGHT_COSTS_TYPE_TEMPLATE, label: '运费模板' },
  { value: GOODS_FREIGHT_COSTS_TYPE_COLLECT, label: '运费到付' },
]

/**
 * 商品退货运费承担方
 */
export const GOODS_RETURN_COSTS_TYPE_BUYER = 'buyer'
export const GOODS_RETURN_COSTS_TYPE_SELLER = 'seller'

export const GOODS_RETURN_COSTS_TYPES = [
  { value: GOODS_RETURN_COSTS_TYPE_BUYER, label: '买家承担退货运费' },
  { value: GOODS_RETURN_COSTS_TYPE_SELLER, label: '商家承担退货运费' },
]

/**
 * 商品上架方式
 */
export const GOODS_PUBLISH_TYPE_DIRECT = 'direct'
export const GOODS_PUBLISH_TYPE_STOCK = 'stock'
export const GOODS_PUBLISH_TYPE_AUTO = 'auto'

export const GOODS_PUBLISH_TYPES = [
  { value: GOODS_PUBLISH_TYPE_DIRECT, label: '立即上架' },
  { value: GOODS_PUBLISH_TYPE_AUTO, label: '自定义上架时间' },
  { value: GOODS_PUBLISH_TYPE_STOCK, label: '暂不售卖, 放入仓库' },
]

/**
 * 商品购买按钮文本
 */
export const GOODS_BUY_BUTTON_TYPE_DEFAULT = 'default'
export const GOODS_BUY_BUTTON_TYPE_CUSTOM = 'custom'

export const GOODS_BUY_BUTTON_TYPES = [
  { value: GOODS_BUY_BUTTON_TYPE_DEFAULT, label: '默认名称' },
  { value: GOODS_BUY_BUTTON_TYPE_CUSTOM, label: '自定义名称' },
]
