import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Product Tag Pages
 */
export class GetProductTagPagesRequest extends PaginationDto {}

/**
 * Get Product Tag
 */
export class GetProductTagRequest {
  @IsNumberString({}, { message: '商品标签 ID 不正确' })
  @IsNotEmpty({ message: '商品标签 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Tag
 */
export class DeleteProductTagRequest {
  @IsNumber({}, { message: '商品标签 ID 不正确' })
  readonly id: number
}
