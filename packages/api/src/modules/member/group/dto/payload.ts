import {
  type IMemberGroupCondition,
  MemberGroupCondKey,
  MemberGroupCondOperator,
} from '@xiaoshop/shared'
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { example } from './example'

/**
 * 会员群体 - 筛选条件 DTO
 */
export class MemberGroupConditionPayload implements IMemberGroupCondition {
  @ApiProperty({ description: '会员群体条件标识', enum: MemberGroupCondKey, example: example.conditions[0].key })
  @IsEnum(MemberGroupCondKey, { message: '会员群体条件标识不正确' })
  readonly key: MemberGroupCondKey

  @ApiProperty({ description: '会员群体条件运算符', enum: MemberGroupCondOperator, example: example.conditions[0].operator })
  @IsEnum(MemberGroupCondOperator, { message: '会员群体条件运算符不正确' })
  readonly operator: MemberGroupCondOperator

  @ApiProperty({ description: '会员群体条件名', example: example.conditions[0].name })
  @IsString({ message: '会员群体条件名称必须为字符串' })
  @IsNotEmpty({ message: '会员群体条件名称不能为空' })
  readonly name: string

  @ApiProperty({ description: '会员群体条件值', example: example.conditions[0].value })
  @IsNotEmpty({ each: true, message: '会员群体条件值不能为空' })
  readonly value: Array<string | number>
}

/**
 * 会员群体 DTO
 */
export class MemberGroupPayload {
  @ApiProperty({ description: '会员群体名称', example: example.name })
  @IsString({ message: '会员群体名称必须为字符串' })
  @IsNotEmpty({ message: '会员群体名称不能为空' })
  readonly name: string

  @ApiProperty({ required: false, description: '会员群体描述', example: example.desc })
  @IsString({ message: '会员群体描述必须为字符串' })
  @IsOptional({ message: '会员群体描述不能为空' })
  readonly desc: string

  @ApiProperty({ type: [MemberGroupConditionPayload], description: '会员群体条件', example: example.conditions })
  @ValidateNested({ message: '会员群体条件不正确' })
  @Type(() => MemberGroupConditionPayload)
  readonly conditions: IMemberGroupCondition[]
}
