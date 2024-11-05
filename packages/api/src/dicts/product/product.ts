import {
  ColorName,
  type IDict,
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductInventoryDeductMode,
  ProductPublishMode,
  ProductReturnsFreightBy,
  ProductSource,
  ProductStatus,
  ProductType,
} from '@xiaoshop/shared'

/**
 * 商品状态 - 字典
 *
 * @see {@link ProductStatus}
 */
export const PRODUCT_STATUSES: IDict[] = [
  { value: '在售', key: ProductStatus.ON_SALE, color: ColorName.ARCOBLUE },
  { value: '仓库', key: ProductStatus.STOCKED, color: ColorName.CYAN },
  { value: '售罄', key: ProductStatus.SOLD_OUT, color: ColorName.RED },
  { value: '草稿', key: ProductStatus.DRAFT, color: ColorName.GRAY },
]

/**
 * 商品类型 - 字典
 *
 * @see {@link ProductType}
 */
export const PRODUCT_TYPES: IDict[] = [
  { value: '实物商品', desc: '需要物流', key: ProductType.ENTITY, color: ColorName.ARCOBLUE },
  { value: '虚拟商品', desc: '无需物流', key: ProductType.VIRTUAL, color: ColorName.PURPLE },
  { value: '电子卡密', desc: '无需物流', key: ProductType.CARD, color: ColorName.CYAN },
]

/**
 * 商品来源 - 字典
 *
 * @see {@link ProductSource}
 */
export const PRODUCT_SOURCES: IDict[] = [
  { value: '手动创建', key: ProductSource.MANUAL, color: ColorName.ARCOBLUE, icon: 'mingcute:file-check' },
  { value: '后台导入', key: ProductSource.IMPORT, color: ColorName.CYAN, icon: 'mingcute:upload-3' },
  { value: '商品采集', key: ProductSource.CLAWER, color: ColorName.GREEN, icon: 'mingcute:download-3' },
  { value: '云链同步', key: ProductSource.CONNECT, color: ColorName.ORANGERED, icon: 'mingcute:refresh-2' },
]

/**
 * 商品库存扣减方式 - 字典
 *
 * @see {@link ProductInventoryDeductMode}
 */
export const PRODUCT_INVENTORY_DEDUCT_MODES: IDict[] = [
  { key: ProductInventoryDeductMode.ORDER, value: '拍下减库存' },
  { key: ProductInventoryDeductMode.PAID, value: '付款减库存' },
]

/**
 * 商品运费支付方式 - 字典
 *
 * @see {@link ProductFreightChargeMode}
 */
export const PRODUCT_FREIGHT_CHARGE_MODES: IDict[] = [
  { key: ProductFreightChargeMode.STD, value: '统一运费' },
  { key: ProductFreightChargeMode.TEMPLATE, value: '运费模板' },
  { key: ProductFreightChargeMode.COD, value: '运费到付' },
]

/**
 * 商品退货运费承担方 - 字典
 *
 * @see {@link ProductReturnsFreightBy}
 */
export const PRODUCT_RETURNS_FREIGHT_BYS: IDict[] = [
  { key: ProductReturnsFreightBy.SELLER, value: '商家承担退费运费' },
  { key: ProductReturnsFreightBy.BUYER, value: '买家承担退货运费' },
]

/**
 * 商品上架方式 - 字典
 *
 * @see {@link ProductPublishMode}
 */
export const PRODUCT_PUBLISH_MODES: IDict[] = [
  { key: ProductPublishMode.DIRECT, value: '立即上架' },
  { key: ProductPublishMode.AUTO, value: '自定义上架' },
  { key: ProductPublishMode.STOCKED, value: '暂不售卖, 放入仓库' },
]

/**
 * 商品购买按钮类型 - 字典
 *
 * @see {@link ProductBuyBtnType}
 */
export const PRODUCT_BUY_BTN_TYPES: IDict[] = [
  { key: ProductBuyBtnType.DEFAULT, value: '默认名称' },
  { key: ProductBuyBtnType.CUSTOM, value: '自定义名称' },
]
