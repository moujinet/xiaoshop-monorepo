/**
 * 商品品牌信息
 */
export interface IGoodsBrand {
  /**
   * 品牌编号
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
 */
export type IGoodsBrandDict = Pick<IGoodsBrand, 'id' | 'name'>

/**
 * 商品品牌列表
 */
export type IGoodsBrandListItem = Omit<IGoodsBrand, 'sort' | 'createdTime'>
