/**
 * 商品默认购买按钮名称
 */
export const GOODS_DEFAULT_BUY_BUTTON_NAME = '立即购买'

/**
 * 商品类型
 */
export const GOODS_TYPE_GOODS = 'goods'
// export const GOODS_TYPE_VIRTUAL = 'virtual'
// export const GOODS_TYPE_CARD = 'card'

export const GOODS_TYPES = [
  { value: GOODS_TYPE_GOODS, label: '实物商品', desc: '需要物流', color: 'arcoblue' },
  // { value: GOODS_TYPE_VIRTUAL, label: '虚拟商品', desc: '无需物流)', color: 'purple' },
  // { value: GOODS_TYPE_CARD, label: '电子卡密', desc: '无需物流', color: 'gray' },
]

// export type IGoodsType = typeof GOODS_TYPE_GOODS | typeof GOODS_TYPE_VIRTUAL | typeof GOODS_TYPE_CARD
export type IGoodsType = typeof GOODS_TYPE_GOODS

/**
 * 商品状态
 */
export const GOODS_STATUS_DRAFT = 'draft'
export const GOODS_STATUS_IN_STOCK = 'in-stock'
export const GOODS_STATUS_SOLD_OUT = 'sold-out'
export const GOODS_STATUS_ALARM = 'alarm'

export const GOODS_STATUSES = [
  { value: GOODS_STATUS_IN_STOCK, label: '在售', color: 'arcoblue' },
  { value: GOODS_STATUS_SOLD_OUT, label: '仓库', color: 'cyan' },
  { value: GOODS_STATUS_ALARM, label: '预警', color: 'red' },
  { value: GOODS_STATUS_DRAFT, label: '草稿', color: 'gray' },
]

export type IGoodsStatus = typeof GOODS_STATUS_DRAFT | typeof GOODS_STATUS_IN_STOCK | typeof GOODS_STATUS_SOLD_OUT | typeof GOODS_STATUS_ALARM

/**
 * 商品参数项类型
 */
export const GOODS_ATTRIBUTE_TYPE_RADIO = 'radio'
export const GOODS_ATTRIBUTE_TYPE_CHECKBOX = 'checkbox'
export const GOODS_ATTRIBUTE_TYPE_INPUT = 'input'

export const GOODS_ATTRIBUTE_TYPES = [
  { value: GOODS_ATTRIBUTE_TYPE_RADIO, label: '单选', color: 'cyan' },
  { value: GOODS_ATTRIBUTE_TYPE_CHECKBOX, label: '多选', color: 'arcoblue' },
  { value: GOODS_ATTRIBUTE_TYPE_INPUT, label: '文本', color: 'green' },
]

export type IGoodsAttributeType = typeof GOODS_ATTRIBUTE_TYPE_RADIO | typeof GOODS_ATTRIBUTE_TYPE_CHECKBOX | typeof GOODS_ATTRIBUTE_TYPE_INPUT

/**
 * 商品库存扣减方式
 */
export const GOODS_STOCK_DEDUCT_TYPE_ORDER = 'order'
export const GOODS_STOCK_DEDUCT_TYPE_PAYMENT = 'payment'

export const GOODS_STOCK_DEDUCT_TYPES = [
  { value: GOODS_STOCK_DEDUCT_TYPE_ORDER, label: '拍下减库存' },
  { value: GOODS_STOCK_DEDUCT_TYPE_PAYMENT, label: '付款减库存' },
]

export type IGoodsStockDeductType = typeof GOODS_STOCK_DEDUCT_TYPE_ORDER | typeof GOODS_STOCK_DEDUCT_TYPE_PAYMENT

/**
 * 商品物流配送方式
 */
export const GOODS_DELIVERY_TYPE_EXPRESS = 'express'
export const GOODS_DELIVERY_TYPE_SELF = 'self'
export const GOODS_DELIVERY_TYPE_LOCAL = 'local'

export const GOODS_DELIVERY_TYPES = [
  { value: GOODS_DELIVERY_TYPE_EXPRESS, label: '快递发货' },
  { value: GOODS_DELIVERY_TYPE_SELF, label: '到店自提' },
  { value: GOODS_DELIVERY_TYPE_LOCAL, label: '同城配送' },
]

export type IGoodsDeliveryType = typeof GOODS_DELIVERY_TYPE_EXPRESS | typeof GOODS_DELIVERY_TYPE_SELF | typeof GOODS_DELIVERY_TYPE_LOCAL

/**
 * 商品物流费用支付方式
 */
export const GOODS_DELIVERY_COSTS_TYPE_UNIFIED = 'unified'
export const GOODS_DELIVERY_COSTS_TYPE_TEMPLATE = 'template'
export const GOODS_DELIVERY_COSTS_TYPE_COD = 'COD'

export const GOODS_DELIVERY_COSTS_TYPES = [
  { value: GOODS_DELIVERY_COSTS_TYPE_UNIFIED, label: '统一运费' },
  { value: GOODS_DELIVERY_COSTS_TYPE_TEMPLATE, label: '运费模板' },
  { value: GOODS_DELIVERY_COSTS_TYPE_COD, label: '运费到付' },
]

export type IGoodsDeliveryCostsType = typeof GOODS_DELIVERY_COSTS_TYPE_UNIFIED | typeof GOODS_DELIVERY_COSTS_TYPE_TEMPLATE | typeof GOODS_DELIVERY_COSTS_TYPE_COD

/**
 * 商品退货运费承担方
 */
export const GOODS_RETURN_COSTS_TYPE_BUYER = 'buyer'
export const GOODS_RETURN_COSTS_TYPE_SELLER = 'seller'

export const GOODS_RETURN_COSTS_TYPES = [
  { value: GOODS_RETURN_COSTS_TYPE_BUYER, label: '买家承担退货运费' },
  { value: GOODS_RETURN_COSTS_TYPE_SELLER, label: '商家承担退货运费' },
]

export type IGoodsReturnCostsType = typeof GOODS_RETURN_COSTS_TYPE_BUYER | typeof GOODS_RETURN_COSTS_TYPE_SELLER

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

export type IGoodsPublishType = typeof GOODS_PUBLISH_TYPE_DIRECT | typeof GOODS_PUBLISH_TYPE_AUTO | typeof GOODS_PUBLISH_TYPE_STOCK

/**
 * 商品购买按钮文本
 */
export const GOODS_BUY_BUTTON_TYPE_DEFAULT = 'default'
export const GOODS_BUY_BUTTON_TYPE_CUSTOM = 'custom'

export const GOODS_BUY_BUTTON_TYPES = [
  { value: GOODS_BUY_BUTTON_TYPE_DEFAULT, label: '默认名称' },
  { value: GOODS_BUY_BUTTON_TYPE_CUSTOM, label: '自定义名称' },
]

export type IGoodsBuyButtonType = typeof GOODS_BUY_BUTTON_TYPE_DEFAULT | typeof GOODS_BUY_BUTTON_TYPE_CUSTOM
