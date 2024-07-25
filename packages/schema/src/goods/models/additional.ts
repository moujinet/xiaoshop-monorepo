/**
 * 商品附加服务
 */
export interface IGoodsAdditional {
  /**
   * 附加服务编号
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
   * 附加服务价格
   */
  price: number
  /**
   * 附加服务描述
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
 * 商品附加服务字典
 */
export type IGoodsAdditionalDict = Pick<IGoodsAdditional, 'id' | 'name' | 'price'>

/**
 * 商品附加服务信息
 */
export type IGoodsAdditionalInfo = Pick<IGoodsAdditional, 'id' | 'name' | 'price' | 'icon'>

/**
 * 商品附加服务列表
 */
export type IGoodsAdditionalListItem = Omit<IGoodsAdditional, 'sort' | 'createdTime'>
