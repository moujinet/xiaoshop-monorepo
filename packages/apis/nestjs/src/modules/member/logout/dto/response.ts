import {
  type IMemberLogout,
  type IMemberLogoutStatus,
  type IMemberSource,
  MemberLogoutStatusEnum,
  MemberSourceEnum,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 获取会员标签响应 DTO
 */
export class MemberLogoutResponse implements IMemberLogout {
  @ApiProperty({ description: '会员标签 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员 ID', example: 1 })
  readonly memberId: number

  @ApiProperty({ description: '注销状态', enum: MemberLogoutStatusEnum, example: example.status })
  readonly status: IMemberLogoutStatus

  @ApiProperty({ description: '注销来源', enum: MemberSourceEnum, example: example.source })
  readonly source: IMemberSource

  @ApiProperty({ description: '会员账号', example: example.username })
  readonly username: string

  @ApiProperty({ description: '会员昵称', example: example.nickname })
  readonly nickname: string

  @ApiProperty({ description: '会员手机', example: example.mobile })
  readonly mobile: string

  @ApiProperty({ description: '注销原因', example: example.reason })
  readonly reason: string

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '注销时间' })
  readonly logoutTime: string
}
