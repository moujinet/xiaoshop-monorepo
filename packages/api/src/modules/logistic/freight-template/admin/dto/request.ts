import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetFreightTemplatePagesRequest extends PaginationRequest {}

export class GetFreightTemplateInfoRequest {
  @IsNumberString({}, { message: '运费模板 ID 不正确' })
  @IsNotEmpty({ message: '运费模板 ID 不能为空' })
  readonly id: number
}

export class DeleteFreightTemplateRequest {
  @IsNumber({}, { message: '运费模板 ID 不正确' })
  readonly id: number
}
