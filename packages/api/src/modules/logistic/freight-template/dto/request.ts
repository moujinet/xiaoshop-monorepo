import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetLogisticFreightTemplatePagesRequest extends PaginationRequest {}

export class GetLogisticFreightTemplateInfoRequest {
  @IsNumberString({}, { message: '运费模板 ID 不正确' })
  @IsNotEmpty({ message: '运费模板 ID 不能为空' })
  readonly id: number
}

export class DeleteLogisticFreightTemplateInfoRequest {
  @IsNumber({}, { message: '运费模板 ID 不正确' })
  readonly id: number
}
