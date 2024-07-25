import {
  type IMemberGroup,
  type IMemberGroupCondKey,
  type IMemberGroupCondOperator,
  type IMemberGroupCondition,
  type IMemberGroupDict,
  MemberGroupCondKeyEnum,
  MemberGroupCondOperatorEnum,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员群体筛选条件响应 DTO
 */
export class MemberGroupConditionResponse implements IMemberGroupCondition {
  @ApiProperty({ description: '会员群体条件标识', enum: MemberGroupCondKeyEnum, example: example.conditions[0].key })
  readonly key: IMemberGroupCondKey

  @ApiProperty({ description: '会员群体条件运算符', enum: MemberGroupCondOperatorEnum, example: example.conditions[0].operator })
  readonly operator: IMemberGroupCondOperator

  @ApiProperty({ description: '会员群体条件名', example: example.conditions[0].name })
  readonly name: string

  @ApiProperty({ description: '会员群体条件值', example: example.conditions[0].value })
  readonly value: string[]
}

/**
 * 获取会员群体响应 DTO
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
 * 会员群体关联响应 DTO
 */
export class MemberGroupRelationResponse
  extends PickType(MemberGroupResponse, ['id', 'name'])
  implements IMemberGroupDict {}
