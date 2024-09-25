import type {
  IMemberCardBadgeStyle,
  IMemberInfo,
  MemberCardType,
  MemberCardUpgradeMethod,
} from '@xiaoshop/shared'

import { IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString } from 'class-validator'

export class MemberCardUpgradePayload {
  @IsNumber({}, { message: '会员卡 ID 不正确' })
  readonly memberId: IMemberInfo['id']

  @IsNumber({}, { message: '会员卡 ID 不正确' })
  readonly cardId: number

  @IsNumber({}, { message: '会员卡套餐 ID 不正确' })
  readonly cardPlanId: number

  @IsString({ message: '会员卡标识不正确' })
  readonly key: string

  @IsNumber({}, { message: '会员卡类型不正确' })
  readonly type: MemberCardType

  @IsString({ message: '会员卡名称不正确' })
  readonly name: string

  @IsObject({ message: '会员卡卡片样式不正确' })
  @IsNotEmptyObject({}, { message: '会员卡卡片样式不能为空' })
  readonly badgeStyle: IMemberCardBadgeStyle

  @IsNumber({}, { message: '升级方式不正确' })
  @IsOptional()
  readonly method?: MemberCardUpgradeMethod

  @IsString({ message: '升级原因不正确' })
  @IsOptional()
  readonly reason?: string
}
