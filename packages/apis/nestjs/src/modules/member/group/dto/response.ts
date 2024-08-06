import type {
  IMemberGroup,
  IMemberGroupCondition,
  IMemberGroupDict,
  IMemberGroupListItem,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员群体响应 DTO
 */
export class MemberGroupResponse implements IMemberGroup {
  @ApiProperty({ description: '会员群体 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '群体名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '群体描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '群体人数', example: 9999 })
  readonly total: number

  @ApiProperty({ description: '群体条件', example: example.conditions })
  readonly conditions: IMemberGroupCondition[]

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string

  @ApiProperty({ description: '刷新时间' })
  readonly refreshTime: string
}

/**
 * 会员群体字典响应 DTO
 */
export class MemberGroupDictResponse
  extends PickType(MemberGroupResponse, [
    'id',
    'name',
  ] as const)
  implements IMemberGroupDict {}

/**
 * 会员群体列表响应 DTO
 */
export class MemberGroupListResponse
  extends PickType(MemberGroupResponse, [
    'id',
    'name',
    'desc',
    'total',
    'updatedTime',
  ] as const)
  implements IMemberGroupListItem {}
