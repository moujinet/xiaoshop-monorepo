// -----------------------------------------------
// 订单 - 类型
// -----------------------------------------------

/**
 * 枚举: 订单类型
 *
 * - `NORMAL`: 普通订单
 * - `CONNECT`: 云链订单
 */
export enum OrderTypeEnum {
  NORMAL = 'normal',
  CONNECT = 'connect',
}

/**
 * 字典: 订单类型
 *
 * @see {@link IOrderType}
 */
export const ORDER_TYPES = [
  { label: '普通订单', value: OrderTypeEnum.NORMAL, color: 'blue' },
  { label: '云链订单', value: OrderTypeEnum.CONNECT, color: 'orange' },
]

// -----------------------------------------------
// 订单 - 状态
// -----------------------------------------------

/**
 * 枚举: 订单状态
 *
 * - `PENDING`: 待付款
 * - `PAID`: 待发货
 * - `DELIVERED`: 待收货
 * - `RECEIVED`: 待评价
 * - `FINISHED`: 已完成
 * - `CLOSED`: 已关闭
 * - `REFUNDED`: 已退款
 * - `DELETED`: 已删除
 */
export enum OrderStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  DELIVERED = 'delivered',
  RECEIVED = 'received',
  FINISHED = 'finished',
  CLOSED = 'closed',
  REFUNDED = 'refunded',
  DELETED = 'deleted',
}

/**
 * 字典: 订单状态
 *
 * @see {@link IOrderStatus}
 */
export const ORDER_STATUSES = [
  { label: '待付款', value: OrderStatusEnum.PENDING, color: 'orange' },
  { label: '待发货', value: OrderStatusEnum.PAID, color: 'blue' },
  { label: '待收货', value: OrderStatusEnum.DELIVERED, color: 'blue' },
  { label: '待评价', value: OrderStatusEnum.RECEIVED, color: 'blue' },
  { label: '已完成', value: OrderStatusEnum.FINISHED, color: 'green' },
  { label: '已关闭', value: OrderStatusEnum.CLOSED, color: 'gray' },
  { label: '已退款', value: OrderStatusEnum.REFUNDED, color: 'red' },
  { label: '已删除', value: OrderStatusEnum.DELETED, color: 'gray' },
]

// -----------------------------------------------
// 订单 - 来源
// -----------------------------------------------

/**
 * 枚举: 订单来源
 *
 * - `APP_ANDROID`: Android APP
 * - `APP_IOS`: iOS APP
 * - `H5`: H5
 * - `IMPORT`: 批量导入
 * - `AGENCY`: 代客下单
 * - `WEB`: 网站
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 */
export enum OrderSourceEnum {
  APP_ANDROID = 'android',
  APP_IOS = 'ios',
  H5 = 'h5',
  IMPORT = 'import',
  AGENCY = 'agency',
  WEB = 'web',
  WECHAT_MP = 'wechat_mp',
  WECHAT_OA = 'wechat_oa',
}

/**
 * 字典: 订单来源
 *
 * @see {@link IOrderSource}
 */
export const ORDER_SOURCES = [
  { label: '微信小程序', value: OrderSourceEnum.WECHAT_MP, color: 'gray', icon: 'mingcute:wechat-miniprogram' },
  { label: '微信公众号', value: OrderSourceEnum.WECHAT_OA, color: 'green', icon: 'mingcute:wechat' },
  { label: 'H5', value: OrderSourceEnum.H5, color: 'blue', icon: 'mingcute:cellphone' },
  { label: '代客下单', value: OrderSourceEnum.AGENCY, color: 'blue', icon: 'mingcute:user-edit' },
  { label: '批量导入', value: OrderSourceEnum.IMPORT, color: 'blue', icon: 'mingcute:upload-3' },
  { label: '网站', value: OrderSourceEnum.WEB, color: 'blue', icon: 'mingcute:laptop' },
  { label: 'iOS APP', value: OrderSourceEnum.APP_IOS, color: 'gray', icon: 'mingcute:apple' },
  { label: 'Android APP', value: OrderSourceEnum.APP_ANDROID, color: 'cyan', icon: 'mingcute:android-2' },
]

// -----------------------------------------------
// 订单 - 支付状态
// -----------------------------------------------

