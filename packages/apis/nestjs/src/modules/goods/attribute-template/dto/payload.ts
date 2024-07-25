import {
  GoodsAttributeOptionTypeEnum,
  type IGoodsAttributeOptionType,
  type IGoodsAttributeTemplateOption,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { example } from './example'

/**
 * 商品参数模板请求 - 选项 DTO
 */
export class GoodsAttributeTemplateOptionPayload implements IGoodsAttributeTemplateOption {
  @ApiProperty({ description: '商品参数名称', example: example.options[0].name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ enum: GoodsAttributeOptionTypeEnum, description: '商品参数选项类型', example: example.options[0].type })
  @IsEnum(GoodsAttributeOptionTypeEnum)
  @IsNotEmpty()
  @IsString()
  readonly type: IGoodsAttributeOptionType

  @ApiProperty({ description: '商品参数选项', example: example.options[0].options })
  @IsString({ each: true })
  @IsOptional()
  readonly options: string[]

  @ApiProperty({ description: '商品参数选项默认值', example: example.options[0].defaultValue })
  @IsString({ each: true })
  @IsOptional()
  readonly defaultValue: string[]
}

/**
 * 商品参数模板请求 DTO
 */
export class GoodsAttributeTemplatePayload {
  @ApiProperty({ description: '商品参数模板名称', example: example.name })
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ required: false, description: '商品参数模板介绍', example: example.desc })
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ description: '商品参数模板选项', example: example.options })
  @ValidateNested()
  @Type(() => GoodsAttributeTemplateOptionPayload)
  readonly options: IGoodsAttributeTemplateOption[]
}
