import type { IAreaInfo, ILogisticsCompanyDict } from '@/settings/models'
import type { ILogisticsDeliveryMode, ILogisticsDeliveryStatus, ILogisticsDeliveryType } from '@/settings/types'

/**
 * 订单发货信息
 */
export interface IOrderDelivery {
  /**
   * 订单发货编号
   */
  id: number
  /**
   * 物流状态
   *
   * @see {@link ILogisticsDeliveryStatus}
   */
  status: ILogisticsDeliveryStatus
  /**
   * 物流类型
   *
   * @see {@link ILogisticsDeliveryType}
   */
  type: ILogisticsDeliveryType
  /**
   * 物流方式
   *
   * @see {@link ILogisticsDeliveryMode}
   */
  mode: ILogisticsDeliveryMode
  /**
   * 物流公司
   *
   * @see {@link ILogisticsCompanyDict}
   */
  logisticsCompany: ILogisticsCompanyDict
  /**
   * 物流单号
   */
  logisticsNo: string
  /**
   * 发货人
   */
  sender: string
  /**
   * 发货人手机号
   */
  senderMobile: string
  /**
   * 发货地区
   *
   * @see {@link IAreaInfo}
   */
  senderLocation: IAreaInfo[]
  /**
   * 发货地址
   */
  senderAddress: string
  /**
   * 收货人
   */
  receiver: string
  /**
   * 收货人手机号
   */
  receiverMobile: string
  /**
   * 收货地区
   *
   * @see {@link IAreaInfo}
   */
  receiverLocation: IAreaInfo[]
  /**
   * 收货地址
   */
  receiverAddress: string
}

/**
 * 订单发货信息
 */
export type IOrderDeliveryInfo = Pick<
  IOrderDelivery,
  'id' | 'logisticsCompany' | 'logisticsNo' | 'mode' | 'status'
>
