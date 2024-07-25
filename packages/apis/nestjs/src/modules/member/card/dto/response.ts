import {
  EnabledEnum,
  type IEnabled,
  type IMemberCard,
  type IMemberCardBinding,
  IMemberCardDict,
  type IMemberCardInfo,
  type IMemberCardPlan,
  type IMemberCardPlanInfo,
  type IMemberCardPlanType,
  type IMemberCardStyles,
  type IMemberCardType,
  type IMemberLevelCard,
  MemberCardPlanTypeEnum,
  MemberCardTypeEnum,
} from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员卡套餐响应 DTO
 */
export class MemberCardPlanResponse implements IMemberCardPlan {
  @ApiProperty({ description: '会员卡套餐 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员卡套餐类型', enum: MemberCardPlanTypeEnum, example: example.plans[0].type })
  readonly type: IMemberCardPlanType

  @ApiProperty({ description: '会员卡套餐有效期', example: example.plans[0].duration })
  readonly duration: number

  @ApiProperty({ description: '会员卡套餐价格', example: example.plans[0].price })
  readonly price: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string
}

/**
 * 获取会员卡响应 DTO
 */
export class MemberCardResponse implements IMemberCard {
  @ApiProperty({ description: '会员卡 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员卡类型', enum: MemberCardTypeEnum, example: example.type })
  readonly type: IMemberCardType

  @ApiProperty({ description: '会员卡状态', enum: EnabledEnum, example: example.isEnabled })
  readonly isEnabled: IEnabled

  @ApiProperty({ description: '会员卡标识', example: example.key })
  readonly key: string

  @ApiProperty({ description: '会员卡名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '会员卡描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ type: Object, description: '会员卡样式', example: example.styles })
  readonly styles: IMemberCardStyles

  @ApiProperty({ type: [MemberCardPlanResponse], description: '会员卡套餐', example: example.plans })
  readonly plans: IMemberCardPlan[]

  @ApiProperty({ description: '所需成长值', example: example.needExp })
  readonly needExp: number

  @ApiProperty({ type: 'float', description: '会员折扣', example: example.discount })
  readonly discount: number

  @ApiProperty({ type: 'float', description: '获得积分倍率', example: example.pointsRatio })
  readonly pointsRatio: number

  @ApiProperty({ description: '是否包邮 (N:否 Y:是)', enum: EnabledEnum, example: example.isFreeShipping })
  readonly isFreeShipping: IEnabled

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string
}

/**
 * 会员卡信息响应 DTO
 */
export class MemberCardInfoResponse
  extends OmitType(MemberCardResponse, ['plans', 'createdTime'])
  implements IMemberCardInfo {}

/**
 * 会员卡字典响应 DTO
 */
export class MemberCardDictResponse
  extends PickType(MemberCardResponse, ['id', 'type', 'name'])
  implements IMemberCardDict {}

/**
 * 会员等级信息响应 DTO
 */
export class MemberLevelCardResponse
  extends OmitType(MemberCardResponse, ['plans'])
  implements IMemberLevelCard {}

/**
 * 会员卡套餐信息响应 DTO
 */
export class MemberCardPlanInfoResponse
  extends OmitType(MemberCardPlanResponse, ['createdTime'])
  implements IMemberCardPlanInfo {}

/**
 * 绑定会员卡响应 DTO
 */
export class MemberCardBindingResponse implements IMemberCardBinding {
  @ApiProperty({ description: 'ID', example: 1 })
  readonly id: number

  @ApiProperty({ type: MemberCardInfoResponse, description: '会员卡' })
  readonly card: IMemberCardInfo

  @ApiProperty({ type: MemberCardPlanInfoResponse, description: '会员卡套餐' })
  readonly plan: IMemberCardPlanInfo

  @ApiProperty({ description: '会员卡使用次数', example: 10 })
  readonly times: number

  @ApiProperty({ type: 'datetime', description: '到期时间' })
  readonly dueTime: string

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  readonly createdTime: string
}
