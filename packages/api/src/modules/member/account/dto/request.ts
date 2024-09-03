import {
  MemberGender,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取会员分页列表请求 DTO
 */
export class GetMemberAccountPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '注册来源', example: example.source })
  @IsNumberString({}, { message: '注册来源错误' })
  @IsOptional()
  readonly source: MemberSource

  @ApiProperty({ required: false, description: '会员状态', example: example.status })
  @IsNumberString({}, { message: '会员状态错误' })
  @IsOptional()
  readonly status: MemberStatus

  @ApiProperty({ required: false, description: '会员账号', example: example.username })
  @IsString({ message: '会员账号必须为字符串' })
  @IsOptional()
  readonly username: string

  @ApiProperty({ required: false, description: '会员昵称', example: example.nickname })
  @IsString({ message: '会员昵称必须为字符串' })
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '会员手机号', example: example.mobile })
  @IsString({ message: '会员手机号必须为字符串' })
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '会员卡号', example: example.cardNo })
  @IsString({ message: '会员卡号必须为字符串' })
  @IsOptional()
  readonly cardNo: string

  @ApiProperty({ required: false, description: '会员性别', enum: MemberGender, example: example.gender })
  @IsNumberString({}, { message: '会员性别错误' })
  @IsOptional()
  readonly gender: MemberGender

  @ApiProperty({ required: false, description: '会员分组', example: 1 })
  @IsNumberString({}, { message: '会员分组 ID 必须为数字' })
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ required: false, description: '会员标签', example: 1 })
  @IsNumberString({}, { message: '会员标签 ID 必须为数字' })
  @IsOptional()
  readonly tagId: number

  @ApiProperty({ required: false, description: '会员等级', example: 1 })
  @IsNumberString({}, { message: '会员等级 ID 必须为数字' })
  @IsOptional()
  readonly cardId: number

  @ApiProperty({ required: false, description: '会员积分', example: '0,100' })
  @IsString({ message: '会员积分必须为字符串' })
  @IsOptional()
  readonly points: string

  @ApiProperty({ required: false, description: '成长值', example: '0,100' })
  @IsString({ message: '成长值必须为字符串' })
  @IsOptional()
  readonly exp: string

  @ApiProperty({ required: false, description: '下单数量', example: '0,100' })
  @IsString({ message: '下单数量必须为字符串' })
  @IsOptional()
  readonly orders: string

  @ApiProperty({ required: false, description: '下单金额', example: '0,100' })
  @IsString({ message: '下单金额必须为字符串' })
  @IsOptional()
  readonly orderAmount: string

  @ApiProperty({ required: false, description: '最后登录', example: '2021-01-01,2021-01-01' })
  @IsString({ message: '最后登录时间必须为字符串' })
  @IsOptional()
  readonly lastLoginTime: string

  @ApiProperty({ required: false, description: '注册时间', example: '2021-01-01,2021-01-01' })
  @IsString({ message: '注册时间必须为字符串' })
  @IsOptional()
  readonly createdTime: string
}

/**
 * 会员 ID GET 请求 DTO
 */
export class GetMemberAccountRequest {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumberString({}, { message: '会员 ID 必须为数字' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly id: number
}

/**
 * 会员 ID PUT 请求 DTO
 */
export class PutMemberAccountRequest {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber({}, { message: '会员 ID 必须为数字' })
  @IsNotEmpty({ message: '会员 ID 不能为空' })
  readonly id: number
}
