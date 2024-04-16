import type { IAssetSnapshot } from '@/assets/types'

export interface IGoodsSkuSpecKey {
  id?: number
  name: string
  enableImage: boolean
}

export interface IGoodsSkuSpecValue {
  id?: number
  name: string
  image?: IAssetSnapshot
}

export interface IGoodsSkuSpecs extends IGoodsSkuSpecKey {
  values: IGoodsSkuSpecValue[]
}

export interface IGoodsSku {
  id?: number
  /**
   * 规格值
   */
  specs: IGoodsSkuSpecValue[]
  /**
   * SKU 名称
   */
  name: string
  /**
   * 商品编码
   */
  skuId: string
  /**
   * 商品价格
   */
  price: number
  /**
   * 商品原价（划线价）
   */
  originalPrice: number
  /**
   * 商品成本价
   */
  costPrice: number
  /**
   * 商品库存
   */
  stock: number
  /**
   * 商品预警库存
   */
  alarmStock: number
  /**
   * 商品重量 kg
   */
  weight: number
  /**
   * 商品体积 m3
   */
  volume: number
}
