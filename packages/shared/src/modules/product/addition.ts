/**
 * 商品附加服务
 */
export interface IProductAddition {
  /**
   * 附加服务 ID
   */
  id: number
  /**
   * 附加服务名称
   */
  name: string
  /**
   * 附加服务图标
   */
  icon: string
  /**
   * 附加服务描述
   */
  desc: string
  /**
   * 附加服务价格
   */
  price: number
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
 * 商品附加服务字典
 *
 * @see {@link IProductAddition}
 */
export type IProductAdditionDict = Pick<
  IProductAddition,
  | 'id'
  | 'name'
  | 'icon'
  | 'price'
>

/**
 * 商品附加服务列表
 *
 * @see {@link IProductAddition}
 */
export type IProductAdditionListItem = Pick<
  IProductAddition,
  | 'id'
  | 'name'
  | 'icon'
  | 'desc'
  | 'price'
  | 'sort'
  | 'updatedTime'
>
