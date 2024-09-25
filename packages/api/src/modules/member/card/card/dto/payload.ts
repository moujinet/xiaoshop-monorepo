import type {
  IDict,
  IMemberCardBadgeStyle,
  IMemberCardPlanInfo,
  IMemberCardStyle,
  YesOrNo,
} from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

export class MemberCardStylePayload implements IMemberCardStyle {
  @IsString({ message: '卡片图片不正确' })
  @IsOptional()
  readonly image: string

  @IsString({ message: '卡片图标不正确' })
  @IsOptional()
  readonly icon: string

  @IsString({ message: '卡片文字颜色不正确' })
  @IsOptional()
  readonly textColor: string

  @IsString({ message: '卡片背景颜色不正确' })
  @IsOptional()
  readonly bgColor: string

  @IsString({ message: '卡片背景图片不正确' })
  @IsOptional()
  readonly bgImage: string
}

export class MemberCardBadgeStylePayload implements IMemberCardBadgeStyle {
  @IsString({ message: '徽章图片不正确' })
  @IsOptional()
  readonly image: string

  @IsString({ message: '徽章图标不正确' })
  @IsOptional()
  readonly icon: string

  @IsString({ message: '徽章文字颜色不正确' })
  @IsOptional()
  readonly textColor: string

  @IsString({ message: '徽章背景颜色不正确' })
  @IsOptional()
  readonly bgColor: string
}

export class MemberCardPlanPayload implements IMemberCardPlanInfo {
  @IsNumber({}, { message: '套餐 ID 不正确' })
  readonly id: number

  @IsObject({ message: '套餐类型不正确' })
  @IsNotEmptyObject({}, { message: '套餐类型不能为空' })
  readonly type: IDict

  @IsNumber({}, { message: '有效期不正确' })
  readonly due: number

  @IsNumber({}, { message: '价格不正确' })
  readonly price: number
}

export class MemberCardPayload {
  @IsNumber({}, { message: '启用状态不正确' })
  @IsOptional()
  readonly isEnabled?: YesOrNo

  @IsString({ message: '会员等级名称不正确' })
  @IsNotEmpty({ message: '会员等级名称不能为空' })
  readonly name: string

  @IsString({ message: '会员等级描述不正确' })
  @IsOptional()
  readonly desc?: string

  @Type(() => MemberCardStylePayload)
  @IsObject({ message: '会员卡卡片样式不正确' })
  @IsNotEmptyObject({}, { message: '会员卡卡片样式不能为空' })
  @IsOptional()
  readonly cardStyle: MemberCardStylePayload

  @Type(() => MemberCardBadgeStylePayload)
  @IsObject({ message: '会员卡徽章样式不正确' })
  @IsNotEmptyObject({}, { message: '会员卡徽章样式不能为空' })
  @IsOptional()
  readonly badgeStyle: MemberCardBadgeStylePayload

  @IsNumber({}, { message: '升级所需经验值不正确' })
  readonly needExp: number

  @IsNumber({}, { message: '升级折扣率不正确' })
  readonly discount: number

  @IsNumber({}, { message: '积分折扣率不正确' })
  readonly pointsRatio: number

  @IsNumber({}, { message: '是否免运费不正确' })
  @IsOptional()
  readonly isFreeShipping?: YesOrNo

  @ValidateNested()
  @Type(() => MemberCardPlanPayload)
  @IsObject({ each: true, message: '会员卡套餐信息不正确' })
  @IsArray({ message: '会员卡套餐信息不正确' })
  @ArrayNotEmpty({ message: '会员卡套餐信息不能为空' })
  readonly plans: MemberCardPlanPayload[]
}

export class MemberCardStatusPayload {
  @IsNumber({}, { message: '启用状态不正确' })
  readonly isEnabled: YesOrNo
}
