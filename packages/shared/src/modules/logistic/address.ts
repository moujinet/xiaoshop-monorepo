import type { ILocationPath, YesOrNo } from '~/common'

/**
 * 地址信息
 */
export interface ILogisticAddressInfo {
  /**
   * 地址 ID
   */
  id: number
  /**
   * 是否默认地址
   */
  isDefault: YesOrNo
  /**
   * 联系人
   */
  name: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 座机号码
   */
  landline: string
  /**
   * 所在城市
   *
   * @see {@link ILocationPath}
   */
  location: ILocationPath
  /**
   * 详细地址
   */
  address: string
  /**
   * 邮政编码
   */
  postalCode: string
}

/**
 * 地址信息列表
 */
export type ILogisticAddressList = Pick<
  ILogisticAddressInfo,
  | 'id'
  | 'isDefault'
  | 'name'
  | 'mobile'
  | 'location'
  | 'address'
  | 'postalCode'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
