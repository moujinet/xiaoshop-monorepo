/**
 * 商品保障服务信息
 */
export interface IProductServiceExtraInfo {
  /**
   * 服务 ID
   */
  id: number
  /**
   * 服务名称
   */
  name: string
  /**
   * 服务图标
   */
  icon: string
  /**
   * 服务描述
   */
  desc: string
  /**
   * 排序
   */
  sort: number
}

/**
 * 商品保障服务字典
 */
export type IProductServiceExtraDict = Pick<
  IProductServiceExtraInfo,
  | 'id'
  | 'name'
  | 'icon'
>

/**
 * 商品保障服务列表
 */
export type IProductServiceExtraList = IProductServiceExtraInfo & {
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 商品附加服务信息
 */
export interface IProductServiceAdditionInfo extends IProductServiceExtraInfo {
  /**
   * 服务价格
   */
  price: number
}

/**
 * 商品附加服务字典
 */
export type IProductServiceAdditionDict = Pick<
  IProductServiceAdditionInfo,
  | 'id'
  | 'name'
  | 'icon'
  | 'price'
>

/**
 * 商品附加服务列表
 */
export interface IProductServiceAdditionList extends IProductServiceAdditionInfo {
  /**
   * 更新时间
   */
  updatedTime: string
}
