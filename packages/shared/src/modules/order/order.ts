import type { IMemberAccountInfo } from '@/member'
import type { YesOrNo } from '~/common'
import type {
  OrderSource,
  OrderStatus,
  OrderType,
} from './constants'

/**
 * 订单信息
 */
export interface IOrder {
  /**
   * 订单 ID
   */
  id: number
  /**
   * 订单类型
   *
   * @see {@link OrderType}
   */
  type: OrderType
  /**
   * 订单来源
   *
   * @see {@link OrderSource}
   */
  source: OrderSource
  /**
   * 订单状态
   *
   * @see {@link OrderStatus}
   */
  status: OrderStatus
  /**
   * 会员 ID
   */
  memberId: IMemberAccountInfo['id']
  /**
   * 会员信息
   *
   * @see {@link IMemberAccountInfo}
   */
  member: IMemberAccountInfo
  /**
   * 商品金额
   */
  productPrice: number
  /**
   * 订单金额
   */
  orderPrice: number
  /**
   * 优惠金额
   */
  discountPrice: number
  /**
   * 积分抵扣金额
   */
  deductPrice: number
  /**
   * 运费金额
   */
  freight: number
  /**
   * 修改金额
   */
  changePrice: number
  /**
   * 改价原因
   */
  changePriceReason: string
  /**
   * 是否已改价
   *
   * @see {@link YesOrNo}
   */
  isChangePrice: YesOrNo
  /**
   * 是否已折扣
   *
   * @see {@link YesOrNo}
   */
  isDiscounted: YesOrNo
  /**
   * 是否已发票
   *
   * @see {@link YesOrNo}
   */
  isInvoiced: YesOrNo
  /**
   * 改价时间
   */
  changePriceTime: string
  /**
   * 创建时间
   */
  createdTime: string
}
