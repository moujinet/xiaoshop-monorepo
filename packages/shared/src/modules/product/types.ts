import type {
  ProductAttributeTemplateOptionType,
  ProductBuyBtnType,
  ProductExportStatus,
  ProductFreightChargeMode,
  ProductInventoryDeductMode,
  ProductPublishMode,
  ProductRatingGrade,
  ProductReturnsFreightBy,
  ProductSource,
  ProductStatus,
  ProductType,
} from './constants'

/**
 * 商品类型
 *
 * - `entity`: 实物商品
 * - `virtual`: 虚拟商品
 * - `card`: 电子卡密
 *
 * @see {@link ProductType}
 */
export type IProductType = `${ProductType}`

/**
 * 商品状态
 *
 * - `on_sale`: 在售
 * - `stocked`: 仓库
 * - `sold_out`: 售罄
 * - `draft`: 草稿
 *
 * @see {@link ProductStatus}
 */
export type IProductStatus = `${ProductStatus}`

/**
 * 商品来源
 *
 * - `manual`: 手动添加
 * - `import`: 导入商品
 * - `clawer`: 采集商品
 * - `connect`: 云链商品
 *
 * @see {@link ProductSource}
 */
export type IProductSource = `${ProductSource}`

/**
 * 商品库存扣减模式
 *
 * - `order`: 拍下减库存
 * - `paid`: 付款减库存
 *
 * @see {@link ProductInventoryDeductMode}
 */
export type IProductInventoryDeductMode = `${ProductInventoryDeductMode}`

/**
 * 商品运费支付方式
 *
 * - `std`: 统一运费
 * - `template`: 模板
 * - `cod`: 货到付款
 *
 * @see {@link ProductFreightChargeMode}
 */
export type IProductFreightChargeMode = `${ProductFreightChargeMode}`

/**
 * 商品退货运费计算方式
 *
 * - `seller`: 卖家
 * - `buyer`: 买家
 *
 * @see {@link ProductReturnsFreightBy}
 */
export type IProductReturnsFreightBy = `${ProductReturnsFreightBy}`

/**
 * 商品发布模式
 *
 * - `direct`: 立即上架
 * - `auto`: 自定义上架
 * - `stocked`: 暂不售卖, 放入仓库
 *
 * @see {@link ProductPublishMode}
 */
export type IProductPublishMode = `${ProductPublishMode}`

/**
 * 商品购买按钮类型
 *
 * - `default`: 默认名称
 * - `custom`: 自定义名称
 *
 * @see {@link ProductBuyBtnType}
 */
export type IProductBuyBtnType = `${ProductBuyBtnType}`

/**
 * 商品评价综合评级
 *
 * - `high`: 好评
 * - `normal`: 中评
 * - `low`: 差评
 *
 * @see {@link ProductRatingGrade}
 */
export type IProductRatingGrade = `${ProductRatingGrade}`

/**
 * 商品参数模板选项类型
 *
 * - `text`: 文本
 * - `radio`: 单选
 * - `checkbox`: 多选
 *
 * @see {@link ProductAttributeTemplateOptionType}
 */
export type IProductAttributeTemplateOptionType = `${ProductAttributeTemplateOptionType}`

/**
 * 商品导出记录导出状态
 *
 * - `pending`: 待导出
 * - `completed`: 导出完成
 * - `failed`: 导出失败
 *
 * @see {@link ProductExportStatus}
 */
export type IProductExportStatus = `${ProductExportStatus}`
