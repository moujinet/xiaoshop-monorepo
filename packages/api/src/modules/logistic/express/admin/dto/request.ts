import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetExpressPagesRequest extends PaginationRequest {}

export class GetExpressInfoRequest {
  @IsNumberString({}, { message: '物流公司 ID 不正确' })
  @IsNotEmpty({ message: '物流公司 ID 不能为空' })
  readonly id: number
}

export class DeleteExpressRequest {
  @IsNumber({}, { message: '物流公司 ID 不正确' })
  readonly id: number
}
