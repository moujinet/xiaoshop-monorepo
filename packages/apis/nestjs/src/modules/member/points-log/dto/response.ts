import { ApiProperty } from '@nestjs/swagger'
import type {
  IMemberPointsLogChangeType,
  IMemberPointsLogListItem,
} from '@xiaoshop/schema'

/**
 * 会员积分日志列表响应 DTO
 */
export class MemberPointsLogListResponse implements IMemberPointsLogListItem {
  @ApiProperty({ description: '日志 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '变更类型', example: 'set' })
  readonly type: IMemberPointsLogChangeType

  @ApiProperty({ description: '积分变化', example: 100 })
  readonly change: number

  @ApiProperty({ description: '变化后积分', example: 1000 })
  readonly points: number

  @ApiProperty({ description: '变化原因', example: '购买商品' })
  readonly reason: string

  @ApiProperty({ description: '发生时间' })
  readonly createdTime: string
}
