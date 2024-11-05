import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Product Service Pages
 */
export class GetProductServicePagesRequest extends PaginationDto {}

/**
 * Get Product Service
 */
export class GetProductServiceRequest {
  @IsNumberString({}, { message: '商品服务 ID 不正确' })
  @IsNotEmpty({ message: '商品服务 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Service
 */
export class DeleteProductServiceRequest {
  @IsNumber({}, { message: '商品服务 ID 不正确' })
  readonly id: number
}
