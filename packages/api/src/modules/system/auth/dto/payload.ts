import { PickType } from '@nestjs/mapped-types'
import { SystemUserStatus, YesOrNo } from '@xiaoshop/shared'
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator'

export class SystemUserLoginPayload {
  @IsString({ message: '用户名不正确' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(4, { message: '用户名不能少于 4 位' })
  readonly username: string

  @IsString({ message: '登录密码不正确' })
  @IsNotEmpty({ message: '登录密码不能为空' })
  readonly password: string

  @IsString({ message: '验证码不正确' })
  @IsOptional()
  readonly captcha?: string
}

export class ChangeSystemUserPasswordPayload {
  @IsString({ message: '密码不正确' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string

  @IsString({ message: '新密码不正确' })
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly newPassword: string
}

export class CreateSystemUserPayload {
  @IsString({ message: '用户名不正确' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(4, { message: '用户名不能少于 4 位' })
  readonly username: string

  @IsString({ message: '真实姓名不正确' })
  @IsNotEmpty({ message: '真实姓名不能为空' })
  readonly name: string

  @IsPhoneNumber('CN', { message: '手机号不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string

  @IsString({ message: '密码不正确' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string

  @ValidateIf(o => o.isAdmin === YesOrNo.NO)
  @ArrayNotEmpty({ message: '系统角色不能为空' })
  @IsNumber({}, { each: true, message: '系统角色不正确' })
  @ArrayMaxSize(2, { message: '系统角色不能超过 2 个' })
  readonly roleIds: number[]

  @IsNumber({}, { message: '是否系统管理员不正确' })
  @IsOptional()
  readonly isAdmin?: YesOrNo
}

export class UpdateSystemUserPayload extends PickType(
  CreateSystemUserPayload,
  ['name', 'mobile', 'roleIds', 'isAdmin'],
) {
  @IsNumber({}, { message: '用户状态不正确' })
  @IsOptional()
  readonly status?: SystemUserStatus
}

export class ResetSystemUserPasswordPayload extends PickType(
  CreateSystemUserPayload,
  ['password'],
) {}

export class SystemRolePayload {
  @IsString({ message: '角色名称不正确' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  readonly name: string

  @IsString({ message: '角色描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsString({ each: true, message: '角色权限不正确' })
  @ArrayNotEmpty({ message: '角色权限不能为空' })
  readonly permissions: string[]

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}
