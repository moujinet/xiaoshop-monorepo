/**
 * 商品分组信息
 */
export interface IGoodsGroup {
  /**
   * 商品分组编号
   */
  id: number
  /**
   * 商品分组名称
   */
  name: string
  /**
   * 商品分组排序
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
 */
export type IGoodsGroupDict = Pick<IGoodsGroup, 'id' | 'name'>

/**
 * 商品分组列表
 */
export type IGoodsGroupListItem = Omit<IGoodsGroup, 'sort' | 'createdTime'>
