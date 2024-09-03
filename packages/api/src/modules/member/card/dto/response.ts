import type {
  IMemberCard,
  IMemberCardBadgeStyle,
  IMemberCardDict,
  IMemberCardPlan,
  IMemberCardStyle,
  IMemberCustomCardListItem,
  IMemberLevelCardListItem,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { card } from './example'

/**
 * 会员卡信息响应 DTO
 */
export class MemberCardResponse implements IMemberCard {
  @ApiProperty({ description: '会员卡 ID', example: card.id })
  readonly id: number

  @ApiProperty({ description: '会员卡类型', example: card.type })
  readonly type: MemberCardType

  @ApiProperty({ description: '会员卡状态', example: card.enable })
  readonly enable: YesOrNo

  @ApiProperty({ description: '会员卡标识', example: card.key })
  readonly key: string

  @ApiProperty({ description: '会员卡名称', example: card.name })
  readonly name: string

  @ApiProperty({ description: '会员卡描述', example: card.desc })
  readonly desc: string

  @ApiProperty({ description: '会员徽章样式', example: card.badgeStyle })
  readonly badgeStyle: IMemberCardBadgeStyle

  @ApiProperty({ description: '会员卡样式', example: card.cardStyle })
  readonly cardStyle: IMemberCardStyle

  @ApiProperty({ description: '会员卡套餐' })
  readonly plans: IMemberCardPlan[]

  @ApiProperty({ description: '所需成长值', example: card.needExp })
  readonly needExp: number

  @ApiProperty({ description: '会员数', example: 0 })
  readonly total: number

  @ApiProperty({ description: '会员折扣', example: card.discount })
  readonly discount: number

  @ApiProperty({ description: '获得积分倍率', example: card.pointsRatio })
  readonly pointsRatio: number

  @ApiProperty({ description: '是否包邮', example: card.freeShipping })
  readonly freeShipping: YesOrNo

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 会员卡等级列表响应 DTO
 */
export class MemberLevelListResponse
  extends PickType(MemberCardResponse, [
    'id',
    'type',
    'enable',
    'key',
    'name',
    'desc',
    'badgeStyle',
    'needExp',
    'discount',
    'pointsRatio',
    'freeShipping',
    'total',
  ] as const)
  implements IMemberLevelCardListItem {}

/**
 * 自定义会员卡列表响应 DTO
 */
export class MemberCustomCardListResponse
  extends MemberLevelListResponse
  implements IMemberCustomCardListItem {
  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 会员卡字典列表响应 DTO
 */
export class MemberCardDictResponse
  extends PickType(MemberCardResponse, [
    'id',
    'type',
    'name',
  ] as const)
  implements IMemberCardDict {}
