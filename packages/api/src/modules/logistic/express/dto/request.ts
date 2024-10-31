import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Logistic Express Pages
 */
export class GetLogisticExpressPagesRequest extends PaginationDto {}

/**
 * Get Logistic Express
 */
export class GetLogisticExpressRequest {
  @IsNumberString({}, { message: '快递公司 ID 不正确' })
  @IsNotEmpty({ message: '快递公司 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Logistic Express
 */
export class DeleteLogisticExpressRequest {
  @IsNumber({}, { message: '快递公司 ID 不正确' })
  readonly id: number
}
