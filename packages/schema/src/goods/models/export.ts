import type {
  IGoodsExportRecordStatus,
  IGoodsSource,
  IGoodsStatus,
} from '@/goods/types'

/**
 * 商品导出记录
 */
export interface IGoodsExportRecord {
  /**
   * 导出记录 ID
   */
  id: number
  /**
   * 导出状态
   *
   * @see {@link IGoodsExportRecordStatus}
   */
  status: IGoodsExportRecordStatus
  /**
   * 导出条件
   *
   * @see {@link IGoodsExportConditions}
   */
  conditions: IGoodsExportConditions
  /**
   * 导出数量
   */
  count: number
  /**
   * 导出结果
   */
  result: string
  /**
   * 导出时间
   */
  createdTime: string
}

/**
 * 商品导出条件
 */
export interface IGoodsExportConditions {
  /**
   * 商品状态
   *
   * @see {@link IGoodsStatus}
   */
  status: IGoodsStatus
  /**
   * 商品来源
   *
   * @see {@link IGoodsSource}
   */
  source: IGoodsSource
  /**
   * 商品分类
   */
  categoryIds: number[]
  /**
   * 商品分组
   */
  groupId: number
  /**
   * 商品品牌
   */
  brandId: number
  /**
   * 商品标签
   */
  tagId: number
}

/**
 * 商品导出记录列表
 */
export type IGoodsExportRecordListItem = IGoodsExportRecord
