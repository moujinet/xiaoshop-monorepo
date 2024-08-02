import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'

/**
 * 获取会员积分规则请求 DTO
 */
export class GetMemberPointsRuleRequest {
  @ApiProperty({ description: '会员积分规则 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}
