import {
  type ILocationPath,
  type IMemberGender,
  IMemberStatus,
  MemberGender,
  MemberStatus,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { member } from '../example'
import { LocationDto } from '~/common'

/**
 * 会员 DTO
 */
export class MemberPayload {
  @ApiProperty({ description: '会员账号', example: member.username })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ required: false, description: '会员昵称', example: member.nickname })
  @IsString()
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '会员手机号', example: member.mobile })
  @IsString()
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '会员密码', example: '111111' })
  @IsString()
  @IsOptional()
  readonly password: string

  @ApiProperty({ required: false, description: '会员头像', example: member.avatar })
  @IsString()
  @IsOptional()
  readonly avatar: string

  @ApiProperty({ required: false, enum: MemberGender, description: '会员性别', example: member.gender })
  @IsEnum(MemberGender)
  @IsOptional()
  readonly gender: IMemberGender

  @ApiProperty({ required: false, type: LocationDto, description: '注册城市', example: member.location })
  @Type(() => LocationDto)
  @IsOptional()
  readonly location: ILocationPath

  @ApiProperty({ required: false, description: '会员分组', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ required: false, description: '会员标签', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly tagId: number

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
 * 更新会员资料 DTO
 */
export class UpdateMemberPayload
  extends OmitType(MemberPayload, [
    'username',
    'password',
  ] as const) {}

/**
 * 批量更新会员资料 DTO
 */
export class UpdateMemberProfilePayload
  extends OmitType(MemberPayload, [
    'avatar',
    'username',
    'nickname',
    'mobile',
    'password',
    'location',
    'gender',
  ] as const) {
  @ApiProperty({ required: false, enum: MemberStatus, description: '会员状态', example: member.status })
  @IsEnum(MemberStatus)
  @IsOptional()
  readonly status: IMemberStatus
}

/**
 * 批量更新会员资料 DTO
 */
export class BatchUpdateMemberPayload {
  @ApiProperty({ description: '会员 ID', example: [1] })
  @IsNumber({}, { each: true })
  @IsArray()
  readonly ids: number[]

  @ApiProperty({ description: '会员资料' })
  @ValidateNested()
  @Type(() => UpdateMemberProfilePayload)
  readonly profile: UpdateMemberProfilePayload
}

/**
 * 更新会员密码 DTO
 */
export class UpdateMemberPasswordPayload {
  @ApiProperty({ description: '会员密码' })
  @IsString()
  readonly password: string

  @ApiProperty({ description: '更新密码' })
  @IsString()
  readonly newPassword: string
}

/**
 * 重置会员密码 DTO
 */
export class ResetMemberPasswordPayload {
  @ApiProperty({ description: '重置密码' })
  @IsString()
  readonly newPassword: string
}

/**
 * 会员注册 DTO
 */
export class MemberRegisterPayload {}
