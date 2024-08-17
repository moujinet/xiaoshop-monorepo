import {
  type ILocationPath,
  type IMemberGender,
  type IMemberStatus,
  MemberGender,
  MemberStatus,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'
import { profile } from './example'
import { LocationDto } from '~/common'

/**
 * 会员 DTO
 */
export class MemberPayload {
  @ApiProperty({ description: '会员账号', example: profile.username })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ required: false, description: '会员昵称', example: profile.nickname })
  @IsString()
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '会员手机号', example: profile.mobile })
  @ValidateIf(o => o.mobile)
  @IsMobilePhone('zh-CN')
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '会员密码', example: '111111' })
  @IsString()
  @IsOptional()
  readonly password: string

  @ApiProperty({ required: false, description: '会员头像', example: profile.avatar })
  @IsString()
  @IsOptional()
  readonly avatar: string

  @ApiProperty({ required: false, enum: MemberGender, description: '会员性别', example: profile.gender })
  @IsEnum(MemberGender)
  @IsOptional()
  readonly gender: IMemberGender

  @ApiProperty({ required: false, type: LocationDto, description: '注册城市', example: profile.location })
  @Type(() => LocationDto)
  @IsOptional()
  readonly location: ILocationPath

  @ApiProperty({ required: false, description: '会员标签', example: [1] })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly tagIds: number[]

  @ApiProperty({ required: false, description: '开通会员卡', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly cardId: number

  @ApiProperty({ required: false, description: '开通会员卡套餐', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly cardPlanId: number

  @ApiProperty({ required: false, description: '会员积分', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly points: number
}

/**
 * 更新会员状态 DTO
 */
export class UpdateMemberStatusPayload {
  @ApiProperty({ description: '会员状态', example: MemberStatus.NORMAL })
  @IsEnum(MemberStatus)
  @IsNotEmpty()
  readonly status: IMemberStatus
}

/**
 * 更新会员标签 DTO
 */
export class UpdateMemberTagsPayload {
  @ApiProperty({ description: '会员标签 ID', example: [1] })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly tagIds: number[]
}

/**
 * 批量更新会员标签 DTO
 */
export class BatchUpdateMemberTagsPayload {
  @ApiProperty({ description: '会员 ID 列表', example: [1, 2, 3] })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly memberIds: number[]

  @ApiProperty({ description: '会员标签 ID', example: [1] })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly tagIds: number[]
}

/**
 * 重置会员密码 DTO
 */
export class ResetMemberPasswordPayload {
  @ApiProperty({ description: '重置密码', example: '111111' })
  @IsString()
  readonly newPassword: string
}
