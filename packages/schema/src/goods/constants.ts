// -----------------------------------------------
// 商品 - 商品状态
// -----------------------------------------------

/**
 * 枚举: 商品状态
 *
 * - `IN_STOCK`: 在售
 * - `STOCKED`: 仓库
 * - `SOLD_OUT`: 售罄
 * - `DRAFT`: 草稿
 */
export enum GoodsStatus {
  IN_STOCK = 'in_stock',
  STOCKED = 'stocked',
  SOLD_OUT = 'sold_out',
  DRAFT = 'draft',
}

/**
 * 字典: 商品状态
 *
 * @see {@link IGoodsStatus}
 */
export const GOODS_STATUSES = [
  { value: GoodsStatus.IN_STOCK, label: '在售', color: 'blue' },
  { value: GoodsStatus.STOCKED, label: '仓库', color: 'cyan' },
  { value: GoodsStatus.SOLD_OUT, label: '售韾', color: 'orange' },
  { value: GoodsStatus.DRAFT, label: '草稿', color: 'gray' },
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
export enum GoodsType {
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
  { value: GoodsType.ENTITY, label: '实物商品', desc: '需要物流', color: 'blue' },
  { value: GoodsType.VIRTUAL, label: '虚拟商品', desc: '无需物流)', color: 'purple' },
  { value: GoodsType.CARD, label: '电子卡密', desc: '无需物流', color: 'gray' },
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
export enum GoodsSource {
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
  { label: '手动创建', value: GoodsSource.MANUAL, color: 'blue', icon: 'mingcute:file-check' },
  { label: '后台导入', value: GoodsSource.IMPORT, color: 'cyan', icon: 'mingcute:upload-3' },
  { label: '商品采集', value: GoodsSource.CLAWER, color: 'green', icon: 'mingcute:download-3' },
  { label: '云链同步', value: GoodsSource.CONNECT, color: 'orange', icon: 'mingcute:refresh-2' },
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
export enum GoodsInventoryDeductMode {
  ORDER = 'order',
  PAID = 'paid',
}

/**
 * 字典: 商品库存扣减方式
 *
 * @see {@link IGoodsInventoryDeductMode}
 */
export const GOODS_INVENTORY_DEDUCT_MODES = [
  { value: GoodsInventoryDeductMode.ORDER, label: '拍下减库存' },
  { value: GoodsInventoryDeductMode.PAID, label: '付款减库存' },
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
export enum GoodsFreightChargeMode {
  STD = 'std',
  TEMPLATE = 'template',
  COD = 'cod',
}

/**
 * 字典: 商品运费支付方式
 *
 * @see {@link IGoodsFreightChargeMode}
 */
export const GOODS_FREIGHT_CHARGE_MODES = [
  { value: GoodsFreightChargeMode.STD, label: '统一运费' },
  { value: GoodsFreightChargeMode.TEMPLATE, label: '运费模板' },
  { value: GoodsFreightChargeMode.COD, label: '运费到付' },
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
export enum GoodsReturnsFreightBy {
  SELLER = 'seller',
  BUYER = 'buyer',
}

/**
 * 字典: 商品退货运费承担方
 *
 * @see {@link IGoodsReturnsFreightBy}
 */
export const GOODS_RETURNS_FREIGHT_BYS = [
  { value: GoodsReturnsFreightBy.SELLER, label: '商家承担退费运费' },
  { value: GoodsReturnsFreightBy.BUYER, label: '买家承担退货运费' },
]

// -----------------------------------------------
// 商品 - 上架方式
// -----------------------------------------------

/**
 * 枚举: 商品发布模式
 *
 * - `DIRECT`: 立即上架
 * - `AUTO`: 自定义上架
 * - `STOCKED`: 暂不售卖, 放入仓库
 */
export enum GoodsPublishMode {
  DIRECT = 'direct',
  AUTO = 'auto',
  STOCKED = 'stocked',
}

/**
 * 字典: 商品上架方式
 *
 * @see {@link IGoodsPublishMode}
 */
export const GOODS_PUBLISH_MODES = [
  { value: GoodsPublishMode.DIRECT, label: '立即上架' },
  { value: GoodsPublishMode.AUTO, label: '自定义上架' },
  { value: GoodsPublishMode.STOCKED, label: '暂不售卖, 放入仓库' },
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
export enum GoodsBuyBtnType {
  DEFAULT = 'default',
  CUSTOM = 'custom',
}

/**
 * 字典: 商品购买按钮类型
 *
 * @see {@link IGoodsBuyBtnType}
 */
export const GOODS_BUY_BTN_TYPES = [
  { value: GoodsBuyBtnType.DEFAULT, label: '默认名称' },
  { value: GoodsBuyBtnType.CUSTOM, label: '自定义名称' },
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
export enum GoodsAttributeOptionType {
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
  { value: GoodsAttributeOptionType.INPUT, label: '文本', color: 'gray' },
  { value: GoodsAttributeOptionType.RADIO, label: '单选', color: 'cyan' },
  { value: GoodsAttributeOptionType.CHECKBOX, label: '多选', color: 'arcoblue' },
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
export enum GoodsRatingGrade {
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
  { value: GoodsRatingGrade.HIGH, label: '好评', color: 'gold', icon: 'mingcute:emoji-2' },
  { value: GoodsRatingGrade.NORMAL, label: '中评', color: 'blue', icon: 'mingcute:emoji' },
  { value: GoodsRatingGrade.LOW, label: '差评', color: 'red', icon: 'mingcute:angry' },
]

// -----------------------------------------------
// 商品 - 导出 - 导出状态
// -----------------------------------------------

/**
 * 枚举: 商品导出状态
 *
 * - `PENDING`: 等待导出
 * - `PROCESSING`: 导出中
 * - `SUCCESS`: 导出成功
 * - `FAILED`: 导出失败
 */
export enum GoodsExportRecordStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
}

/**
 * 字典: 商品导出状态
 *
 * @see {@link IGoodsExportRecordStatus}
 */
export const GOODS_EXPORT_RECORD_STATUSES = [
  { value: GoodsExportRecordStatus.PENDING, label: '等待导出' },
  { value: GoodsExportRecordStatus.PROCESSING, label: '导出中' },
  { value: GoodsExportRecordStatus.SUCCESS, label: '导出成功' },
  { value: GoodsExportRecordStatus.FAILED, label: '导出失败' },
]
