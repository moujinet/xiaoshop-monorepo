import {
  type IMemberSource,
  MemberSource,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { example } from './example'

/**
 * 会员注销申请 DTO
 */
export class MemberLogoutPayload {
  @ApiProperty({ description: '注销来源', enum: MemberSource, example: example.source })
  @IsEnum(MemberSource)
  readonly source: IMemberSource

  @ApiProperty({ description: '会员 ID', example: example.memberId })
  @IsNumber()
  readonly memberId: number

  @ApiProperty({ description: '会员账号', example: example.username })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ description: '会员昵称', example: example.nickname })
  @IsString()
  @IsNotEmpty()
  readonly nickname: string

  @ApiProperty({ description: '会员手机号', example: example.mobile })
  @IsString()
  @IsNotEmpty()
  readonly mobile: string

  @ApiProperty({ description: '注销原因', example: example.reason })
  @IsString()
  @IsNotEmpty()
  readonly reason: string
}
