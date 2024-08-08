import {
  type IMemberAccountKey,
  MemberAccountKey,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { account } from '../example'

/**
 * 会员账户响应 DTO
 */
export class MemberAccountResponse {
  @ApiProperty({ description: '账户标识', enum: MemberAccountKey, example: account.key })
  readonly key: IMemberAccountKey

  @ApiProperty({ description: '账户名', example: account.name })
  readonly name: string

  @ApiProperty({ description: '账户值', example: account.value })
  readonly value: number
}

/**
 * 会员账户列表
 */
export class MemberAccountListResponse {
  @ApiProperty({ description: '订单数', example: 0 })
  readonly orders: number

  @ApiProperty({ description: '消费金额', example: 0 })
  readonly order_amount: number

  @ApiProperty({ description: '成长值', example: 0 })
  readonly exp: number

  @ApiProperty({ description: '积分', example: 0 })
  readonly points: number

  @ApiProperty({ description: '余额', example: 0 })
  readonly balance: number

  @ApiProperty({ description: '签到', example: 0 })
  readonly sign_in: number

  @ApiProperty({ description: '登录次数', example: 0 })
  readonly login: number

  @ApiProperty({ description: '红包', example: 0 })
  readonly red_packet: number

  @ApiProperty({ description: '优惠券', example: 0 })
  readonly coupon: number
}
