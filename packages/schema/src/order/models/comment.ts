import type { IGoodsDict, IGoodsRatingGrade } from '@/goods'
import type { IOrderCommentAuditStatus, IOrderInfo } from '@/order'

/**
 * 订单评价
 */
export interface IOrderComment {
  /**
   * 订单评价编号
   */
  id: number
  /**
   * 订单评论审核状态
   *
   * @see {@link IOrderCommentAuditStatus}
   */
  auditStatus: IOrderCommentAuditStatus
  /**
   * 订单信息
   *
   * @see {@link IOrderInfo}
   */
  order: IOrderInfo
  /**
   * 商品信息
   *
   * @see {@link IGoodsDict}
   */
  goods: IGoodsDict
  /**
   * 商品评价综合评级
   *
   * @see {@link IGoodsRatingGrade}
   */
  grade: IGoodsRatingGrade
  /**
   * 商品评分
   */
  goodsScore: number
  /**
   * 服务评分
   */
  serviceScore: number
  /**
   * 物流评分
   */
  logisticsScore: number
  /**
   * 评论内容
   */
  content: string
  /**
   * 评论附件
   *
   * @see {@link IOrderCommentAttachment}
   */
  attachments: IOrderCommentAttachment[]
  /**
   * 回复内容
   */
  reply: string
  /**
   * 是否已评论 (0: 未评论; 1: 已评论)
   */
  isCommented: number
  /**
   * 是否已回复 (0: 未回复; 1: 已回复)
   */
  isReplied: number
  /**
   * 创建时间
   */
  createdTime: number
  /**
   * 回复时间
   */
  repliedTime: number
}

/**
 * 订单评价附件
 */
export interface IOrderCommentAttachment {
  /**
   * 订单评价附件编号
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
