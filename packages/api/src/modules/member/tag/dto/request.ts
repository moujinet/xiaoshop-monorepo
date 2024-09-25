import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetMemberTagPagesRequest extends PaginationRequest {}

export class GetMemberTagInfoRequest {
  @IsNumberString({}, { message: '会员标签 ID 不正确' })
  @IsNotEmpty({ message: '会员标签 ID 不能为空' })
  readonly id: number
}

export class DeleteMemberTagRequest {
  @IsNumber({}, { message: '会员标签 ID 不正确' })
  @IsNotEmpty({ message: '会员标签 ID 不能为空' })
  readonly id: number
}
