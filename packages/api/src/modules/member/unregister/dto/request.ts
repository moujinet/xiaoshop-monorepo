import type { MemberUnregisterStatus } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Member Unregister Pages
 */
export class GetMemberUnregisterPagesRequest extends PaginationDto {
  @IsString({ message: '会员账号不正确' })
  @IsOptional()
  readonly username?: string

  @IsString({ message: '会员昵称不正确' })
  @IsOptional()
  readonly nickname?: string

  @IsString({ message: '会员手机号不正确' })
  @IsOptional()
  readonly mobile?: string

  @IsNumberString({}, { message: '注销状态不正确' })
  @IsOptional()
  readonly status?: MemberUnregisterStatus

  @IsString({ message: '会员账号不正确' })
  @IsOptional()
  readonly applyTime?: string
}

/**
 * Get Member Unregister
 */
export class GetMemberUnregisterRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Member Unregister
 */
export class DeleteMemberUnregisterRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}
