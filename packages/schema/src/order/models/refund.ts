import type { IOrderRefundMode, IOrderRefundStage, IOrderRefundStatus, IOrderRefundType } from '@/order/types'
import type { IOrderGoods } from '@/order/models'
import type { IMemberInfo } from '@/member/models'

/**
 * 订单退款信息
 */
export interface IOrderRefund {
  /**
   * 退款编号
   */
  id: number
  /**
   * 退款类型
   *
   * @see {@link IOrderRefundType}
   */
  type: IOrderRefundType
  /**
   * 退款状态
   *
   * @see {@link IOrderRefundStatus}
   */
  status: IOrderRefundStatus
  /**
   * 退款方式
   *
   * @see {@link IOrderRefundMode}
   */
  mode: IOrderRefundMode
  /**
   * 退款阶段
   *
   * @see {@link IOrderRefundStage}
   */
  stage: IOrderRefundStage
  /**
   * 退款人
   *
   * @see {@link IMemberInfo}
   */
  member: IMemberInfo
  /**
   * 订单商品信息
   *
   * @see {@link IOrderGoods}
   */
  goods: IOrderGoods[]
  /**
   * 退款商品数量
   */
  qty: number
  /**
   * 退款金额
   */
  amount: number
  /**
   * 退款原因
   */
  reason: string
  /**
   * 退款说明
   */
  message: string
  /**
   * 退款凭证附件
   */
  attachments: IOrderRefundAttachment[]
  /**
   * 拒绝原因
   */
  rejectReason: string
  /**
   * 拒绝说明
   */
  rejectMessage: string
  /**
   * 受理时间
   */
  approvedTime: number
  /**
   * 拒绝时间
   */
  rejectedTime: number
  /**
   * 退款时间
   */
  refundedTime: number
}

/**
 * 退款申请附件凭证
 */
export interface IOrderRefundAttachment {
  /**
   * 退款附件编号
   */
  id: number
  /**
   * 附件名称
   */
  name: string
  /**
   * 附件路径
   */
  path: string
}
