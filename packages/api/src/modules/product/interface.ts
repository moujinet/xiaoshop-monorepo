import { IProductExportConditions } from '@xiaoshop/shared'

/**
 * 商品导出上下文
 */
export interface IProductExportProcessContext {
  /**
   * 商品导出记录 ID
   */
  id: number
  /**
   * 商品导出条件
   *
   * @type {IProductExportConditions}
   */
  conditions: IProductExportConditions
}
