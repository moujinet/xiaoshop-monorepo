import {
  AuthUserStatus,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'
import { example } from './example'

/**
 * 创建员工账号 DTO
 */
export class CreateAuthUserPayload {
  @ApiProperty({ description: '员工账号', example: example.username })
  @IsString({ message: '员工账号必须为字符串' })
  @IsNotEmpty({ message: '员工账号不能为空' })
  readonly username: string

  @ApiProperty({ description: '员工密码', example: '123456' })
  @IsString({ message: '员工密码必须为字符串' })
  @MinLength(6, { message: '员工密码不能少于 6 位' })
  @IsNotEmpty({ message: '员工密码不能为空' })
  readonly password: string

  @ApiProperty({ description: '员工姓名', example: example.name })
  @IsString({ message: '员工姓名必须为字符串' })
  @IsNotEmpty({ message: '员工姓名不能为空' })
  readonly name: string

  @ApiProperty({ description: '员工手机', example: example.mobile })
  @IsMobilePhone('zh-CN', {}, { message: '员工手机格式不正确' })
  @IsNotEmpty({ message: '员工手机不能为空' })
  readonly mobile: string

  @ApiProperty({ type: [Number], required: false, description: '员工角色' })
  @IsNumber({}, { each: true, message: '员工角色必须为数字' })
  @IsOptional()
  readonly roleIds: number[]

  @ApiProperty({ required: false, description: '所属部门' })
  @IsNumber({}, { message: '所属部门必须为数字' })
  @IsOptional()
  readonly departmentId: number

  @ApiProperty({ required: false, description: '所属职位' })
  @IsNumber({}, { message: '所属职位必须为数字' })
  @IsOptional()
  readonly positionId: number

  @ApiProperty({ description: '是否管理员', enum: YesOrNo, default: YesOrNo.NO })
  @IsNumber({}, { message: '是否管理员必须为 YesOrNo 类型' })
  readonly isAdmin: YesOrNo

  @ApiProperty({ description: '员工状态', enum: AuthUserStatus, default: AuthUserStatus.NORMAL })
  @IsNumber({}, { message: '员工状态必须为 AuthUserStatus 类型' })
  readonly status: AuthUserStatus
}

/**
 * 更新员工账号 DTO
 */
export class UpdateAuthUserPayload extends CreateAuthUserPayload {
  @ApiProperty({ required: false, description: '员工密码', example: '123456' })
  @IsString({ message: '员工密码必须为字符串' })
  @MinLength(6, { message: '员工密码不能少于 6 位' })
  @IsOptional()
  readonly password: string
}

/**
 * 登录员工账号请求 DTO
 */
export class LoginAuthUserPayload {
  @ApiProperty({ description: '员工账号', example: 'user' })
  @IsString({ message: '员工账号必须为字符串' })
  @IsNotEmpty({ message: '员工账号不能为空' })
  readonly username: string

  @ApiProperty({ description: '员工密码', example: '123456' })
  @IsString({ message: '员工密码必须为字符串' })
  @IsNotEmpty({ message: '员工密码不能为空' })
  readonly password: string
}
