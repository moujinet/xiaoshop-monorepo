import { IGoodsExportConditions } from '@xiaoshop/schema'

/**
 * 商品导出任务
 */
export interface IGoodsExportJob {
  /**
   * 导出记录 ID
   */
  id: number
  /**
   * 导出条件
   *
   * @see {@link IGoodsExportConditions}
   */
  conditions: IGoodsExportConditions
}