/**
 * 枚举: 订单支付状态
 *
 * - `PENDING`: 待付款
 * - `PAID`: 已付款
 * - `CLOSE`: 已关闭
 */
export enum OrderPaymentStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  CLOSE = 'closed',
}

/**
 * 字典: 订单支付状态
 *
 * @see {@link IOrderPaymentStatus}
 */
export const ORDER_PAYMENT_STATUSES = [
  { label: '待付款', value: OrderPaymentStatusEnum.PENDING, color: 'orange' },
  { label: '已付款', value: OrderPaymentStatusEnum.PAID, color: 'blue' },
  { label: '已关闭', value: OrderPaymentStatusEnum.CLOSE, color: 'gray' },
]

// -----------------------------------------------
// 订单 - 支付方式
// -----------------------------------------------

/**
 * 枚举: 订单支付方式
 *
 * - `ALIPAY`: 支付宝
 * - `WECHAT`: 微信支付
 * - `BALANCE`: 余额支付
 */
export enum OrderPaymentTypeEnum {
  ALIPAY = 'alipay',
  WECHAT = 'wechat',
  BALANCE = 'balance',
}

/**
 * 字典: 订单支付方式
 *
 * @see {@link IOrderPaymentType}
 */
export const ORDER_PAYMENT_TYPES = [
  { label: '支付宝', value: OrderPaymentTypeEnum.ALIPAY, color: 'blue' },
  { label: '微信支付', value: OrderPaymentTypeEnum.WECHAT, color: 'green' },
  { label: '余额支付', value: OrderPaymentTypeEnum.BALANCE, color: 'orange' },
]

// -----------------------------------------------
// 订单 - 支付 - 折扣类型
// -----------------------------------------------

/**
 * 枚举: 订单支付折扣类型
 *
 * - `PRIVILEGE`: 会员权益
 * - `PROMOTION`: 优惠活动
 */
export enum OrderPaymentDiscountTypeEnum {
  PRIVILEGE = 'privilege',
  PROMOTION = 'promotion',
}

/**
 * 字典: 订单支付折扣类型
 *
 * @see {@link IOrderPaymentDiscountType}
 */
export const ORDER_PAYMENT_DISCOUNT_TYPES = [
  { label: '会员权益', value: OrderPaymentDiscountTypeEnum.PRIVILEGE, color: 'purple' },
  { label: '优惠活动', value: OrderPaymentDiscountTypeEnum.PROMOTION, color: 'orange' },
]

// -----------------------------------------------
// 订单 - 商品 - 状态
// -----------------------------------------------

/**
 * 枚举: 订单商品状态
 *
 * - `PENDING`: 待付款
 * - `PAID`: 待发货
 * - `DELIVERED`: 已发货
 * - `RECEIVED`: 已收货
 * - `FINISHED`: 已完成
 * - `RETURNING`: 待退货
 * - `RETURNED`: 已退货
 * - `REFUNDING`: 待退款
 * - `REFUNDED`: 已退款
 */
export enum OrderGoodsStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  DELIVERED = 'delivered',
  RECEIVED = 'received',
  FINISHED = 'finished',
  RETURNING = 'returning',
  RETURNED = 'returned',
  REFUNDING = 'refunding',
  REFUNDED = 'refunded',
}

/**
 * 字典: 订单商品状态
 *
 * @see {@link IOrderGoodsStatus}
 */
export const ORDER_GOODS_STATUSES = [
  { value: OrderGoodsStatusEnum.PENDING, label: '待付款', color: 'gray' },
  { value: OrderGoodsStatusEnum.PAID, label: '待发货', color: 'gold' },
  { value: OrderGoodsStatusEnum.DELIVERED, label: '已发货', color: 'blue' },
  { value: OrderGoodsStatusEnum.RECEIVED, label: '已收货', color: 'green' },
  { value: OrderGoodsStatusEnum.FINISHED, label: '已完成', color: 'gray' },
  { value: OrderGoodsStatusEnum.RETURNING, label: '待退货', color: 'orange' },
  { value: OrderGoodsStatusEnum.RETURNED, label: '已退货', color: 'red' },
  { value: OrderGoodsStatusEnum.REFUNDING, label: '待退款', color: 'orange' },
  { value: OrderGoodsStatusEnum.REFUNDED, label: '已退款', color: 'red' },
]

