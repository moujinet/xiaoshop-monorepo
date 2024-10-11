import type { SystemUserStatus, YesOrNo } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

import { PaginationDto } from '~/common/dto'

export class GetSystemUserPagesRequest extends PaginationDto {
  @IsNumberString({}, { message: '是否管理员不正确' })
  @IsOptional()
  readonly isAdmin?: YesOrNo

  @IsNumberString({}, { message: '用户状态不正确' })
  @IsOptional()
  readonly status?: SystemUserStatus

  @IsString({ message: '真实姓名不正确' })
  @IsOptional()
  readonly name?: string

  @IsPhoneNumber('CN', { message: '手机号不正确' })
  @IsOptional()
  readonly mobile?: string
}

export class GetSystemUserInfoRequest {
  @IsNumberString({}, { message: '用户 ID 不正确' })
  readonly id: number
}

export class DeleteSystemUserRequest {
  @IsNumber({}, { message: '用户 ID 不正确' })
  readonly id: number
}

export class GetSystemRolePagesRequest extends PaginationDto {}

export class GetSystemRoleInfoRequest {
  @IsNumberString({}, { message: '角色 ID 不正确' })
  @IsNotEmpty({ message: '角色 ID 不能为空' })
  id: number
}

export class DeleteSystemRoleRequest {
  @IsNumber({}, { message: '角色 ID 不正确' })
  id: number
}
