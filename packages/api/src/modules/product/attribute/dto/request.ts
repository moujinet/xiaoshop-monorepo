import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Product Attribute Template Pages
 */
export class GetProductAttributeTemplatePagesRequest extends PaginationDto {}

/**
 * Get Product Attribute Template
 */
export class GetProductAttributeTemplateRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Product Attribute Template
 */
export class DeleteProductAttributeTemplateRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}
