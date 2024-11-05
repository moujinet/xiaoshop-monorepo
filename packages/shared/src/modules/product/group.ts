/**
 * 商品分组信息
 */
export interface IProductGroupInfo {
  /**
   * 分组 ID
   */
  id: number
  /**
   * 分组名称
   */
  name: string
  /**
   * 分组介绍
   */
  desc: string
  /**
   * 排序
   */
  sort: number
}

/**
 * 商品分组字典
 */
export type IProductGroupDict = Pick<
  IProductGroupInfo,
  | 'id'
  | 'name'
>

/**
 * 商品分组列表
 */
export type IProductGroupList = Pick<
  IProductGroupInfo,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
