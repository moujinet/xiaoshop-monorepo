import { ShopEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/review/constants'

/**
 * Create Product Review Event
 */
export class ProductReviewCreateEvent extends ShopEvent {
  constructor(
    public readonly productId: number,
    public readonly productName: string,
    public readonly reviewId: number,
    public readonly memberId: number,
  ) {
    super(MODULE_NAME)
  }
}

/**
 * Update Product Review Event
 */
export class ProductReviewUpdateEvent extends ShopEvent {
  constructor(
    public readonly productId: number,
    public readonly productName: string,
    public readonly reviewId: number,
    public readonly memberId: number,
  ) {
    super(MODULE_NAME)
  }
}
