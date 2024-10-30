import type { MemberGroupFilterKey, MemberGroupFilterOperator } from '@xiaoshop/shared'
import type { IMemberGroupFilterPayload, IMemberGroupInfoPayload } from '@/member/group/model/interface'

import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

/**
 * Member Group Filter Payload
 */
export class MemberGroupFilterPayload implements IMemberGroupFilterPayload {
  @IsString({ message: '条件名称不正确' })
  @IsNotEmpty({ message: '条件名称不能为空' })
  readonly name: string

  @IsNumber({}, { message: '条件标识不正确' })
  readonly key: MemberGroupFilterKey

  @IsNumber({}, { message: '运算符不正确' })
  readonly operator: MemberGroupFilterOperator

  @ArrayNotEmpty({ message: '条件值不正确' })
  readonly value: (string | number)[]
}

/**
 * Create Member Group
 */
export class CreateMemberGroupPayload implements IMemberGroupInfoPayload {
  @IsString({ message: '会员群体名称不正确' })
  @IsNotEmpty({ message: '会员群体名称不能为空' })
  readonly name: string

  @IsString({ message: '会员群体描述不正确' })
  @IsOptional()
  readonly desc?: string

  @Type(() => MemberGroupFilterPayload)
  @IsArray({ message: '会员群体筛选条件不正确' })
  @ArrayNotEmpty({ message: '会员群体筛选条件不能为空' })
  @ValidateNested({ each: true })
  readonly filters: MemberGroupFilterPayload[]
}

/**
 * Update Member Group
 */
export class UpdateMemberGroupPayload extends CreateMemberGroupPayload {
}
