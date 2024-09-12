import type { YesOrNo } from '~/common'
import type { IProductInfo } from './product'

/**
 * 商品 SKU 信息
 */
export interface IProductSku {
  /**
   * 商品 SKU ID
   */
  id: number
  /**
   * 云链 ID
   */
  connectId: string
  /**
   * 商品 ID
   */
  productId: number
  /**
   * 商品云链 ID
   */
  productConnectId: string
  /**
   * 商品信息
   *
   * @see {@link IProductInfo}
   */
  product: IProductInfo
  /**
   * SKU 编码
   */
  skuCode: string
  /**
   * SKU 名称
   */
  name: string
  /**
   * SKU 属性
   *
   * @see {@link IProductSkuAttribute}
   */
  attributes: IProductSkuAttribute[]
  /**
   * SKU 图片
   */
  image: string
  /**
   * 单价
   */
  price: number
  /**
   * 原价
   */
  originalPrice: number
  /**
   * 成本
   */
  costPrice: number
  /**
   * 库存
   */
  inventory: number
  /**
   * 预警库存
   */
  inventoryEarlyWarning: number
  /**
   * 重量
   */
  weight: number
  /**
   * 体积
   */
  volume: number
  /**
   * 商品单位
   */
  unit: string
  /**
   * 销量
   */
  sales: number
}

/**
 * 商品 SKU 属性
 */
export interface IProductSkuAttribute {
  /**
   * SKU 属性名
   */
  name: string
  /**
   * SKU 属性值
   */
  value: string
}

/**
 * 商品 SKU 规格项
 */
export interface IProductSkuAttributeSchema {
  /**
   * SKU 规格项名
   */
  name: string
  /**
   * SKU 规格值
   *
   * @see {@link IProductSkuAttributeSchemaValue}
   */
  values: IProductSkuAttributeSchemaValue[]
  /**
   * 是否启用图片 (N: 否 Y: 是)
   *
   * @see {@link YesOrNo}
   */
  enableImage: YesOrNo
}

/**
 * 商品 SKU 规格值
 */
export interface IProductSkuAttributeSchemaValue {
  /**
   * SKU 规格名
   */
  name: string
  /**
   * SKU 规格图片
   */
  image: string
}

/**
 * 商品 SKU 信息
 *
 * @see {@link IProductSku}
 */
export type IProductSkuInfo = Pick<
  IProductSku,
  | 'id'
  | 'connectId'
  | 'productId'
  | 'productConnectId'
  | 'skuCode'
  | 'name'
  | 'attributes'
  | 'image'
  | 'price'
  | 'originalPrice'
  | 'costPrice'
  | 'inventory'
  | 'inventoryEarlyWarning'
  | 'weight'
  | 'volume'
  | 'sales'
  | 'unit'
>
