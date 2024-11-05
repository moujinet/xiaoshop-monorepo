import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Product Review Pages
 */
export class GetProductReviewPagesRequest extends PaginationDto {
  @IsNumberString({}, { message: '商品 ID 不正确' })
  @IsNotEmpty({ message: '商品 ID 不能为空' })
  readonly productId?: number
}

/**
 * Get Product Review
 */
export class GetProductReviewRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Review
 */
export class DeleteProductReviewRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}

/**
 * Get Product Review Reply
 */
export class GetProductReviewReplyRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Review Reply
 */
export class DeleteProductReviewReplyRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}
