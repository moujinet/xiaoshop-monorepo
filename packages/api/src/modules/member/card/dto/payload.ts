import {
  type IMemberCardBadgeStyle,
  type IMemberCardPlanType,
  type IMemberCardStyle,
  type IYesOrNo,
  MemberCardPlanType,
  YesOrNo,
} from '@xiaoshop/shared'
import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { card, plan } from './example'

/**
 * 会员徽章样式 DTO
 */
export class MemberCardBadgePayload implements Partial<IMemberCardBadgeStyle> {
  @ApiProperty({ required: false, description: '会员卡图标', example: card.badgeStyle.icon })
  @IsString({ message: '会员卡图标必须为字符串' })
  @IsOptional()
  readonly icon: string

  @ApiProperty({ required: false, description: '文字颜色', example: card.badgeStyle.textColor })
  @IsString({ message: '文字颜色必须为字符串' })
  @IsHexColor({ message: '文字颜色必须为十六进制颜色' })
  @IsOptional()
  readonly textColor: string

  @ApiProperty({ required: false, description: '背景颜色', example: card.badgeStyle.bgColor })
  @IsString({ message: '背景颜色必须为字符串' })
  @IsHexColor({ message: '背景颜色必须为十六进制颜色' })
  @IsOptional()
  readonly bgColor: string
}

/**
 * 会员卡样式 DTO
 */
export class MemberCardStylesPayload implements Partial<IMemberCardStyle> {
  @ApiProperty({ required: false, description: '会员卡图标', example: card.cardStyle.icon })
  @IsString({ message: '会员卡图标必须为字符串' })
  @IsOptional()
  readonly icon: string

  @ApiProperty({ required: false, description: '文字颜色', example: card.cardStyle.textColor })
  @IsString({ message: '文字颜色必须为字符串' })
  @IsHexColor({ message: '文字颜色必须为十六进制颜色' })
  @IsOptional()
  readonly textColor: string

  @ApiProperty({ required: false, description: '背景颜色', example: card.cardStyle.bgColor })
  @IsString({ message: '背景颜色必须为字符串' })
  @IsHexColor({ message: '背景颜色必须为十六进制颜色' })
  @IsOptional()
  readonly bgColor: string

  @ApiProperty({ required: false, description: '背景图片', example: card.cardStyle.bgImage })
  @IsString({ message: '背景图片必须为字符串' })
  @IsOptional()
  readonly bgImage: string
}

/**
 * 会员卡套餐 DTO
 */
export class MemberCardPlanPayload {
  @ApiProperty({ required: false, description: '会员卡套餐 ID', example: plan.id })
  @IsNumber({}, { message: '会员卡套餐 ID 必须为数字' })
  @IsOptional()
  readonly id: number

  @ApiProperty({ description: '会员卡类型', enum: MemberCardPlanType, example: plan.type })
  @IsEnum(MemberCardPlanType, { message: '会员卡类型必须为枚举值' })
  @IsNotEmpty({ message: '会员卡类型必填' })
  readonly type: IMemberCardPlanType

  @ApiProperty({ description: '会员卡套餐有效期', example: plan.due })
  @IsNumber({}, { message: '会员卡套餐有效期必须为数字' })
  @IsOptional()
  readonly due: number

  @ApiProperty({ description: '会员卡套餐价格', example: plan.price })
  @IsNumber({}, { message: '会员卡套餐价格必须为数字' })
  @IsOptional()
  readonly price: number
}

/**
 * 会员卡信息 DTO
 */
export class MemberCardPayload {
  @ApiProperty({ description: '会员卡名称', example: card.name })
  @IsString({ message: '会员卡名称必须为字符串' })
  @IsNotEmpty({ message: '会员卡名称必填' })
  readonly name: string

  @ApiProperty({ required: false, description: '会员卡描述', example: card.desc })
  @IsString({ message: '会员卡描述必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, type: MemberCardBadgePayload, description: '会员徽章样式', example: card.badgeStyle })
  @Type(() => MemberCardBadgePayload)
  @IsOptional()
  readonly badgeStyle: IMemberCardBadgeStyle

  @ApiProperty({ required: false, type: MemberCardStylesPayload, description: '会员卡样式', example: card.cardStyle })
  @Type(() => MemberCardStylesPayload)
  @IsOptional()
  readonly cardStyle: IMemberCardStyle

  @ApiProperty({ required: false, description: '所需成长值', example: card.needExp })
  @IsNumber({}, { message: '所需成长值必须为数字' })
  @IsOptional()
  readonly needExp: number

  @ApiProperty({ required: false, description: '会员折扣', example: card.discount })
  @IsNumber({}, { message: '会员折扣必须为数字' })
  @IsOptional()
  readonly discount: number

  @ApiProperty({ required: false, description: '获得积分倍率', example: card.pointsRatio })
  @IsNumber({}, { message: '获得积分倍率必须为数字' })
  @IsOptional()
  readonly pointsRatio: number

  @ApiProperty({ required: false, description: '是否包邮', enum: YesOrNo, example: card.freeShipping })
  @IsEnum(YesOrNo, { message: '是否包邮必须为枚举值' })
  @IsOptional()
  readonly freeShipping: IYesOrNo

  @ApiProperty({ required: false, description: '会员卡有效期', type: [MemberCardPlanPayload], example: card.plans })
  @ValidateNested({ message: '会员卡套餐必须为数组' })
  @Type(() => MemberCardPlanPayload)
  @IsOptional()
  readonly plans: MemberCardPlanPayload[]
}
