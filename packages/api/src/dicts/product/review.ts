import {
  ColorName,
  type IDict,
  ProductReviewStatus,
} from '@xiaoshop/shared'

/**
 * 评价状态 - 字典
 *
 * @see {@link ProductReviewStatus}
 */
export const PRODUCT_REVIEW_STATUSES: IDict[] = [
  { value: '待审核', key: ProductReviewStatus.PENDING, color: ColorName.ARCOBLUE },
  { value: '已通过', key: ProductReviewStatus.APPROVED, color: ColorName.GREEN },
  { value: '已拒绝', key: ProductReviewStatus.REJECTED, color: ColorName.RED },
]
