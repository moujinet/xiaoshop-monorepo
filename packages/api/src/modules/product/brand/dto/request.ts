import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Product Brand Pages
 */
export class GetProductBrandPagesRequest extends PaginationDto {}

/**
 * Get Product Brand
 */
export class GetProductBrandRequest {
  @IsNumberString({}, { message: '商品品牌 ID 不正确' })
  @IsNotEmpty({ message: '商品品牌 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Brand
 */
export class DeleteProductBrandRequest {
  @IsNumber({}, { message: '商品品牌 ID 不正确' })
  readonly id: number
}
