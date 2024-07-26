/**
 * 物流公司
 */
export interface ILogisticsCompany {
  /**
   * 物流公司编号
   */
  id: number
  /**
   * 公司名称
   */
  name: string
  /**
   * 公司介绍
   */
  desc: string
  /**
   * 公司官网
   */
  url: string
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
 * 字典: 物流公司
 */
export type ILogisticsCompanyDict = Pick<ILogisticsCompany, 'id' | 'name'>

/**
 * 物流公司列表
 */
export type ILogisticsCompanyListItem = Omit<ILogisticsCompany, 'desc' | 'createdTime'>
