import type {
  IMemberInfo,
  IPointsChangeLogListItem,
  IPointsChangeType,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { profile } from '@/member/profile/dto/example'

/**
 * 会员积分变更日志列表响应 DTO
 */
export class PointsChangeLogListResponse implements IPointsChangeLogListItem {
  @ApiProperty({ description: '日志 ID', example: example.id })
  readonly id: number

  @ApiProperty({ description: '会员 ID', example: profile })
  readonly member: IMemberInfo

  @ApiProperty({ description: '变更类型', example: example.type })
  readonly type: IPointsChangeType

  @ApiProperty({ description: '变化积分', example: example.change })
  readonly change: number

  @ApiProperty({ description: '变化后积分', example: example.points })
  readonly points: number

  @ApiProperty({ description: '变更原因', example: example.reason })
  readonly reason: string

  @ApiProperty({ description: '发生时间', example: example.createdTime })
  readonly createdTime: string
}
