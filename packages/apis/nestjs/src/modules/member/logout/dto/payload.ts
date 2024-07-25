import { type IMemberSource, MemberSourceEnum } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { example } from './example'

/**
 * 创建会员注销申请 DTO
 */
export class MemberLogoutPayload {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber()
  readonly memberId: number

  @ApiProperty({ description: '注销来源', enum: MemberSourceEnum, example: example.source })
  @IsEnum(MemberSourceEnum)
  @IsNotEmpty()
  readonly source: IMemberSource

  @ApiProperty({ description: '会员账号', example: example.username })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ description: '会员昵称', example: example.nickname })
  @IsString()
  @IsNotEmpty()
  readonly nickname: string

  @ApiProperty({ description: '会员手机', example: example.mobile })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  readonly mobile: string

  @ApiProperty({ description: '注销原因', example: example.reason })
  @IsString()
  @IsNotEmpty()
  readonly reason: string
}
