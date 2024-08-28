import type {
  IMemberSource,
  IMemberUnregister,
  IMemberUnregisterStatus,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员注销申请信息响应 DTO
 */
export class MemberUnIMemberUnregisterResponse implements IMemberUnregister {
  @ApiProperty({ description: '会员注销申请 ID', example: example.id })
  readonly id: number

  @ApiProperty({ description: '注销状态', example: example.status })
  readonly status: IMemberUnregisterStatus

  @ApiProperty({ description: '注销来源', example: example.source })
  readonly source: IMemberSource

  @ApiProperty({ description: '会员 ID', example: example.memberId })
  readonly memberId: number

  @ApiProperty({ description: '会员账号', example: example.username })
  readonly username: string

  @ApiProperty({ description: '会员昵称', example: example.nickname })
  readonly nickname: string

  @ApiProperty({ description: '会员手机号', example: example.mobile })
  readonly mobile: string

  @ApiProperty({ description: '注销原因', example: example.reason })
  readonly reason: string

  @ApiProperty({ description: '申请时间', example: example.createdTime })
  readonly createdTime: string

  @ApiProperty({ description: '注销时间', example: example.unregisterTime })
  readonly unregisterTime: string
}
