/**
 * 商品品牌信息
 */
export interface IProductBrandInfo {
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
}

/**
 * 商品品牌字典
 */
export type IProductBrandDict = Pick<
  IProductBrandInfo,
  | 'id'
  | 'name'
>

/**
 * 商品品牌列表
 */
export type IProductBrandList = Pick<
  IProductBrandInfo,
  | 'id'
  | 'name'
  | 'logo'
  | 'desc'
  | 'sort'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
