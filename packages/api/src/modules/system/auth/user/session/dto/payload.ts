import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

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
