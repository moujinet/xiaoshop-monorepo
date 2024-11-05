import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/review/constants'

/**
 * Create Product Review Reply Event
 */
export class ProductReviewReplyCreateEvent extends AdminEvent {
  constructor(
    public readonly reviewId: number,
    public readonly replyId: number,
    public readonly replyContent: string,
    public readonly userId: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `回复商品评价 - ${this.replyContent}`
  }
}

/**
 * Update Product Review Reply Event
 */
export class ProductReviewReplyUpdateEvent extends AdminEvent {
  constructor(
    public readonly reviewId: number,
    public readonly replyId: number,
    public readonly replyContent: string,
    public readonly userId: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新回复内容 - ${this.replyContent}`
  }
}

/**
 * Delete Product Review Reply Event
 */
export class ProductReviewReplyDeleteEvent extends AdminEvent {
  constructor(
    public readonly reviewId: number,
    public readonly replyId: number,
    public readonly replyContent: string,
    public readonly userId: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除回复内容 - ${this.replyContent}`
  }
}
