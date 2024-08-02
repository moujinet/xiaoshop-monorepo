import {
  type IMemberGroupCondKey,
  type IMemberGroupCondOperator,
  type IMemberGroupCondition,
  MemberGroupCondKey,
  MemberGroupCondOperator,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { example } from './example'

/**
 * 会员群体 - 筛选条件 DTO
 */
export class MemberGroupConditionPayload implements IMemberGroupCondition {
  @ApiProperty({ description: '会员群体条件标识', enum: MemberGroupCondKey, example: example.conditions[0].key })
  @IsEnum(MemberGroupCondKey)
  @IsNotEmpty()
  readonly key: IMemberGroupCondKey

  @ApiProperty({ description: '会员群体条件运算符', enum: MemberGroupCondOperator, example: example.conditions[0].operator })
  @IsEnum(MemberGroupCondOperator)
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
 * 会员群体 DTO
 */
export class MemberGroupPayload {
  @ApiProperty({ description: '会员群体名称', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ required: false, description: '会员群体描述', example: example.desc })
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ type: [MemberGroupConditionPayload], description: '会员群体条件', example: example.conditions })
  @ValidateNested()
  @Type(() => MemberGroupConditionPayload)
  readonly conditions: IMemberGroupCondition[]
}
