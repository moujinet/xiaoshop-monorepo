import type {
  ILocationPath,
  IMemberAccountInfo,
  IMemberAccountListItem,
  IMemberBindingInfo,
  IMemberGroupDict,
  IMemberLoginInfo,
  IMemberProfile,
  IMemberTagDict,
  MemberGender,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员账号响应 DTO
 *
 * @see {@link IMemberProfile}
 */
export class MemberProfileResponse implements IMemberProfile {
  @ApiProperty({ description: '会员 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员状态', example: example.status })
  readonly status: MemberStatus

  @ApiProperty({ description: '注册来源', example: example.source })
  readonly source: MemberSource

  @ApiProperty({ description: '会员分组', example: example.group })
  readonly group: IMemberGroupDict

  @ApiProperty({ description: '会员标签', example: example.tags })
  readonly tags: IMemberTagDict[]

  @ApiProperty({ description: '绑定会员卡', example: example.card })
  readonly card: IMemberBindingInfo

  @ApiProperty({ description: '会员卡号', example: example.cardNo })
  readonly cardNo: string

  @ApiProperty({ description: '会员头像', example: example.avatar })
  readonly avatar: string

  @ApiProperty({ description: '会员账号', example: example.username })
  readonly username: string

  @ApiProperty({ description: '会员昵称', example: example.nickname })
  readonly nickname: string

  @ApiProperty({ description: '会员手机号', example: example.mobile })
  readonly mobile: string

  @ApiProperty({ description: '会员生日', example: example.birthday })
  readonly birthday: string

  @ApiProperty({ description: '会员性别', example: example.gender })
  readonly gender: MemberGender

  @ApiProperty({ description: '会员地址', example: example.location })
  readonly location: ILocationPath

  @ApiProperty({ description: '会员积分', example: example.points })
  readonly points: number

  @ApiProperty({ description: '账户余额', example: example.balance })
  readonly orders: number

  @ApiProperty({ description: '累计消费', example: example.orderAmount })
  readonly orderAmount: number

  @ApiProperty({ description: '成长值', example: example.exp })
  readonly exp: number

  @ApiProperty({ description: '红包', example: example.redPacket })
  readonly balance: number

  @ApiProperty({ description: '优惠券', example: example.coupon })
  readonly redPacket: number

  @ApiProperty({ description: '会签到次数', example: example.signInTimes })
  readonly coupon: number

  @ApiProperty({ description: '注册时间' })
  readonly createdTime: string

  @ApiProperty({ description: '最后登录时间' })
  readonly lastLoginTime: string

  @ApiProperty({ description: '最后消费时间' })
  readonly lastOrderTime: string

  @ApiProperty({ description: '最后签到时间' })
  readonly lastSignInTime: string
}

/**
 * 会员账户信息响应 DTO
 *
 * @see {@link IMemberAccountInfo}
 */
export class MemberAccountInfoResponse
  extends PickType(
    MemberProfileResponse,
    [
      'id',
      'status',
      'tags',
      'group',
      'card',
      'cardNo',
      'avatar',
      'nickname',
      'gender',
      'birthday',
      'location',
    ] as const,
  )
  implements IMemberAccountInfo {}

/**
 * 会员账号列表响应 DTO
 *
 * @see {@link IMemberAccountListItem}
 */
export class MemberAccountListResponse extends MemberAccountInfoResponse implements IMemberAccountListItem {
  @ApiProperty({ description: '注册来源', example: example.source })
  readonly source: MemberSource

  @ApiProperty({ description: '会员积分', example: example.points })
  readonly points: number

  @ApiProperty({ description: '订单数', example: example.orders })
  readonly orders: number

  @ApiProperty({ description: '消费金额', example: example.orderAmount })
  readonly orderAmount: number

  @ApiProperty({ description: '最后登录时间' })
  readonly lastLoginTime: string
}

/**
 * 登录会员账户信息 DTO
 *
 * @see {@link IMemberLoginInfo}
 */
export class MemberLoginInfoResponse extends MemberAccountInfoResponse implements IMemberLoginInfo {
  @ApiProperty({ description: '用户名', example: example.username })
  readonly username: string

  @ApiProperty({ description: '会员成长值', example: example.exp })
  readonly exp: number

  @ApiProperty({ description: '会员积分', example: example.points })
  readonly points: number

  @ApiProperty({ description: '账户余额', example: example.balance })
  readonly balance: number

  @ApiProperty({ description: '订单数', example: example.orders })
  readonly orders: number

  @ApiProperty({ description: '消费金额', example: example.orderAmount })
  readonly orderAmount: number

  @ApiProperty({ description: '红包数量', example: example.redPacket })
  readonly redPacket: number

  @ApiProperty({ description: '优惠券数量', example: example.coupon })
  readonly coupon: number

  @ApiProperty({ description: '最后登录时间' })
  readonly lastLoginTime: string
}
