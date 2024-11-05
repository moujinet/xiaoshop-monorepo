import type { IDict } from '~/common'

/**
 * 商品评价信息
 */
export interface IProductReviewInfo {
  /**
   * 评价 ID
   */
  id: number
  /**
   * 评价商品 ID
   */
  productId: number
  /**
   * 评价会员 ID
   */
  memberId: number
  /**
   * 商品评分
   */
  productScore: number
  /**
   * 服务评分
   */
  serviceScore: number
  /**
   * 物流评分
   */
  logisticsScore: number
  /**
   * 评价审核状态
   *
   * @see {@link ProductReviewStatus}
   */
  status: IDict
  /**
   * 评价图片
   */
  images: string[]
  /**
   * 评价内容
   */
  content: string
  /**
   * 回复列表
   */
  replies: IProductReviewReplyInfo[]
  /**
   * 评价时间
   */
  createdTime: string
}

/**
 * 商品评价回复信息
 */
export interface IProductReviewReplyInfo {
  /**
   * 回复 ID
   */
  id: number
  /**
   * 评价 ID
   */
  reviewId: number
  /**
   * 回复用户 ID (admin)
   */
  userId: number
  /**
   * 回复内容
   */
  content: string
  /**
   * 回复时间
   */
  createdTime: string
}
