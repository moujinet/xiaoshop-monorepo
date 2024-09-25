import { IsNotEmpty, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetMemberCardUpgradePagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '会员 ID 不正确' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number
}
