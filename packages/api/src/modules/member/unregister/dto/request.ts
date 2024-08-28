import {
  type IMemberSource,
  type IMemberUnregisterStatus,
  MemberSource,
  MemberUnregisterStatus,
} from '@xiaoshop/shared'
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { PaginationRequest } from '~/common/dto'

/**
 * 获取会员注销申请分页列表请求 DTO
 */
export class GetMemberUnregisterPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '会员账号', example: example.username })
  @IsString({ message: '会员账号必须是字符串' })
  @IsOptional()
  readonly username: string

  @ApiProperty({ required: false, description: '会员手机号', example: example.mobile })
  @IsString({ message: '会员手机号必须是字符串' })
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '会员昵称', example: example.nickname })
  @IsString({ message: '会员昵称必须是字符串' })
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '申请状态', enum: MemberUnregisterStatus, example: example.status })
  @IsEnum(MemberUnregisterStatus, { message: '申请状态不正确' })
  @IsOptional()
  readonly status: IMemberUnregisterStatus

  @ApiProperty({ required: false, description: '注销来源', enum: MemberSource, example: example.source })
  @IsEnum(MemberSource, { message: '注销来源不正确' })
  @IsOptional()
  readonly source: IMemberSource

  @ApiProperty({ required: false, description: '申请时间', example: '2022-01-01,2022-01-02' })
  @IsString({ message: '申请时间格式不正确' })
  @IsOptional()
  readonly createdTime: string
}

/**
 * 获取会员注销申请请求 DTO
 */
export class GetMemberUnregisterRequest {
  @ApiProperty({ description: '会员注销申请 ID', example: 1 })
  @IsNumberString({}, { message: '会员注销申请 ID 必须是数字' })
  readonly id: number
}
