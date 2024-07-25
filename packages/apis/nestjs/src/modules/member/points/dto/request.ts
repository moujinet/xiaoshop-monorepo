import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取积分规则请求 DTO
 */
export class GetMemberPointsRuleRequest {
  @ApiProperty({ description: '积分规则 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除积分规则请求 DTO
 */
export class DeleteMemberPointsRuleRequest {
  @ApiProperty({ description: '积分规则 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
