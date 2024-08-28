import {
  type ILocationPath,
  type IMemberAccountChangeType,
  type IMemberAccountKeys,
  type IMemberGender,
  type IMemberStatus,
  MemberAccountChangeType,
  MemberGender,
  MemberStatus,
} from '@xiaoshop/shared'
import { IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateIf } from 'class-validator'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { example } from './example'
import { Location } from '~/common/dto'

/**
 * 会员账号 DTO
 */
export class MemberAccountPayload {
  @ApiProperty({ description: '会员账号', example: example.username })
  @IsString({ message: '会员账号必须为字符串' })
  @IsNotEmpty({ message: '会员账号不能为空' })
  readonly username: string

  @ApiProperty({ required: false, description: '会员昵称', example: example.nickname })
  @IsString({ message: '会员昵称必须为字符串' })
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '会员手机号', example: example.mobile })
  @ValidateIf(o => o.mobile)
  @IsMobilePhone('zh-CN', {}, { message: '会员手机号格式错误' })
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '会员密码', example: '111111' })
  @IsString({ message: '会员密码必须为字符串' })
  @IsOptional()
  readonly password: string

  @ApiProperty({ required: false, description: '会员头像', example: example.avatar })
  @IsString({ message: '会员头像必须为字符串' })
  @IsOptional()
  readonly avatar: string

  @ApiProperty({ required: false, enum: MemberGender, description: '会员性别', example: example.gender })
  @IsEnum(MemberGender, { message: '会员性别错误' })
  @IsOptional()
  readonly gender: IMemberGender

  @ApiProperty({ required: false, type: [Location], description: '注册城市', example: example.location })
  @Type(() => Location)
  @IsOptional()
  readonly location: ILocationPath

  @ApiProperty({ required: false, description: '会员标签', example: [1] })
  @IsNumber({}, { each: true, message: '会员标签 ID 必须为数字' })
  @IsOptional()
  readonly tagIds: number[]

  @ApiProperty({ required: false, description: '开通会员卡', example: 1 })
  @IsNumber({}, { message: '会员卡 ID 必须为数字' })
  @IsOptional()
  readonly cardId: number

  @ApiProperty({ required: false, description: '开通会员卡套餐', example: 1 })
  @IsNumber({}, { message: '会员卡套餐 ID 必须为数字' })
  @IsOptional()
  readonly cardPlanId: number

  @ApiProperty({ required: false, description: '会员积分', example: 1 })
  @IsNumber({}, { message: '会员积分必须为数字' })
  @IsOptional()
  readonly points: number
}

/**
 * 更新会员状态 DTO
 */
export class UpdateMemberStatusPayload {
  @ApiProperty({ description: '会员状态', example: MemberStatus.NORMAL })
  @IsEnum(MemberStatus, { message: '会员状态错误' })
  @IsNotEmpty({ message: '会员状态不能为空' })
  readonly status: IMemberStatus
}

/**
 * 更新会员标签 DTO
 */
export class UpdateMemberTagsPayload
  extends PickType(MemberAccountPayload, ['tagIds'] as const) {}

/**
 * 批量更新会员标签 DTO
 */
export class BatchUpdateMemberTagsPayload extends UpdateMemberTagsPayload {
  @ApiProperty({ description: '会员 ID 列表', example: [1, 2, 3] })
  @IsNumber({}, { each: true, message: '会员 ID 必须为数字' })
  @IsNotEmpty({ message: '会员 ID 列表不能为空' })
  readonly memberIds: number[]
}

/**
 * 重置会员密码 DTO
 */
export class ResetMemberPasswordPayload {
  @ApiProperty({ description: '重置密码', example: '111111' })
  @IsString({ message: '重置密码必须为字符串' })
  readonly newPassword: string
}

/**
 * 会员积分变更 DTO
 */
export class UpdateMemberAccountPayload {
  @ApiProperty({ description: '会员 ID 列表', example: [1, 2, 3] })
  @IsNumber({}, { each: true, message: '会员 ID 必须为数字' })
  @IsNotEmpty({ message: '会员 ID 列表不能为空' })
  readonly memberIds: number[]

  @ApiProperty({ description: '账户类型', example: 'points' })
  @IsNotEmpty({ message: '账户类型不能为空' })
  readonly key: IMemberAccountKeys

  @ApiProperty({ description: '变更类型', enum: MemberAccountChangeType, example: 'add' })
  @IsEnum(MemberAccountChangeType, { message: '变更类型错误' })
  @IsNotEmpty({ message: '变更类型不能为空' })
  readonly type: IMemberAccountChangeType

  @ApiProperty({ description: '变化积分', example: 100 })
  @IsNumber({}, { message: '变化积分必须为数字' })
  @Min(0, { message: '变化积分不能小于 0' })
  readonly value: number

  @ApiProperty({ description: '变更原因', example: 'reason' })
  @IsNotEmpty({ message: '变更原因不能为空' })
  @IsString({ message: '变更原因必须为字符串' })
  readonly reason: string
}
