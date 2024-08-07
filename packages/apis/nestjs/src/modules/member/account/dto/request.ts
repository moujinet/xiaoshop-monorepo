import {
  type IMemberGender,
  type IMemberSource,
  type IMemberStatus,
  MemberGender,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { member } from './example'
import { PaginationQueryDto } from '~/common'

/**
 * 获取会员分页列表请求 DTO
 */
export class GetMemberPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '注册来源', example: member.source })
  @IsEnum(MemberSource)
  @IsOptional()
  readonly source: IMemberSource

  @ApiProperty({ required: false, description: '会员状态', example: member.status })
  @IsEnum(MemberStatus)
  @IsOptional()
  readonly status: IMemberStatus

  @ApiProperty({ required: false, description: '会员账号', example: member.username })
  @IsString()
  @IsOptional()
  readonly username: string

  @ApiProperty({ required: false, description: '会员昵称', example: member.nickname })
  @IsString()
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '会员手机号', example: member.mobile })
  @IsString()
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '会员卡号', example: member.cardNo })
  @IsString()
  @IsOptional()
  readonly cardNo: string

  @ApiProperty({ required: false, description: '会员性别', enum: MemberGender, example: member.gender })
  @IsEnum(MemberGender)
  @IsOptional()
  readonly gender: IMemberGender

  @ApiProperty({ required: false, description: '会员分组', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ required: false, description: '会员标签', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly tagId: number

  @ApiProperty({ required: false, description: '会员等级 IDS', example: [1, 2] })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly cardIds: number[]

  @ApiProperty({ required: false, description: '会员等级', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly cardId: number

  @ApiProperty({ required: false, description: '会员积分', example: '0,100' })
  @IsString()
  @IsOptional()
  readonly points: string

  @ApiProperty({ required: false, description: '成长值', example: '0,100' })
  @IsString()
  @IsOptional()
  readonly exp: string

  @ApiProperty({ required: false, description: '下单数量', example: '0,100' })
  @IsString()
  @IsOptional()
  readonly orders: string

  @ApiProperty({ required: false, description: '下单金额', example: '0,100' })
  @IsString()
  @IsOptional()
  readonly orderAmount: string

  @ApiProperty({ required: false, description: '最后登录', example: '2021-01-01,2021-01-01' })
  @IsString()
  @IsOptional()
  readonly lastLoginTime: string

  @ApiProperty({ required: false, description: '注册时间', example: '2021-01-01,2021-01-01' })
  @IsString()
  @IsOptional()
  readonly createdTime: string
}

/**
 * 会员请求 DTO
 */
export class GetMemberRequest {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  readonly id: number
}

/**
 * 删除会员请求 DTO
 */
export class DeleteMemberRequest {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number
}
