import {
  type IMemberLogoutStatus,
  type IMemberSource,
  MemberLogoutStatusEnum,
  MemberSourceEnum,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsMobilePhone, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { example } from './example'
import { PaginationQueryDto } from '~/common'

/**
 * 查询会员注销申请分页列表请求 DTO
 */
export class GetMemberLogoutPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '注销状态', enum: MemberLogoutStatusEnum, example: example.status })
  @IsEnum(MemberLogoutStatusEnum)
  @IsOptional()
  readonly status: IMemberLogoutStatus

  @ApiProperty({ required: false, description: '注销来源', enum: MemberSourceEnum, example: example.source })
  @IsEnum(MemberSourceEnum)
  @IsOptional()
  readonly source: IMemberSource

  @ApiProperty({ required: false, description: '会员账号', example: example.username })
  @IsString()
  @IsOptional()
  readonly username: string

  @ApiProperty({ required: false, description: '会员昵称', example: example.nickname })
  @IsString()
  @IsOptional()
  readonly nickname: string

  @ApiProperty({ required: false, description: '会员手机', example: example.mobile })
  @IsMobilePhone('zh-CN')
  @IsOptional()
  readonly mobile: string
}

/**
 * 获取会员注销申请请求 DTO
 */
export class GetMemberLogoutRequest {
  @ApiProperty({ description: '会员注销申请 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 审批会员注销申请请求 DTO
 */
export class ApproveMemberLogoutRequest {
  @ApiProperty({ description: '会员注销申请 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
