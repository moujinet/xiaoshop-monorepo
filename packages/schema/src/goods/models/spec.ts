import type { IEnabled } from '@/common'

/**
 * 商品规格设置
 */
export interface IGoodsSpec {
  /**
   * 商品规格 ID
   */
  id: string
  /**
   * 规格名
   */
  name: string
  /**
   * 规格值
   */
  values: IGoodsSpecValue[]
  /**
   * 启用图片 (N:否 Y:是)
   */
  enableImage: IEnabled
}

/**
 * 商品规格设置值
 */
export interface IGoodsSpecValue {
  /**
   * 规格值
   */
  name: string
  /**
   * 图片
   */
  image: string
}
