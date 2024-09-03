// --------------------------------
// 商品 - 购买按钮默认名称
// --------------------------------

export const BUY_BUTTON_DEFAULT_NAME = '立即购买'

// --------------------------------
// 商品 - 状态
// --------------------------------

/**
 * 商品状态 - 枚举
 *
 * - `ON_SALE`: 在售
 * - `STOCKED`: 仓库
 * - `SOLD_OUT`: 售罄
 * - `DRAFT`: 草稿
 */
export enum ProductStatus {
  ON_SALE = 1,
  STOCKED,
  SOLD_OUT,
  DRAFT,
}

/**
 * 商品状态 - 字典
 *
 * @see {@link ProductStatus}
 */
export const PRODUCT_STATUSES = [
  { label: '在售', value: ProductStatus.ON_SALE, color: 'arcoblue' },
  { label: '仓库', value: ProductStatus.STOCKED, color: 'cyan' },
  { label: '售罄', value: ProductStatus.SOLD_OUT, color: 'red' },
  { label: '草稿', value: ProductStatus.DRAFT, color: 'gray' },
]

// --------------------------------
// 商品 - 商品类型
// --------------------------------

/**
 * 商品类型 - 枚举
 *
 * - `ENTITY`: 实物商品
 * - `VIRTUAL`: 虚拟商品
 * - `CARD`: 电子卡密
 */
export enum ProductType {
  ENTITY = 1,
  VIRTUAL,
  CARD,
}

/**
 * 商品类型 - 字典
 *
 * @see {@link ProductType}
 */
export const PRODUCT_TYPES = [
  { label: '实物商品', desc: '需要物流', value: ProductType.ENTITY, color: 'arcoblue' },
  { label: '虚拟商品', desc: '无需物流', value: ProductType.VIRTUAL, color: 'purple' },
  { label: '电子卡密', desc: '无需物流', value: ProductType.CARD, color: 'cyan' },
]

// --------------------------------
// 商品 - 商品来源
// --------------------------------

/**
 * 商品来源 - 枚举
 *
 * - `MANUAL`: 手动添加
 * - `IMPORT`: 导入商品
 * - `CLAWER`: 采集商品
 * - `CONNECT`: 云链商品
 */
export enum ProductSource {
  MANUAL = 1,
  IMPORT,
  CLAWER,
  CONNECT,
}

/**
 * 商品来源 - 字典
 *
 * @see {@link ProductSource}
 */
export const PRODUCT_SOURCES = [
  { label: '手动创建', value: ProductSource.MANUAL, color: 'blue', icon: 'mingcute:file-check' },
  { label: '后台导入', value: ProductSource.IMPORT, color: 'cyan', icon: 'mingcute:upload-3' },
  { label: '商品采集', value: ProductSource.CLAWER, color: 'green', icon: 'mingcute:download-3' },
  { label: '云链同步', value: ProductSource.CONNECT, color: 'orange', icon: 'mingcute:refresh-2' },
]

// -----------------------------------------------
// 商品 - 库存扣减方式
// -----------------------------------------------

/**
 * 商品库存扣减模式 - 枚举
 *
 * - `ORDER`: 拍下减库存
 * - `PAID`: 付款减库存
 */
export enum ProductInventoryDeductMode {
  ORDER = 1,
  PAID,
}

/**
 * 商品库存扣减方式 - 字典
 *
 * @see {@link ProductInventoryDeductMode}
 */
export const PRODUCT_INVENTORY_DEDUCT_MODES = [
  { value: ProductInventoryDeductMode.ORDER, label: '拍下减库存' },
  { value: ProductInventoryDeductMode.PAID, label: '付款减库存' },
]

// -----------------------------------------------
// 商品 - 运费支付方式
// -----------------------------------------------

/**
 * 商品运费支付方式 - 枚举
 *
 * - `STD`: 统一运费
 * - `TEMPLATE`: 模板
 * - `COD`: 货到付款
 */
export enum ProductFreightChargeMode {
  STD = 1,
  TEMPLATE,
  COD,
}

/**
 * 商品运费支付方式 - 字典
 *
 * @see {@link ProductFreightChargeMode}
 */
export const PRODUCT_FREIGHT_CHARGE_MODES = [
  { value: ProductFreightChargeMode.STD, label: '统一运费' },
  { value: ProductFreightChargeMode.TEMPLATE, label: '运费模板' },
  { value: ProductFreightChargeMode.COD, label: '运费到付' },
]

// -----------------------------------------------
// 商品 - 退货运费承担方
// -----------------------------------------------

/**
 * 商品退货运费承担方 - 枚举
 *
 * - `SELLER`: 卖家
 * - `BUYER`: 买家
 */
