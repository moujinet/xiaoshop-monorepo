// --------------------------------
// 商品 - 状态
// --------------------------------

/**
 * 商品状态
 *
 * - `DRAFT`: 草稿
 * - `ON_SALE`: 在售
 * - `STOCKED`: 仓库
 * - `SOLD_OUT`: 售罄
 */
export enum ProductStatus {
  DRAFT = 1,
  ON_SALE,
  STOCKED,
  SOLD_OUT,
}

// --------------------------------
// 商品 - 商品类型
// --------------------------------

/**
 * 商品类型
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

// --------------------------------
// 商品 - 商品来源
// --------------------------------

/**
 * 商品来源
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

// -----------------------------------------------
// 商品 - 服务类型
// -----------------------------------------------

/**
 * 商品服务类型
 *
 * - `EXTRA`: 保障服务
 * - `ADDITION`: 附加服务
 */
export enum ProductServiceType {
  EXTRA = 1,
  ADDITION,
}

// -----------------------------------------------
// 商品 - 库存扣减方式
// -----------------------------------------------

/**
 * 商品库存扣减模式
 *
 * - `ORDER`: 拍下减库存
 * - `PAID`: 付款减库存
 */
export enum ProductInventoryDeductMode {
  ORDER = 1,
  PAID,
}

// -----------------------------------------------
// 商品 - 运费支付方式
// -----------------------------------------------

/**
 * 商品运费支付方式
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

// -----------------------------------------------
// 商品 - 退货运费承担方
// -----------------------------------------------

/**
 * 商品退货运费承担方
 *
 * - `SELLER`: 卖家
 * - `BUYER`: 买家
 */
export enum ProductReturnsFreightBy {
  SELLER = 1,
  BUYER,
}

// -----------------------------------------------
// 商品 - 上架方式
// -----------------------------------------------

/**
 * 商品发布模式
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

// -----------------------------------------------
// 商品 - 购买按钮类型
// -----------------------------------------------

/**
 * 商品购买按钮类型
 *
 * - `DEFAULT`: 默认名称
 * - `CUSTOM`: 自定义名称
 */
export enum ProductBuyBtnType {
  DEFAULT = 1,
  CUSTOM,
}

// --------------------------------
// 商品 - 选项类型
// --------------------------------

/**
 * 商品参数模板选项类型
 *
 * - `TEXT`: 文本
 * - `RADIO`: 单选
 * - `CHECKBOX`: 多选
 */
export enum ProductAttributeOptionType {
  TEXT = 1,
  RADIO,
  CHECKBOX,
}

// --------------------------------
// 商品 - 导出记录 - 导出状态
// --------------------------------

/**
 * 商品导出记录 - 导出状态
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

// --------------------------------
// 商品 - 评价状态
// --------------------------------

/**
 * 商品评价状态
 *
 * - `PENDING`: 待审核
 * - `APPROVED`: 已通过
 * - `REJECTED`: 已拒绝
 */
export enum ProductReviewStatus {
  PENDING,
  REJECTED,
  APPROVED,
}
