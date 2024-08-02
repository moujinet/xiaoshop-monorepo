import { IMemberLogoutStatus, IMemberSource, MemberLogoutStatus, MemberSource } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator'
import { example } from './example'
import { PaginationQueryDto } from '~/common'

/**
 * 获取会员注销申请分页列表请求 DTO
 */
export class GetMemberLogoutPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '会员账号', example: example.username })
  @IsString()
  @IsOptional()
  readonly username: string

  @ApiProperty({ required: false, description: '会员手机号', example: example.mobile })
  @IsString()
  @IsOptional()
  readonly mobile: string

  @ApiProperty({ required: false, description: '会员昵称', example: example.nickname })
  @IsString()
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '申请状态', enum: MemberLogoutStatus, example: example.status })
  @IsEnum(MemberLogoutStatus)
  @IsOptional()
  readonly status: IMemberLogoutStatus

  @ApiProperty({ required: false, description: '注销来源', enum: MemberSource, example: example.source })
  @IsEnum(MemberSource)
  @IsOptional()
  readonly source: IMemberSource

  @ApiProperty({ required: false, description: '申请时间', example: '2022-01-01,2022-01-02' })
  @IsString()
  @IsOptional()
  readonly createdTime: string
}

/**
 * 获取会员注销申请请求 DTO
 */
export class GetMemberLogoutRequest {
  @ApiProperty({ description: '会员注销申请 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}
