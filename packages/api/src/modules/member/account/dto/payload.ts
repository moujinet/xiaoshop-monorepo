import type { ILocationPath, MemberGender } from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'

import { LocationDto } from '~/common/dto/location.dto'

/**
 * Create Member
 */
export class CreateMemberPayload {
  @IsString({ message: '会员账号不正确' })
  @IsNotEmpty({ message: '会员账号不能为空' })
  readonly username: string

  @IsString({ message: '会员昵称不正确' })
  @IsOptional()
  readonly nickname?: string

  @ValidateIf(o => o.mobile)
  @IsMobilePhone('zh-CN', {}, { message: '会员手机号格式不正确' })
  @IsNotEmpty({ message: '会员手机号不能为空' })
  readonly mobile: string

  @IsString({ message: '会员密码不正确' })
  @IsNotEmpty({ message: '会员密码不能为空' })
  readonly password: string

  @IsNumber({}, { message: '会员性别不正确' })
  @IsOptional()
  readonly gender?: MemberGender

  @Type(() => LocationDto)
  @IsArray({ message: '会员地址不正确' })
  @ArrayNotEmpty({ message: '会员地址不能为空' })
  @IsOptional()
  readonly location?: ILocationPath

  @IsNumber({}, { each: true, message: '会员标签 ID 不正确' })
  @IsArray({ message: '会员标签 ID 不正确' })
  @IsOptional()
  readonly tagIds?: number[]
}

/**
 * Update Member Tags
 */
export class UpdateMemberTagsPayload {
  @IsNumber({}, { each: true, message: '会员 ID 不正确' })
  @IsArray({ message: '会员 ID 不正确' })
  @ArrayNotEmpty({ message: '会员 ID 不能为空' })
  readonly ids: number[]

  @IsNumber({}, { each: true, message: '会员标签 ID 不正确' })
  @IsArray({ message: '会员标签 ID 不正确' })
  @IsOptional()
  readonly tagIds?: number[]
}

/**
 * Reset Member Password
 */
export class ResetMemberPasswordPayload {
  @IsString({ message: '会员密码不正确' })
  @IsNotEmpty({ message: '会员密码不能为空' })
  readonly password: string
}

/**
 * Update Member Points
 */
export class UpdateMemberPointsPayload {
  @IsNumber({}, { message: '会员积分不正确' })
  @IsNotEmpty({ message: '会员积分不能为空' })
  readonly points: number

  @IsString({ message: '会员积分操作原因不正确' })
  @IsOptional()
  readonly reason?: string
}
