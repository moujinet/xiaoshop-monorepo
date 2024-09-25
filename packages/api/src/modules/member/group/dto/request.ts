import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetMemberGroupPagesRequest extends PaginationRequest {}

export class GetMemberGroupInfoRequest {
  @IsNumberString({}, { message: '会员群体 ID 不正确' })
  @IsNotEmpty({ message: '会员群体 ID 不能为空' })
  readonly id: number
}

export class DeleteMemberGroupRequest {
  @IsNumber({}, { message: '会员群体 ID 不正确' })
  @IsNotEmpty({ message: '会员群体 ID 不能为空' })
  readonly id: number
}
