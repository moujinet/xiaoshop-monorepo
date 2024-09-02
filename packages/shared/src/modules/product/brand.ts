/**
 * 商品品牌信息
 */
export interface IProductBrand {
  /**
   * 品牌 ID
   */
  id: number
  /**
   * 品牌名称
   */
  name: string
  /**
   * 品牌 LOGO
   */
  logo: string
  /**
   * 品牌介绍
   */
  desc: string
  /**
   * 排序
   */
  sort: number
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 商品品牌字典
 *
 * @see {@link IProductBrand}
 */
export type IProductBrandDict = Pick<
  IProductBrand,
  | 'id'
  | 'name'
>

/**
 * 商品品牌列表
 *
 * @see {@link IProductBrand}
 */
export type IProductBrandListItem = Pick<
  IProductBrand,
  | 'id'
  | 'name'
  | 'logo'
  | 'desc'
  | 'sort'
  | 'updatedTime'
>
