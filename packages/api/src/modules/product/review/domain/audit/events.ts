import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/review/constants'

/**
 * Approve Product Review Event
 */
export class ProductReviewApproveEvent extends AdminEvent {
  constructor(
    public readonly productId: number,
    public readonly productName: string,
    public readonly reviewId: number,
    public readonly reviewContent: string,
    public readonly memberId: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `评价审核通过 - ${this.productName} - ${this.reviewContent}`
  }
}

/**
 * Reject Product Review Event
 */
export class ProductReviewRejectEvent extends AdminEvent {
  constructor(
    public readonly productId: number,
    public readonly productName: string,
    public readonly reviewId: number,
    public readonly reviewContent: string,
    public readonly memberId: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `评价审核驳回 - ${this.productName} - ${this.reviewContent}`
  }
}
