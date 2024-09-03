import type {
  ProductExportStatus,
  ProductSource,
  ProductStatus,
  ProductType,
} from './constants'

/**
 * 商品导出记录
 */
export interface IProductExport {
  /**
   * 导出记录 ID
   */
  id: number
  /**
   * 导出状态
   *
   * @see {@link ProductExportStatus}
   */
  status: ProductExportStatus
  /**
   * 导出条件
   *
   * @see {@link IProductExportConditions}
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
  /**
   * 导出时间
   */
  createdTime: string
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
  type: ProductType
  /**
   * 商品状态
   *
   * @see {@link ProductStatus}
   */
  status: ProductStatus
  /**
   * 商品来源
   *
    @see {@link ProductSource}
   */
  source: ProductSource
  /**
   * 商品分类
   */
  categoryIds: number[]
  /**
   * 商品分组
   */
  groupIds: number[]
  /**
   * 商品品牌
   */
  brandIds: number[]
  /**
   * 商品标签
   */
  tagIds: number[]
}
