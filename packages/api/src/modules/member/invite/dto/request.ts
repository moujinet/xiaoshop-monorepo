import { IsNotEmpty, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Member Invite Pages
 */
export class GetMemberInvitePagesRequest extends PaginationDto {
  @IsNumberString({}, { message: '会员 ID 不正确' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly memberId: number
}
