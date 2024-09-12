import type { IMemberAccountInfo } from '@/member'
import type { ILocationPath, YesOrNo } from '~/common'
import type { LogisticAddressOwner, LogisticAddressType } from './constants'

/**
 * 物流地址信息
 */
export interface ILogisticsAddressInfo {
  /**
   * 地址 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: IMemberAccountInfo['id']
  /**
   * 地址归属
   *
   * @see {@link LogisticAddressOwner}
   */
  owner: LogisticAddressOwner
  /**
   * 地址类型
   *
   * @see {@link LogisticAddressType}
   */
  type: LogisticAddressType
  /**
   * 是否默认 (N:否 Y:是)
   *
   * - `NO`: 否
   * - `YES`: 是
   *
   * @see {@link YesOrNo}
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
  detail: string
  /**
   * 邮政编码
   */
  postalCode: string
}

/**
 * 收货地址列表
 *
 * @see {@link ILogisticsAddressInfo}
 */
export type ILogisticsAddressList = Pick<
  ILogisticsAddressInfo,
  | 'id'
  | 'type'
  | 'isDefault'
  | 'name'
  | 'mobile'
  | 'location'
  | 'detail'
  | 'postalCode'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
