import type { IMemberAccountInfo } from './account'
import type {
  ILocationPath,
  IYesOrNo,
} from '~/common'

/**
 * 会员地址
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
  contractName: string
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
   * 是否默认 (N:否 Y:是)
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
 * 会员地址信息
 *
 * @see {@link IMemberAddress}
 */
export type IMemberAddressInfo = Pick<
  IMemberAddress,
  | 'id'
  | 'contractName'
  | 'mobile'
  | 'location'
  | 'address'
>

/**
 * 会员地址列表
 *
 * @see {@link IMemberAddressInfo}
 */
export type IMemberAddressListItem = IMemberAddressInfo & Pick<
  IMemberAddress,
  | 'isDefault'
  | 'updatedTime'
>
