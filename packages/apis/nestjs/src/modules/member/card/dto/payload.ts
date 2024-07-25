import {
  EnabledEnum,
  type IEnabled,
  type IMemberCardPlanType,
  type IMemberCardStyles,
  MemberCardPlanTypeEnum,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { example } from './example'

/**
 * 会员卡套餐 DTO
 */
export class MemberCardPlanPayload {
  @ApiProperty({ required: false, description: '会员卡套餐类型', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly id: number

  @ApiProperty({ description: '会员卡套餐类型', enum: MemberCardPlanTypeEnum, example: example.plans[0].type })
  @IsEnum(MemberCardPlanTypeEnum)
  @IsNotEmpty()
  readonly type: IMemberCardPlanType

  @ApiProperty({ description: '会员卡套餐有效期', example: example.plans[0].duration })
  @IsInt()
  readonly duration: number

  @ApiProperty({ description: '会员卡套餐价格', example: example.plans[0].price })
  @IsNumber()
  readonly price: number
}

/**
 * 会员卡样式 DTO
 */
export class MemberCardStylesPayload implements IMemberCardStyles {
  @ApiProperty({ description: '会员卡文本颜色', example: example.styles.textColor })
  @IsString()
  @IsNotEmpty()
  readonly textColor: string

  @ApiProperty({ description: '会员卡背景颜色', example: example.styles.bgColor })
  @IsString()
  @IsNotEmpty()
  readonly bgColor: string

  @ApiProperty({ required: false, description: '会员卡背景图片', example: example.styles.bgImage })
  @IsString()
  @IsOptional()
  readonly bgImage: string
}

/**
 * 会员卡 DTO
 */
export class MemberCardPayload {
  @ApiProperty({ description: '会员卡名称', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ description: '会员卡描述', example: example.desc })
  @IsString()
  @IsNotEmpty()
  readonly desc: string

  @ApiProperty({ type: MemberCardStylesPayload, description: '会员卡样式', example: example.styles })
  @Type(() => MemberCardStylesPayload)
  readonly styles: MemberCardStylesPayload

  @ApiProperty({ required: false, type: [MemberCardPlanPayload], description: '会员卡套餐', example: example.plans })
  @ValidateNested()
  @Type(() => MemberCardPlanPayload)
  @IsOptional()
  readonly plans: MemberCardPlanPayload[]

  @ApiProperty({ description: '所需成长值', example: example.needExp })
  @IsInt()
  readonly needExp: number

  @ApiProperty({ type: 'float', description: '会员折扣', example: example.discount })
  @IsNumber()
  readonly discount: number

  @ApiProperty({ type: 'float', description: '获得积分倍率', example: example.pointsRatio })
  @IsNumber()
  readonly pointsRatio: number

  @ApiProperty({ description: '是否包邮 (N:否 Y:是)', enum: EnabledEnum, example: example.isFreeShipping })
  @IsEnum(EnabledEnum)
  @IsNotEmpty()
  readonly isFreeShipping: IEnabled
}
