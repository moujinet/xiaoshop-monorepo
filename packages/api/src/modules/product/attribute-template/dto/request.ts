import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetProductAttributeTemplatePagesRequest extends PaginationRequest {}

export class GetProductAttributeTemplateRequest {
  @ApiProperty({ description: '商品参数模板 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

export class DeleteProductAttributeTemplateRequest {
  @ApiProperty({ description: '商品参数模板 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
