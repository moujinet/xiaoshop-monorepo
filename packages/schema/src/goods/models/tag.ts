/**
 * 商品标签信息
 */
export interface IGoodsTag {
  /**
   * 商品标签编号
   */
  id: number
  /**
   * 商品标签名称
   */
  name: string
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
 * 商品标签字典
 */
export type IGoodsTagDict = Pick<IGoodsTag, 'id' | 'name'>

/**
 * 商品标签列表
 */
export type IGoodsTagListItem = Omit<IGoodsTag, 'createdTime'>
