import { ApiProperty } from '@nestjs/swagger'
import { IPointsRuleKey, PointsRuleKey } from '@xiaoshop/schema'
import { IsEnum, IsNotEmpty } from 'class-validator'

/**
 * 获取会员积分规则请求 DTO
 */
export class GetPointsRuleRequest {
  @ApiProperty({ description: '会员积分规则标识', enum: PointsRuleKey })
  @IsEnum(PointsRuleKey)
  @IsNotEmpty()
  readonly key: IPointsRuleKey
}
