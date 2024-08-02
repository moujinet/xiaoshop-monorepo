import {
  Enabled,
  type IEnabled,
  type IMemberCardPlanType,
  type IMemberCardStyles,
  MemberCardPlanType,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { card, plan } from './example'

/**
 * 会员卡样式 DTO
 */
export class MemberCardStylesPayload {
  @ApiProperty({ required: false, description: '会员卡图标', example: card.styles.icon })
  @IsString()
  @IsOptional()
  readonly icon: string

  @ApiProperty({ required: false, description: '文字颜色', example: card.styles.textColor })
  @IsString()
  @IsOptional()
  readonly textColor: string

  @ApiProperty({ required: false, description: '背景颜色', example: card.styles.bgColor })
  @IsString()
  @IsOptional()
  readonly bgColor: string

  @ApiProperty({ required: false, description: '背景图片', example: card.styles.bgImage })
  @IsString()
  @IsOptional()
  readonly bgImage: string
}

/**
 * 会员卡套餐 DTO
 */
export class MemberCardPlanPayload {
  @ApiProperty({ required: false, description: '会员卡套餐 ID', example: plan.id })
  @IsNumber()
  @IsOptional()
  readonly id: number

  @ApiProperty({ description: '会员卡类型', enum: MemberCardPlanType, example: plan.type })
  @IsEnum(MemberCardPlanType)
  @IsNotEmpty()
  readonly type: IMemberCardPlanType

  @ApiProperty({ description: '会员卡套餐有效期', example: plan.duration })
  @IsNumber()
  @IsOptional()
  readonly duration: number

  @ApiProperty({ description: '会员卡套餐价格', example: plan.price })
  @IsNumber()
  @IsOptional()
  readonly price: number
}

/**
 * 会员卡信息 DTO
 */
export class MemberCardPayload {
  @ApiProperty({ description: '会员卡名称', example: card.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ required: false, description: '会员卡描述', example: card.desc })
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, type: MemberCardStylesPayload, description: '会员卡样式', example: card.styles })
  @Type(() => MemberCardStylesPayload)
  @IsOptional()
  readonly styles: IMemberCardStyles

  @ApiProperty({ required: false, description: '所需成长值', example: card.needExp })
  @IsNumber()
  @IsOptional()
  readonly needExp: number

  @ApiProperty({ required: false, description: '会员折扣', example: card.discount })
  @IsNumber()
  @IsOptional()
  readonly discount: number

  @ApiProperty({ required: false, description: '获得积分倍率', example: card.pointsRatio })
  @IsNumber()
  @IsOptional()
  readonly pointsRatio: number

  @ApiProperty({ required: false, description: '是否包邮', enum: Enabled, example: card.isFreeShipping })
  @IsEnum(Enabled)
  @IsOptional()
  readonly isFreeShipping: IEnabled

  @ApiProperty({ required: false, description: '会员卡套餐', type: [MemberCardPlanPayload], example: card.plans })
  @ValidateNested()
  @Type(() => MemberCardPlanPayload)
  @IsOptional()
  readonly plans: MemberCardPlanPayload[]
}
