import type { LogisticAddressType } from './constants'
import type {
  ILocationPath,
  YesOrNo,
} from '~/common'

/**
 * 物流地址信息
 */
export interface ILogisticsAddress {
  /**
   * 地址 ID
   */
  id: number
  /**
   * 地址类型
   *
   * @see {@link LogisticAddressType}
   */
  type: LogisticAddressType
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
   *
   * - `NO`: 否
   * - `YES`: 是
   *
   * @see {@link YesOrNo}
   */
  isDefault: YesOrNo
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
}
