import { YesOrNo } from '@xiaoshop/shared'
import { ArrayMaxSize, ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateIf } from 'class-validator'

export class CreateSystemUserPayload {
  @IsString({ message: '用户名不正确' })
  @IsNotEmpty({ message: '用户名不能为空' })
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

  @IsNumber({}, { message: '部门 ID 不正确' })
  @IsOptional()
  readonly departmentId?: number

  @IsNumber({}, { message: '职位 ID 不正确' })
  @IsOptional()
  readonly positionId?: number

  @IsNumber({}, { message: '是否系统管理员不正确' })
  @IsOptional()
  readonly isAdmin?: YesOrNo
}

export class UpdateSystemUserPayload {
  @IsString({ message: '真实姓名不正确' })
  @IsNotEmpty({ message: '真实姓名不能为空' })
  readonly name: string

  @IsPhoneNumber('CN', { message: '手机号不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string

  @ValidateIf(o => o.isAdmin === YesOrNo.NO)
  @ArrayNotEmpty({ message: '系统角色不能为空' })
  @IsNumber({}, { each: true, message: '系统角色不正确' })
  @ArrayMaxSize(2, { message: '系统角色不能超过 2 个' })
  readonly roleIds: number[]

  @IsNumber({}, { message: '部门 ID 不正确' })
  @IsOptional()
  readonly departmentId?: number

  @IsNumber({}, { message: '职位 ID 不正确' })
  @IsOptional()
  readonly positionId?: number

  @IsNumber({}, { message: '是否系统管理员不正确' })
  @IsOptional()
  readonly isAdmin?: YesOrNo
}

export class ResetSystemUserPasswordPayload {
  @IsString({ message: '密码不正确' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string
}

export class ChangeSystemUserPasswordPayload {
  @IsString({ message: '密码不正确' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string

  @IsString({ message: '新密码不正确' })
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly newPassword: string
}
