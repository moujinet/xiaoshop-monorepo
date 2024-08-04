import type {
  IEnabled,
  IMemberCard,
  IMemberCardDict,
  IMemberCardLevelListItem,
  IMemberCardListItem,
  IMemberCardPlan,
  IMemberCardStyles,
  IMemberCardType,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { card } from './example'

/**
 * 会员卡信息响应 DTO
 */
export class MemberCardResponse implements IMemberCard {
  @ApiProperty({ description: '会员卡 ID', example: card.id })
  readonly id: number

  @ApiProperty({ description: '会员卡类型', example: card.type })
  readonly type: IMemberCardType

  @ApiProperty({ description: '会员卡状态', example: card.isEnabled })
  readonly isEnabled: IEnabled

  @ApiProperty({ description: '会员卡标识', example: card.key })
  readonly key: string

  @ApiProperty({ description: '会员卡名称', example: card.name })
  readonly name: string

  @ApiProperty({ description: '会员卡描述', example: card.desc })
  readonly desc: string

  @ApiProperty({ description: '会员卡样式', example: card.styles })
  readonly styles: IMemberCardStyles

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

  @ApiProperty({ description: '是否包邮', example: card.isFreeShipping })
  readonly isFreeShipping: IEnabled

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 自定义会员卡列表响应 DTO
 */
export class MemberCardListResponse
  extends PickType(MemberCardResponse, [
    'id',
    'type',
    'isEnabled',
    'key',
    'name',
    'desc',
    'plans',
    'styles',
    'discount',
    'pointsRatio',
    'isFreeShipping',
    'total',
    'createdTime',
  ] as const)
  implements IMemberCardListItem {}

/**
 * 会员卡等级列表响应 DTO
 */
export class MemberCardLevelListResponse
  extends PickType(MemberCardResponse, [
    'id',
    'type',
    'isEnabled',
    'key',
    'name',
    'desc',
    'styles',
    'needExp',
    'discount',
    'pointsRatio',
    'isFreeShipping',
    'total',
  ] as const)
  implements IMemberCardLevelListItem {}

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