export enum ProductReturnsFreightBy {
  SELLER = 1,
  BUYER,
}

/**
 * 商品退货运费承担方 - 字典
 *
 * @see {@link ProductReturnsFreightBy}
 */
export const PRODUCT_RETURNS_FREIGHT_BYS = [
  { value: ProductReturnsFreightBy.SELLER, label: '商家承担退费运费' },
  { value: ProductReturnsFreightBy.BUYER, label: '买家承担退货运费' },
]

// -----------------------------------------------
// 商品 - 上架方式
// -----------------------------------------------

/**
 * 商品发布模式 - 枚举
 *
 * - `DIRECT`: 立即上架
 * - `AUTO`: 自定义上架
 * - `STOCKED`: 暂不售卖, 放入仓库
 */
export enum ProductPublishMode {
  DIRECT = 1,
  AUTO,
  STOCKED,
}

/**
 * 商品上架方式 - 字典
 *
 * @see {@link ProductPublishMode}
 */
export const PRODUCT_PUBLISH_MODES = [
  { value: ProductPublishMode.DIRECT, label: '立即上架' },
  { value: ProductPublishMode.AUTO, label: '自定义上架' },
  { value: ProductPublishMode.STOCKED, label: '暂不售卖, 放入仓库' },
]

// -----------------------------------------------
// 商品 - 购买按钮类型
// -----------------------------------------------

/**
 * 商品购买按钮类型 - 枚举
 *
 * - `DEFAULT`: 默认名称
 * - `CUSTOM`: 自定义名称
 */
export enum ProductBuyBtnType {
  DEFAULT,
  CUSTOM,
}

/**
 * 商品购买按钮类型 - 字典
 *
 * @see {@link ProductBuyBtnType}
 */
export const PRODUCT_BUY_BTN_TYPES = [
  { value: ProductBuyBtnType.DEFAULT, label: '默认名称' },
  { value: ProductBuyBtnType.CUSTOM, label: '自定义名称' },
]

// -----------------------------------------------
// 商品 - 评价 - 综合评级
// -----------------------------------------------

/**
 * 商品综合评分 - 枚举
 *
 * - `HIGH`: 好评
 * - `NORMAL`: 中评
 * - `LOW`: 差评
 */
export enum ProductRatingGrade {
  LOW = 1,
  NORMAL,
  HIGH,
}

/**
 * 商品评价综合评级 - 字典
 *
 * @see {@link ProductRatingGrade}
 */
export const PRODUCT_RATING_GRADES = [
  { value: ProductRatingGrade.HIGH, label: '好评', color: 'gold', icon: 'mingcute:emoji-2' },
  { value: ProductRatingGrade.NORMAL, label: '中评', color: 'blue', icon: 'mingcute:emoji' },
  { value: ProductRatingGrade.LOW, label: '差评', color: 'red', icon: 'mingcute:angry' },
]

// --------------------------------
// 商品 - 参数模板 - 选项类型
// --------------------------------

/**
 * 商品参数模板选项类型 - 枚举
 *
 * - `TEXT`: 文本
 * - `RADIO`: 单选
 * - `CHECKBOX`: 多选
 */
export enum ProductAttributeTemplateOptionType {
  TEXT = 1,
  RADIO,
  CHECKBOX,
}

/**
 * 商品参数模板选项类型 - 字典
 *
 * @see {@link ProductAttributeTemplateOptionType}
 */
export const PRODUCT_ATTRIBUTE_TEMPLATE_OPTION_TYPES = [
  { label: '文本', value: ProductAttributeTemplateOptionType.TEXT },
  { label: '单选', value: ProductAttributeTemplateOptionType.RADIO },
  { label: '多选', value: ProductAttributeTemplateOptionType.CHECKBOX },
]

// --------------------------------
// 商品 - 导出记录 - 导出状态
// --------------------------------

/**
 * 商品导出记录 - 导出状态 - 枚举
 *
 * - `PENDING`: 待导出
 * - `COMPLETED`: 导出完成
 * - `FAILED`: 导出失败
 */
export enum ProductExportStatus {
  PENDING,
  COMPLETED,
  FAILED,
}

/**
 * 商品导出记录 - 导出状态 - 字典
 *
 * @see {@link ProductExportStatus}
 */
export const PRODUCT_EXPORT_STATUSES = [
  { label: '待导出', value: ProductExportStatus.PENDING, color: 'arcoblue' },
  { label: '导出完成', value: ProductExportStatus.COMPLETED, color: 'green' },
  { label: '导出失败', value: ProductExportStatus.FAILED, color: 'red' },
]
