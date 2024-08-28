import type {
  IMemberAccountChangeLog,
  IMemberAccountChangeLogListItem,
  IMemberAccountChangeLogMemberListItem,
  IMemberAccountChangeType,
  IMemberAccountInfo,
  IMemberAccountKeys,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'
import { MemberAccountInfoResponse } from '@/member/account/dto/response'

/**
 * 会员账户变更日志列表响应
 */
export class MemberAccountChangeLogResponse implements IMemberAccountChangeLog {
  @ApiProperty({ description: '日志 ID', example: example.id })
  readonly id: number

  @ApiProperty({ description: '会员 ID' })
  readonly memberId: number

  @ApiProperty({ description: '会员信息', type: MemberAccountInfoResponse })
  readonly member: IMemberAccountInfo

  @ApiProperty({ description: '变更账户', example: example.key })
  readonly key: IMemberAccountKeys

  @ApiProperty({ description: '变更类型', example: example.type })
  readonly type: IMemberAccountChangeType

  @ApiProperty({ description: '变更值', example: example.value })
  readonly value: number

  @ApiProperty({ description: '变更原因', example: example.reason })
  readonly reason: string

  @ApiProperty({ description: '发生时间', example: example.createdTime })
  readonly createdTime: string
}

/**
 * 会员积分变更日志列表响应 (全部)
 */
export class MemberAccountChangeLogListResponse
  extends PickType(MemberAccountChangeLogResponse, [
    'id',
    'member',
    'type',
    'key',
    'value',
    'reason',
    'createdTime',
  ]) implements IMemberAccountChangeLogListItem {}

/**
 * 会员积分变更日志列表响应 (会员)
 */
export class MemberAccountChangeLogMemberListResponse
  extends PickType(MemberAccountChangeLogResponse, [
    'id',
    'type',
    'key',
    'value',
    'reason',
    'createdTime',
  ]) implements IMemberAccountChangeLogMemberListItem {}
