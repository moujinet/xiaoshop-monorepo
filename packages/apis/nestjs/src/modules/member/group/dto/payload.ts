import {
  type IMemberGroupCondKey,
  type IMemberGroupCondOperator,
  type IMemberGroupCondition,
  MemberGroupCondKeyEnum,
  MemberGroupCondOperatorEnum,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { example } from './example'

/**
 * 会员群体筛选条件 DTO
 */
export class MemberGroupConditionPayload implements IMemberGroupCondition {
  @ApiProperty({ description: '会员群体条件标识', enum: MemberGroupCondKeyEnum, example: example.conditions[0].key })
  @IsEnum(MemberGroupCondKeyEnum)
  @IsNotEmpty()
  readonly key: IMemberGroupCondKey

  @ApiProperty({ description: '会员群体条件运算符', enum: MemberGroupCondOperatorEnum, example: example.conditions[0].operator })
  @IsEnum(MemberGroupCondOperatorEnum)
  @IsNotEmpty()
  readonly operator: IMemberGroupCondOperator

  @ApiProperty({ description: '会员群体条件名', example: example.conditions[0].name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ description: '会员群体条件值', example: example.conditions[0].value })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly value: string[]
}

/**
 * 创建会员群体 DTO
 */
export class MemberGroupPayload {
  @ApiProperty({ description: '群体名称', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ description: '群体描述', example: example.desc })
  @IsString()
  @IsNotEmpty()
  readonly desc: string

  @ApiProperty({ type: [MemberGroupConditionPayload], description: '群体条件', example: example.conditions })
  @ValidateNested()
  @Type(() => MemberGroupConditionPayload)
  readonly conditions: IMemberGroupCondition[]
}
