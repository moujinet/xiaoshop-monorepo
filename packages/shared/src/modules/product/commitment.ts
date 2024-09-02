/**
 * 商品服务承诺
 */
export interface IProductCommitment {
  /**
   * 服务承诺 ID
   */
  id: number
  /**
   * 服务承诺名称
   */
  name: string
  /**
   * 服务承诺图标
   */
  icon: string
  /**
   * 服务承诺描述
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
 * 商品服务承诺字典
 *
 * @see {@link IProductCommitment}
 */
export type IProductCommitmentDict = Pick<
  IProductCommitment,
  | 'id'
  | 'name'
  | 'icon'
>

/**
 * 商品服务承诺列表
 *
 * @see {@link IProductCommitment}
 */
export type IProductCommitmentListItem = Pick<
  IProductCommitment,
  | 'id'
  | 'name'
  | 'icon'
  | 'desc'
  | 'sort'
  | 'updatedTime'
>
