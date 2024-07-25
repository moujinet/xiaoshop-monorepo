// -----------------------------------------------
// 商品 - 商品状态
// -----------------------------------------------

/**
 * 枚举: 商品状态
 *
 * - `IN_STOCK`: 在售
 * - `stocked`: 仓库
 * - `STOCKED`: 预警
 * - `SOLD_OUT`: 售罄
 * - `DRAFT`: 草稿
 */
export enum GoodsStatusEnum {
  IN_STOCK = 'in_stock',
  STOCKED = 'stocked',
  WARNING = 'warning',
  SOLD_OUT = 'sold_out',
  DRAFT = 'draft',
}

/**
 * 字典: 商品状态
 *
 * @see {@link IGoodsStatus}
 */
export const GOODS_STATUSES = [
  { value: GoodsStatusEnum.IN_STOCK, label: '在售', color: 'blue' },
  { value: GoodsStatusEnum.STOCKED, label: '仓库', color: 'cyan' },
  { value: GoodsStatusEnum.WARNING, label: '预警', color: 'red' },
  { value: GoodsStatusEnum.SOLD_OUT, label: '售韾', color: 'cyan' },
  { value: GoodsStatusEnum.DRAFT, label: '草稿', color: 'gray' },
]

// -----------------------------------------------
// 商品 - 商品类型
// -----------------------------------------------

/**
 * 枚举: 商品类型
 *
 * - `ENTITY`: 实物商品
 * - `VIRTUAL`: 虚拟商品
 * - `CARD`: 电子卡密
 */
export enum GoodsTypeEnum {
  ENTITY = 'entity',
  VIRTUAL = 'virtual',
  CARD = 'card',
}

/**
 * 字典: 商品类型
 *
 * @see {@link IGoodsType}
 */
export const GOODS_TYPES = [
  { value: GoodsTypeEnum.ENTITY, label: '实物商品', desc: '需要物流', color: 'blue' },
  { value: GoodsTypeEnum.VIRTUAL, label: '虚拟商品', desc: '无需物流)', color: 'purple' },
  { value: GoodsTypeEnum.CARD, label: '电子卡密', desc: '无需物流', color: 'gray' },
]

// -----------------------------------------------
// 商品 - 商品来源
// -----------------------------------------------

/**
 * 枚举: 商品来源
 *
 * - `MANUAL`: 手动
 * - `IMPORT`: 导入
 * - `CLAWER`: 采集
 * - `CONNECT`: 云链
 */
export enum GoodsSourceEnum {
  MANUAL = 'manual',
  IMPORT = 'import',
  CLAWER = 'clawer',
  CONNECT = 'connect',
}

/**
 * 字典: 商品来源
 *
 * @see {@link IGoodsSource}
 */
export const GOODS_SOURCES = [
  { label: '手动创建', value: GoodsSourceEnum.MANUAL, color: 'blue', icon: 'mingcute:file-check' },
  { label: '后台导入', value: GoodsSourceEnum.IMPORT, color: 'cyan', icon: 'mingcute:upload-3' },
  { label: '商品采集', value: GoodsSourceEnum.CLAWER, color: 'green', icon: 'mingcute:download-3' },
  { label: '云链同步', value: GoodsSourceEnum.CONNECT, color: 'orange', icon: 'mingcute:refresh-2' },
]

// -----------------------------------------------
// 商品 - 库存扣减方式
// -----------------------------------------------

/**
 * 枚举: 商品库存扣减模式
 *
 * - `ORDER`: 拍下减库存
 * - `PAID`: 付款减库存
 */
export enum GoodsStockDeductModeEnum {
  ORDER = 'order',
  PAID = 'paid',
}

/**
 * 字典: 商品库存扣减方式
 *
 * @see {@link IGoodsStockDeductMode}
 */
export const GOODS_STOCK_DEDUCT_MODES = [
  { value: GoodsStockDeductModeEnum.ORDER, label: '拍下减库存' },
  { value: GoodsStockDeductModeEnum.PAID, label: '付款减库存' },
]

// -----------------------------------------------
// 商品 - 运费支付方式
// -----------------------------------------------

/**
 * 枚举: 商品运费支付方式
 *
 * - `STD`: 统一运费
 * - `TEMPLATE`: 模板
 * - `COD`: 货到付款
 */
export enum GoodsLogisticsFreightChargeModeEnum {
  STD = 'std',
  TEMPLATE = 'template',
  COD = 'cod',
}

/**
 * 字典: 商品运费支付方式
 *
 * @see {@link IGoodsLogisticsFreightChargeMode}
 */