// -----------------------------------------------
// 订单 - 退换货 - 售后类型
// -----------------------------------------------

/**
 * 枚举: 订单退换货售后类型
 *
 * - `APPLY`: 买家申请售后
 * - `REFUND`: 商家主动退款
 */
export enum OrderRefundTypeEnum {
  APPLY = 'apply',
  REFUND = 'refund',
}

/**
 * 字典: 订单退换货售后类型
 *
 * @see {@link IOrderRefundType}
 */
export const ORDER_REFUND_TYPES = [
  { value: OrderRefundTypeEnum.APPLY, label: '买家申请售后', color: 'orange' },
  { value: OrderRefundTypeEnum.REFUND, label: '商家主动退款', color: 'blue' },
]

// -----------------------------------------------
// 订单 - 退换货 - 处理状态
// -----------------------------------------------

/**
 * 枚举: 订单退换货处理状态
 *
 * - `NONE`: 无售后
 * - `PROCESSING`: 处理中
 * - `FINISHED`: 已结束
 */
export enum OrderRefundStatusEnum {
  NONE = 'none',
  PROCESSING = 'processing',
  FINISHED = 'finished',
}

/**
 * 字典: 订单退换货处理状态
 *
 * @see {@link IOrderRefundStatus}
 */
export const ORDER_REFUND_STATUSES = [
  { value: OrderRefundStatusEnum.NONE, label: '无售后', color: 'gray' },
  { value: OrderRefundStatusEnum.PROCESSING, label: '处理中', color: 'orange' },
  { value: OrderRefundStatusEnum.FINISHED, label: '已结束', color: 'gray' },
]

// -----------------------------------------------
// 订单 - 退换货 - 处理阶段
// -----------------------------------------------

/**
 * 枚举: 订单退换货处理阶段
 *
 * - `PENDING`: 待审核
 * - `APPROVED`: 待买家退货
 * - `SENDING`: 待商家收货
 * - `RECEIVED`: 待商家退款
 * - `REJECTED`: 已拒绝
 * - `REFUNDED`: 已退款
 * - `SELLER_PENDING`: 待商家发货
 * - `SELLER_SENDING`: 待买家收货
 * - `BUYER_RECEIVED`: 已换货
 * - `PARTIAL_REFUNDED`: 部分退款
 */
export enum OrderRefundStageEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  SENDING = 'sending',
  RECEIVED = 'received',
  REJECTED = 'rejected',
  REFUNDED = 'refunded',
  SELLER_PENDING = 'seller-pending',
  SELLER_SENDING = 'seller-sending',
  BUYER_RECEIVED = 'buyer-received',
  PARTIAL_REFUNDED = 'partial-refunded',
}

/**
 * 字典: 订单退换货处理阶段
 *
 * @see {@link IOrderRefundStage}
 */
export const ORDER_REFUND_STAGES = [
  { value: OrderRefundStageEnum.PENDING, label: '待审核', color: 'red' },
  { value: OrderRefundStageEnum.APPROVED, label: '待买家退货', color: 'arcoblue' },
  { value: OrderRefundStageEnum.SENDING, label: '待商家收货', color: 'orangered' },
  { value: OrderRefundStageEnum.RECEIVED, label: '待商家退款', color: 'orangered' },
  { value: OrderRefundStageEnum.SELLER_PENDING, label: '待商家发货', color: 'orangered' },
  { value: OrderRefundStageEnum.SELLER_SENDING, label: '待买家收货', color: 'arcoblue' },
  { value: OrderRefundStageEnum.BUYER_RECEIVED, label: '已换货', color: 'cyan' },
  { value: OrderRefundStageEnum.REJECTED, label: '已拒绝', color: 'gray' },
  { value: OrderRefundStageEnum.REFUNDED, label: '已退款', color: 'cyan' },
  { value: OrderRefundStageEnum.PARTIAL_REFUNDED, label: '已部分退款', color: 'cyan' },
]

// -----------------------------------------------
// 订单 - 退换货 - 退货方式
// -----------------------------------------------

/**
 * 枚举: 订单退换货退款方式
 *
 * - `REFUND`: 退货退款
 * - `REPLACE`: 换货
 */
export enum OrderRefundModeEnum {
  REFUND = 'refund',
  REPLACE = 'replace',
}

