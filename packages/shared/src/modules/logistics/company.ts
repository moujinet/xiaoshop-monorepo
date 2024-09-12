/**
 * 物流公司信息
 */
export interface ILogisticsCompanyList {
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
   * 更新时间
   */
  updatedTime: string
}

/**
 * 物流公司列表
 *
 * @see {@link ILogisticsCompanyList}
 */
export type ILogisticsCompanyInfo = Pick<
  ILogisticsCompanyList,
  | 'id'
  | 'name'
  | 'desc'
  | 'url'
  | 'sort'
>

/**
 * 物流公司字典
 *
 * @see {@link ILogisticsCompanyInfo}
 */
export type ILogisticsCompanyDict = Pick<
  ILogisticsCompanyInfo,
  | 'id'
  | 'name'
>
