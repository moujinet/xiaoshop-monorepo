import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 * Create Product Review Payload
 */
export class CreateProductReviewPayload {}

/**
 * Reply Product Review Payload
 */
export class ReplyProductReviewPayload {
  @IsNumber({}, { message: '评价 ID 不正确' })
  readonly reviewId: number

  @IsNumber({}, { message: '回复用户 ID 不正确' })
  readonly userId: number

  @IsString({ message: '回复内容不正确' })
  @IsNotEmpty({ message: '回复内容不能为空' })
  readonly content: string
}
