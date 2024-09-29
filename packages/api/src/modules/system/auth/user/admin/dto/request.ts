import type { SystemUserStatus, YesOrNo } from '@xiaoshop/shared'

import { IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemUserPagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '是否系统管理员不正确' })
  @IsOptional()
  readonly isAdmin?: YesOrNo

  @IsNumberString({}, { message: '系统用户状态不正确' })
  @IsOptional()
  readonly status?: SystemUserStatus

  @IsString({ message: '真实姓名不正确' })
  @IsOptional()
  readonly name?: string

  @IsPhoneNumber('CN', { message: '手机号不正确' })
  @IsOptional()
  readonly mobile?: string

  @IsNumberString({}, { message: '所在部门不正确' })
  @IsOptional()
  readonly departmentId?: number

  @IsNumberString({}, { message: '所在职位不正确' })
  @IsOptional()
  readonly positionId?: number
}

export class GetSystemUserInfoRequest {
  @IsNumberString({}, { message: '系统用户 ID 不正确' })
  readonly id: number
}

export class DeleteSystemUserRequest {
  @IsNumber({}, { message: '系统用户 ID 不正确' })
  readonly id: number
}
