import type { IProductReviewInfo } from '@xiaoshop/shared'

import { PRODUCT_REVIEW_STATUSES } from '~/dicts/product/review'
import { objectToDict, pipeDict, toDict } from '~/utils/transformer'

import { ProductReviewEntity } from './entity'

/**
 * Transform entities to list
 */
export function toProductReviewList(reviews: ProductReviewEntity[]) {
  return pipeDict<IProductReviewInfo>(reviews, [
    row => objectToDict(row, 'status', PRODUCT_REVIEW_STATUSES),
  ])
}

/**
 * Transform entity
 */
export function toProductReviewInfo(
  review: ProductReviewEntity,
): IProductReviewInfo {
  return {
    ...review,
    status: toDict(review.status, PRODUCT_REVIEW_STATUSES),
  }
}
