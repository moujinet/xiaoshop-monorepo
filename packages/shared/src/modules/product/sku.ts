import type { YesOrNo } from '~/common'

/**
 * 商品 SKU 信息
 */
export interface IProductSkuInfo {
  /**
   * SKU ID
   */
  id: number
  /**
   * SKU 云链 ID
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
   * SKU 编码
   */
  skuCode: string
  /**
   * SKU 名称
   */
  name: string
  /**
   * SKU 图片
   */
  image: string
  /**
   * SKU 属性
   */
  attributes: IProductSkuAttribute[]
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
  quantity: number
  /**
   * 库存预警值
   */
  threshold: number
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
   */
  values: IProductSkuAttributeSchemaValue[]
  /**
   * 是否启用图片
   */
  isEnableImage: YesOrNo
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
