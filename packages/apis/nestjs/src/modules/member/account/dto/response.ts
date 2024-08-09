import type { IMemberAccountKeyValue } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 会员账户响应 DTO
 */
export class MemberAccountResponse implements IMemberAccountKeyValue {
  @ApiProperty({ description: '订单数', example: 0 })
  readonly orders: number

  @ApiProperty({ description: '消费金额', example: 0 })
  readonly orderAmount: number

  @ApiProperty({ description: '成长值', example: 0 })
  readonly exp: number

  @ApiProperty({ description: '积分', example: 0 })
  readonly points: number

  @ApiProperty({ description: '余额', example: 0 })
  readonly balance: number

  @ApiProperty({ description: '签到', example: 0 })
  readonly signIn: number

  @ApiProperty({ description: '登录次数', example: 0 })
  readonly login: number

  @ApiProperty({ description: '红包', example: 0 })
  readonly redPacket: number

  @ApiProperty({ description: '优惠券', example: 0 })
  readonly coupon: number
}
