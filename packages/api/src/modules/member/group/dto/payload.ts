import type {
  IMemberGroupFilter,
  MemberGroupFilterKey,
  MemberGroupFilterOperator,
} from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class MemberGroupFilterPayload implements IMemberGroupFilter {
  @IsNumber({}, { message: '筛选条件标识不正确' })
  readonly key: MemberGroupFilterKey

  @IsNumber({}, { message: '筛选条件运算符不正确' })
  readonly operator: MemberGroupFilterOperator

  @IsString({ message: '筛选条件名称不正确' })
  @IsNotEmpty({ message: '筛选条件名称不能为空' })
  readonly name: string

  @ArrayNotEmpty({ message: '筛选条件值不正确' })
  readonly value: (string | number)[]
}

export class MemberGroupPayload {
  @IsString({ message: '会员群体名称不正确' })
  @IsNotEmpty({ message: '会员群体名称不能为空' })
  readonly name: string

  @IsString({ message: '会员群体描述不正确' })
  @IsOptional()
  readonly desc?: string

  @ValidateNested()
  @Type(() => MemberGroupFilterPayload)
  @ArrayNotEmpty({ message: '会员群体筛选条件不正确' })
  readonly filters: MemberGroupFilterPayload[]
}
