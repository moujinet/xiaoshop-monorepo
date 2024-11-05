import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Product Group Pages
 */
export class GetProductGroupPagesRequest extends PaginationDto {}

/**
 * Get Product Group
 */
export class GetProductGroupRequest {
  @IsNumberString({}, { message: '商品分组 ID 不正确' })
  @IsNotEmpty({ message: '商品分组 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Group
 */
export class DeleteProductGroupRequest {
  @IsNumber({}, { message: '商品分组 ID 不正确' })
  readonly id: number
}
