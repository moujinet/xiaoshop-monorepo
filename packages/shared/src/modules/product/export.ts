import type { IDict } from '~/common'
import type { IProductTagDict } from './tag'
import type { IProductGroupDict } from './group'
import type { IProductBrandDict } from './brand'
import type { IProductCategoryDict } from './category'

/**
 * 商品导出信息
 */
export interface IProductExportInfo {
  /**
   * 导出记录 ID
   */
  id: number
  /**
   * 导出状态
   *
   * @see {@link ProductExportStatus}
   */
  status: IDict
  /**
   * 导出条件
   */
  conditions: IProductExportConditions
  /**
   * 导出数量
   */
  count: number
  /**
   * 导出文件路径
   */
  filePath: string
}

/**
 * 商品导出条件
 */
export interface IProductExportConditions {
  /**
   * 商品类型
   *
   * @see {@link ProductType}
   */
  type: IDict
  /**
   * 商品状态
   *
   * @see {@link ProductStatus}
   */
  status: IDict
  /**
   * 商品来源
   *
   * @see {@link ProductSource}
   */
  source: IDict
  /**
   * 商品分类
   */
  categoryIds: IProductCategoryDict[]
  /**
   * 商品分组
   */
  groupIds: IProductGroupDict[]
  /**
   * 商品品牌
   */
  brandIds: IProductBrandDict[]
  /**
   * 商品标签
   */
  tagIds: IProductTagDict[]
}

/**
 * 商品导出列表
 */
export type IProductExportList = Pick<
  IProductExportInfo,
  | 'id'
  | 'status'
  | 'conditions'
  | 'count'
  | 'filePath'
> & {
  /**
   * 导出时间
   */
  createdTime: string
}
