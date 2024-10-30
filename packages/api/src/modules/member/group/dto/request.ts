import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Member Group Pages
 */
export class GetMemberGroupPagesRequest extends PaginationDto {}

/**
 * Get Member Group
 */
export class GetMemberGroupRequest {
  @IsNumberString({}, { message: '会员群体 ID 不正确' })
  @IsNotEmpty({ message: '会员群体 ID 不能为空' })
  readonly id: number
}

/**
 * Delete Member Group
 */
export class DeleteMemberGroupRequest {
  @IsNumber({}, { message: '会员群体 ID 不正确' })
  readonly id: number
}
