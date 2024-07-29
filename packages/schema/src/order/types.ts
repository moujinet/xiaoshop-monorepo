import type {
  OrderCommentAuditStatus,
  OrderGoodsStatus,
  OrderLogType,
  OrderPaymentDiscountType,
  OrderPaymentStatus,
  OrderPaymentType,
  OrderRefundMode,
  OrderRefundStage,
  OrderRefundStatus,
  OrderRefundType,
  OrderSource,
  OrderStatus,
  OrderType,
} from '@/order/constants'

/**
 * 订单类型
 *
 * - `NORMAL`: 普通订单
 * - `CONNECT`: 云链订单
 *
 * @see {@link OrderType}
 */
export type IOrderType = `${OrderType}` | OrderType

/**
 * 订单状态
 *
 * - `PENDING`: 待付款
 * - `PAID`: 待发货
 * - `DELIVERED`: 待收货
 * - `RECEIVED`: 待评价
 * - `FINISHED`: 已完成
 * - `CLOSED`: 已关闭
 * - `REFUNDED`: 已退款
 * - `DELETED`: 已删除
 *
 * @see {@link OrderStatus}
 */
export type IOrderStatus = `${OrderStatus}` | OrderStatus

/**
 * 订单来源
 *
 * - `WEB`: 网站
 * - `H5`: H5
 * - `APP_IOS`: iOS APP
 * - `APP_ANDROID`: Android APP
 * - `AGENCY`: 代客下单
 * - `IMPORT`: 批量导入
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 *
 * @see {@link OrderSource}
 */
export type IOrderSource = `${OrderSource}` | OrderSource

/**
 * 订单支付状态
 *
 * - `PENDING`: 待付款
 * - `PAID`: 已付款
 * - `CLOSE`: 已关闭
 *
 * @see {@link OrderPaymentStatus}
 */
export type IOrderPaymentStatus = `${OrderPaymentStatus}` | OrderPaymentStatus

/**
 * 订单支付类型
 *
 * - `ALIPAY`: 支付宝
 * - `WECHAT`: 微信支付
 * - `BALANCE`: 余额支付
 *
 * @see {@link OrderPaymentType}
 */
export type IOrderPaymentType = `${OrderPaymentType}` | OrderPaymentType

/**
 * 订单支付折扣类型
 *
 * - `PRIVILEGE`: 会员权益
 * - `PROMOTION`: 优惠活动
 *
 * @see {@link OrderPaymentDiscountType}
 */
export type IOrderPaymentDiscountType = `${OrderPaymentDiscountType}` | OrderPaymentDiscountType

/**
 * 订单商品状态
 *
 * - `PENDING`: `待付款`
 * - `PAID`: `待发货`
 * - `DELIVERED`: `已发货`
 * - `RECEIVED`: `已收货`
 * - `FINISHED`: `已完成`
 * - `RETURNING`: `待退货`
 * - `RETURNED`: `已退货`
 * - `REFUNDING`: `待退款`
 * - `REFUNDED`: `已退款`
 *
 * @see {@link OrderGoodsStatus}
 */
export type IOrderGoodsStatus = `${OrderGoodsStatus}` | OrderGoodsStatus

/**
 * 订单退换货售后类型
 *
 * - `APPLY`: 买家申请售后
 * - `REFUND`: 商家主动退款
 *
 * @see {@link OrderRefundType}
 */
export type IOrderRefundType = `${OrderRefundType}` | OrderRefundType

/**
 * 订单退换货处理状态
 *
 * - `NONE`: 无售后
 * - `PROCESSING`: 处理中
 * - `FINISHED`: 已结束
 *
 * @see {@link OrderRefundStatus}
 */
export type IOrderRefundStatus = `${OrderRefundStatus}` | OrderRefundStatus

/**
 * 订单退换货处理阶段
 *
 * - `PENDING`: 待审核
 * - `APPROVED`: 待买家退货
 * - `SENDING`: 待商家收货
 * - `RECEIVED`: 待商家退款
 * - `SELLER_PENDING`: 待商家发货
 * - `SELLER_SENDING`: 待买家收货
 * - `BUYER_RECEIVED`: 已换货
 * - `REJECTED`: 已拒绝
 * - `REFUNDED`: 已退款
 * - `PARTIAL_REFUNDED`: 已部分退款
 *
 * @see {@link OrderRefundStage}
 */
export type IOrderRefundStage = `${OrderRefundStage}` | OrderRefundStage

/**
 * 订单退换货退款方式
 *
 * - `REFUND`: 退货退款
 * - `REPLACE`: 换货
 *
 * @see {@link OrderRefundMode}
 */
export type IOrderRefundMode = `${OrderRefundMode}` | OrderRefundMode

/**
 * 订单评论审核状态
 *
 * - `PENDING`: 待审核
 * - `APPROVED`: 已通过
 * - `REJECTED`: 已拒绝
 *
 * @see {@link OrderCommentAuditStatus}
 */
export type IOrderCommentAuditStatus = `${OrderCommentAuditStatus}` | OrderCommentAuditStatus

/**
 * 订单日志类型
 *
 * - `ORDER`: 买家下单
 * - `PAYMENT`: 买家付款
 * - `DELIVERED`: 商家发货
 * - `RECEIVE`: 买家收货
 * - `FINISH`: 交易完成
 * - `REFUND_APPLY`: 买家申请售后
 * - `REFUND_APPROVAL`: 商家处理售后
 * - `REFUND_BUYER_RETURNS`: 买家退货,
 * 商品已寄出
 * - `REFUND_SELLER_RECEIVE`: 商家已收货
 * - `REFUND_SELLER_DELIVERED_AGAIN`: 商家重新发货
 * - `REFUND_BUYER_RECEIVE`: 买家收货
 * - `REFUND_SELLER_REFUNDS`: 商家退款
 * - `REFUND_FINISH`: 售后结束
 *
 * @see {@link OrderLogType}
 */
export type IOrderLogType = `${OrderLogType}` | OrderLogType