/**
 * 字典: 订单退换货退款方式
 *
 * @see {@link IOrderRefundMode}
 */
export const ORDER_REFUND_MODES = [
  { value: OrderRefundModeEnum.REFUND, label: '退货退款' },
  { value: OrderRefundModeEnum.REPLACE, label: '换货' },
]

// -----------------------------------------------
// 订单 - 评论审核状态
// -----------------------------------------------

/**
 * 枚举: 订单评论审核状态
 *
 * - `PENDING`: 待审核
 * - `APPROVED`: 已通过
 * - `REJECTED`: 已拒绝
 */
export enum OrderCommentAuditStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

/**
 * 字典: 订单评论审核状态
 *
 * @see {@link IOrderCommentAuditStatus}
 */
export const ORDER_COMMENT_AUDIT_STATUSES = [
  { value: OrderCommentAuditStatusEnum.PENDING, label: '待审核', color: 'gray' },
  { value: OrderCommentAuditStatusEnum.APPROVED, label: '已通过', color: 'arcoblue' },
  { value: OrderCommentAuditStatusEnum.REJECTED, label: '已拒绝', color: 'red' },
]

// -----------------------------------------------
// 订单 - 日志类型
// -----------------------------------------------

/**
 * 枚举: 订单日志类型
 *
 * - `ORDER`: 买家下单
 * - `PAYMENT`: 买家付款
 * - `DELIVERED`: 商家发货
 * - `RECEIVE`: 买家收货
 * - `FINISH`: 交易完成
 * - `REFUND_APPLY`: 买家申请售后
 * - `REFUND_APPROVAL`: 商家处理售后
 * - `REFUND_BUYER_RETURNS`: 买家退货，商品已寄出
 * - `REFUND_SELLER_RECEIVE`: 商家已收货
 * - `REFUND_SELLER_DELIVERED_AGAIN`: 商家重新发货
 * - `REFUND_BUYER_RECEIVE`: 买家收货
 * - `REFUND_SELLER_REFUNDS`: 商家退款
 * - `REFUND_FINISH`: 售后结束
 */
export enum OrderLogTypeEnum {
  ORDER = 'order',
  PAYMENT = 'payment',
  DELIVERED = 'delivered',
  RECEIVE = 'receive',
  FINISH = 'finish',
  REFUND_APPLY = 'refund_apply',
  REFUND_APPROVAL = 'refund_approval',
  REFUND_BUYER_RETURNS = 'refund_buyer_returns',
  REFUND_SELLER_RECEIVE = 'refund_seller_receive',
  REFUND_SELLER_DELIVERED_AGAIN = 'refund_seller_delivered_again',
  REFUND_BUYER_RECEIVE = 'refund_buyer_receive',
  REFUND_SELLER_REFUNDS = 'refund_seller_refunds',
  REFUND_FINISH = 'refund_finish',
}

/**
 * 字典: 订单日志类型
 *
 * @see {@link IOrderLogType}
 */
export const ORDER_LOG_TYPES = [
  { value: OrderLogTypeEnum.ORDER, label: '买家下单' },
  { value: OrderLogTypeEnum.PAYMENT, label: '买家付款' },
  { value: OrderLogTypeEnum.DELIVERED, label: '商家发货' },
  { value: OrderLogTypeEnum.RECEIVE, label: '买家收货' },
  { value: OrderLogTypeEnum.FINISH, label: '交易完成' },
  { value: OrderLogTypeEnum.REFUND_APPLY, label: '买家申请售后' },
  { value: OrderLogTypeEnum.REFUND_APPROVAL, label: '商家处理售后' },
  { value: OrderLogTypeEnum.REFUND_BUYER_RETURNS, label: '买家退货, 商品已寄出' },
  { value: OrderLogTypeEnum.REFUND_SELLER_RECEIVE, label: '商家已收货' },
  { value: OrderLogTypeEnum.REFUND_SELLER_DELIVERED_AGAIN, label: '商家重新发货' },
  { value: OrderLogTypeEnum.REFUND_BUYER_RECEIVE, label: '买家收货' },
  { value: OrderLogTypeEnum.REFUND_SELLER_REFUNDS, label: '商家退款' },
  { value: OrderLogTypeEnum.REFUND_FINISH, label: '售后结束' },
]
