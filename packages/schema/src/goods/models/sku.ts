import type { IGoodsSpec } from './spec'

/**
 * 商品 SKU
 */
export interface IGoodsSku {
  /**
   * 商品 SKU 编号
   */
  id: string
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
   * SKU 规格
   *
   * @see {@link IGoodsSkuSpec}
   */
  specs: IGoodsSkuSpec[]
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
   * 销量
   */
  sales: number
}

/**
 * 商品 SKU 规格
 */
export interface IGoodsSkuSpec {
  /**
   * 规格 ID
   */
  specId: IGoodsSpec['id']
  /**
   * 规格名
   */
  name: string
  /**
   * 规格值
   */
  value: string
}

/**
 * 字典商品 SKU 信息
 */
export type IGoodsSkuInfo = Pick<IGoodsSku, 'id' | 'skuCode' | 'name' | 'image' | 'specs' | 'price' | 'inventory'>

/**
 * 商品 SKU 表单
 */
export type IGoodsSkuFormData = Partial<IGoodsSku>
