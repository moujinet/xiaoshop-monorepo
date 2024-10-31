import { YesOrNo } from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Logistic Freight Template Pages
 */
export class GetLogisticFreightTemplatePagesRequest extends PaginationDto {}

/**
 * Query Logistic Freight Template List
 */
export class GetLogisticFreightTemplateListRequest {
  @IsNumberString({}, { message: '是否启用不正确' })
  @IsOptional()
  readonly isEnabled?: YesOrNo
}

/**
 * Get Logistic Freight Template
 */
export class GetLogisticFreightTemplateRequest {
  @IsNumberString({}, { message: '模板 ID 不正确' })
  @IsNotEmpty({ message: '模板 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Logistic Freight Template
 */
export class DeleteLogisticFreightTemplateRequest {
  @IsNumber({}, { message: '模板 ID 不正确' })
  readonly id: number
}
