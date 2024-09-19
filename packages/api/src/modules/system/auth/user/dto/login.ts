import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SystemUserLogin {
  @IsString({ message: '用户名不正确' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(4, { message: '用户名不能少于 6 位' })
  readonly username: string

  @IsString({ message: '登录密码不正确' })
  @IsNotEmpty({ message: '登录密码不能为空' })
  @MinLength(6, { message: '用登录密码不能少于 6 位' })
  readonly password: string
}
