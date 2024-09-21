/**
 * 物流公司信息
 */
export interface ILogisticExpressInfo {
  /**
   * 物流公司 ID
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
   * 公司 LOGO
   */
  logo: string
  /**
   * 公司官网
   */
  url: string
  /**
   * 排序
   */
  sort: number
}

/**
 * 物流公司列表
 */
export type ILogisticExpressList = Pick<
  ILogisticExpressInfo,
  | 'id'
  | 'name'
  | 'desc'
  | 'logo'
  | 'url'
  | 'sort'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 物流公司字典
 */
export type ILogisticExpressDict = Pick<
  ILogisticExpressInfo,
  | 'id'
  | 'name'
>
