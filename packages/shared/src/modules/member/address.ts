import type { IMemberAccountInfo } from './account'
import type {
  ILocationPath,
  IYesOrNo,
} from '~/common'

/**
 * 会员收货地址信息
 */
export interface IMemberAddress {
  /**
   * 地址 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 会员信息
   *
   * @see {@link IMemberAccountInfo}
   */
  member: IMemberAccountInfo
  /**
   * 联系人
   */
  name: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 城市
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
  /**
   * 是否默认 (N:否 Y:是)
   *
   * @see {@link IYesOrNo}
   */
  isDefault: IYesOrNo
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
 * 会员收货地址列表
 */
export type IMemberAddressListItem = Pick<
  IMemberAddress,
  | 'id'
  | 'member'
  | 'name'
  | 'mobile'
  | 'location'
  | 'address'
  | 'postalCode'
  | 'isDefault'
  | 'updatedTime'
>

/**
 * 会员收货地址列表 - 会员
 */
export type IMemberAddressMemberListItem = Pick<
  IMemberAddress,
  | 'id'
  | 'name'
  | 'mobile'
  | 'location'
  | 'address'
  | 'postalCode'
  | 'isDefault'
  | 'updatedTime'
>