export const GOODS_LOGISTICS_FREIGHT_CHARGE_MODES = [
  { value: GoodsLogisticsFreightChargeModeEnum.STD, label: '统一运费' },
  { value: GoodsLogisticsFreightChargeModeEnum.TEMPLATE, label: '运费模板' },
  { value: GoodsLogisticsFreightChargeModeEnum.COD, label: '运费到付' },
]

// -----------------------------------------------
// 商品 - 退货运费承担方
// -----------------------------------------------

/**
 * 枚举: 商品退货运费承担方
 *
 * - `SELLER`: 卖家
 * - `BUYER`: 买家
 */
export enum GoodsLogisticsBackFreightByEnum {
  SELLER = 'seller',
  BUYER = 'buyer',
}

/**
 * 字典: 商品退货运费承担方
 *
 * @see {@link IGoodsLogisticsBackFreightBy}
 */
export const GOODS_LOGISTICS_BACK_FREIGHT_BYS = [
  { value: GoodsLogisticsBackFreightByEnum.SELLER, label: '商家承担退费运费' },
  { value: GoodsLogisticsBackFreightByEnum.BUYER, label: '买家承担退货运费' },
]

// -----------------------------------------------
// 商品 - 上架方式
// -----------------------------------------------

/**
 * 枚举: 商品发布模式
 *
 * - `DIRECT`: 立即上架
 * - `AUTO`: 自定义上架
 * - `STOCK`: 暂不售卖, 放入仓库
 */
export enum GoodsPublishModeEnum {
  DIRECT = 'direct',
  AUTO = 'auto',
  STOCK = 'stock',
}

/**
 * 字典: 商品上架方式
 *
 * @see {@link IGoodsPublishMode}
 */
export const GOODS_PUBLISH_MODES = [
  { value: GoodsPublishModeEnum.DIRECT, label: '立即上架' },
  { value: GoodsPublishModeEnum.AUTO, label: '自定义上架' },
  { value: GoodsPublishModeEnum.STOCK, label: '暂不售卖, 放入仓库' },
]

// -----------------------------------------------
// 商品 - 购买按钮类型
// -----------------------------------------------

/**
 * 枚举: 商品购买按钮类型
 *
 * - `DEFAULT`: 默认名称
 * - `CUSTOM`: 自定义名称
 */
export enum GoodsBuyBtnTypeEnum {
  DEFAULT = 'default',
  CUSTOM = 'custom',
}

/**
 * 字典: 商品购买按钮类型
 *
 * @see {@link IGoodsBuyBtnType}
 */
export const GOODS_BUY_BTN_TYPES = [
  { value: GoodsBuyBtnTypeEnum.DEFAULT, label: '默认名称' },
  { value: GoodsBuyBtnTypeEnum.CUSTOM, label: '自定义名称' },
]

// -----------------------------------------------
// 商品 - 参数模板参数类型
// -----------------------------------------------

/**
 * 枚举: 商品参数模板选项类型
 *
 * - `CHECKBOX`: 复选框
 * - `RADIO`: 单选框
 * - `INPUT`: 文本
 */
export enum GoodsAttributeOptionTypeEnum {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  INPUT = 'input',
}

/**
 * 字典: 商品参数模板参数类型
 *
 * @see {@link IGoodsAttributeOptionType}
 */
export const GOODS_ATTRIBUTE_OPTION_TYPES = [
  { value: GoodsAttributeOptionTypeEnum.INPUT, label: '文本', color: 'gray' },
  { value: GoodsAttributeOptionTypeEnum.RADIO, label: '单选', color: 'cyan' },
  { value: GoodsAttributeOptionTypeEnum.CHECKBOX, label: '多选', color: 'arcoblue' },
]

// -----------------------------------------------
// 商品 - 评价 - 综合评级
// -----------------------------------------------

/**
 * 枚举: 商品综合评分
 *
 * - `HIGH`: 好评
 * - `NORMAL`: 中评
 * - `LOW`: 差评
 */
export enum GoodsRatingGradeEnum {
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low',
}

/**
 * 字典: 商品评价综合评级
 *
 * @see {@link IGoodsRatingGrade}
 */
export const GOODS_RATING_GRADES = [
  { value: GoodsRatingGradeEnum.HIGH, label: '好评', color: 'gold', icon: 'mingcute:emoji-2' },
  { value: GoodsRatingGradeEnum.NORMAL, label: '中评', color: 'blue', icon: 'mingcute:emoji' },
  { value: GoodsRatingGradeEnum.LOW, label: '差评', color: 'red', icon: 'mingcute:angry' },
]
