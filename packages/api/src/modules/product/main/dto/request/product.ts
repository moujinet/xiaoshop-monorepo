import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Product Pages
 */
export class GetProductPagesRequest extends PaginationDto {}

/**
 * Query Product List
 */
export class GetProductListRequest {}

/**
 * Get Product
 */
export class GetProductRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Get Product from POST request
 */
export class GetProductFromPostRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}
