import type {
  GoodsAttributeOptionType,
  GoodsBuyBtnType,
  GoodsExportRecordStatus,
  GoodsFreightChargeMode,
  GoodsInventoryDeductMode,
  GoodsPublishMode,
  GoodsRatingGrade,
  GoodsReturnsFreightBy,
  GoodsSource,
  GoodsStatus,
  GoodsType,
} from '@/goods/constants'

/**
 * 商品 - 商品状态
 *
 * - `IN_STOCK`: 在售
 * - `STOCKED`: 仓库
 * - `SOLD_OUT`: 售韾
 * - `DRAFT`: 草稿
 *
 * @see {@link GoodsStatus}
 */
export type IGoodsStatus = `${GoodsStatus}` | GoodsStatus

/**
 * 商品 - 商品类型
 *
 * - `ENTITY`: 实物商品
 * - `VIRTUAL`: 虚拟商品
 * - `CARD`: 电子卡密
 *
 * @see {@link GoodsType}
 */
export type IGoodsType = `${GoodsType}` | GoodsType

/**
 * 商品 - 商品来源
 *
 * - `CLAWER`: 商品采集
 * - `CONNECT`: 云链同步
 * - `IMPORT`: 后台导入
 * - `MANUAL`: 手动创建
 *
 * @see {@link GoodsSource}
 */
export type IGoodsSource = `${GoodsSource}` | GoodsSource

/**
 * 商品 - 库存扣减方式
 *
 * - `ORDER`: 拍下减库存
 * - `PAID`: 付款减库存
 *
 * @see {@link GoodsInventoryDeductMode}
 */
export type IGoodsInventoryDeductMode = `${GoodsInventoryDeductMode}` | GoodsInventoryDeductMode

/**
 * 商品 - 运费支付方式
 *
 * - `STD`: 统一运费
 * - `TEMPLATE`: 运费模板
 * - `COD`: 运费到付
 *
 * @see {@link GoodsFreightChargeMode}
 */
export type IGoodsFreightChargeMode = `${GoodsFreightChargeMode}` | GoodsFreightChargeMode

/**
 * 商品 - 退货运费承担方
 *
 * - `SELLER`: `商家承担退费运费`
 * - `BUYER`: `买家承担退货运费`
 *
 * @see {@link GoodsReturnsFreightBy}
 */
export type IGoodsReturnsFreightBy = `${GoodsReturnsFreightBy}` | GoodsReturnsFreightBy

/**
 * 商品 - 上架模式
 *
 * - `DIRECT`: 立即上架
 * - `AUTO`: 自定义上架
 * - `STOCK`: 暂不售卖, 放入仓库
 *
 * @see {@link GoodsPublishMode}
 */
export type IGoodsPublishMode = `${GoodsPublishMode}` | GoodsPublishMode

/**
 * 商品 - 购买按钮类型
 *
 * - `DEFAULT`: 默认名称
 * - `CUSTOM`: 自定义名称
 *
 * @see {@link GoodsBuyBtnType}
 */
export type IGoodsBuyBtnType = `${GoodsBuyBtnType}` | GoodsBuyBtnType

/**
 * 商品 - 参数模板参数类型
 *
 * - `INPUT`: 文本
 * - `RADIO`: 单选
 * - `CHECKBOX`: 多选
 *
 * @see {@link GOODS_ATTRIBUTE_OPTION_TYPES}
 */
export type IGoodsAttributeOptionType = `${GoodsAttributeOptionType}` | GoodsAttributeOptionType

/**
 * 商品评价综合评级
 *
 * - `GOODS_RATING_GRADE_HIGH`: 好评
 * - `GOODS_RATING_GRADE_NORMAL`: 中评
 * - `GOODS_RATING_GRADE_LOW`: 差评
 *
 * @see {@link GoodsRatingGrade}
 */
export type IGoodsRatingGrade = `${GoodsRatingGrade}` | GoodsRatingGrade

/**
 * 商品导出记录状态
 *
 * - `PENDING`: 等待导出
 * - `PROCESSING`: 导出中
 * - `SUCCESS`: 导出成功
 * - `FAILED`: 导出失败
 *
 * @see {@link GoodsExportRecordStatus}
 */
export type IGoodsExportRecordStatus = `${GoodsExportRecordStatus}` | GoodsExportRecordStatus
