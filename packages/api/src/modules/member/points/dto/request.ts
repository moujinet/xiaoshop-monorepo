import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { type IMemberPointsRuleKey, MemberPointsRuleKey } from '@xiaoshop/shared'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Get Member Points Rule
 */
export class GetMemberPointsRuleRequest {
  @IsEnum(MemberPointsRuleKey, { message: '会员积分规则标识不正确' })
  @IsNotEmpty({ message: '会员积分规则标识不能为空' })
  readonly key: IMemberPointsRuleKey
}

/**
 * Query Member Points Change Pages
 */
export class GetMemberPointsChangePagesRequest extends PaginationDto {
  @IsString({ message: '会员积分规则标识不正确' })
  @IsOptional()
  readonly createdTime?: string
}
