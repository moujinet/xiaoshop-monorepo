/**
 * 商品服务保障
 */
export interface IGoodsProtection {
  /**
   * 服务保障编号
   */
  id: number
  /**
   * 服务保障名称
   */
  name: string
  /**
   * 服务保障图标
   */
  icon: string
  /**
   * 服务保障描述
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
 * 商品服务保障字典信息
 */
export type IGoodsProtectionDict = Pick<IGoodsProtection, 'id' | 'name'>

/**
 * 商品服务保障信息
 */
export type IGoodsProtectionInfo = Pick<IGoodsProtection, 'id' | 'name' | 'icon'>

/**
 * 商品服务保障列表
 */
export type IGoodsProtectionListItem = Omit<IGoodsProtection, 'sort' | 'createdTime'>
