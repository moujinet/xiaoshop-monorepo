/**
 * 商品分组信息
 */
export interface IProductGroup {
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
 * 商品分组字典
 *
 * @see {@link IProductGroup}
 */
export type IProductGroupDict = Pick<
  IProductGroup,
  | 'id'
  | 'name'
>

/**
 * 商品分组列表
 *
 * @see {@link IProductGroup}
 */
export type IProductGroupListItem = Pick<
  IProductGroup,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
  | 'updatedTime'
>
