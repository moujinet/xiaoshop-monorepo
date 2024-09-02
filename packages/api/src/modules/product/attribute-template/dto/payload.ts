import {
  type IProductAttributeTemplateOption,
  type IProductAttributeTemplateOptionType,
  ProductAttributeTemplateOptionType,
} from '@xiaoshop/shared'
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { example } from './example'

export class ProductAttributeTemplateOptionPayload implements IProductAttributeTemplateOption {
  @ApiProperty({ description: '商品参数名称', example: example.options[0].name })
  @IsString({ message: '商品参数名称必须为字符串' })
  @IsNotEmpty({ message: '商品参数名称不能为空' })
  readonly name: string

  @ApiProperty({ enum: ProductAttributeTemplateOptionType, description: '商品参数选项类型', default: ProductAttributeTemplateOptionType.TEXT })
  @IsEnum(ProductAttributeTemplateOptionType, { message: '商品参数选项不正确' })
  @IsNotEmpty({ message: '商品参数选项不能为空' })
  readonly type: IProductAttributeTemplateOptionType

  @ApiProperty({ description: '商品参数选项', example: example.options[0].options })
  @IsString({ each: true, message: '商品参数选项必须为字符串数组' })
  @IsOptional()
  readonly options: string[]

  @ApiProperty({ description: '商品参数选项默认值', example: example.options[0].defaultValue })
  @IsString({ each: true, message: '商品参数选项默认值必须为字符串数组' })
  @IsOptional()
  readonly defaultValue: string[]
}

export class ProductAttributeTemplatePayload {
  @ApiProperty({ description: '商品参数模板名称', example: example.name })
  @IsNotEmpty({ message: '商品参数模板名称不能为空' })
  @IsString({ message: '商品参数模板名称必须为字符串' })
  readonly name: string

  @ApiProperty({ required: false, description: '商品参数模板介绍', example: example.desc })
  @IsString({ message: '商品参数模板介绍必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ description: '商品参数模板选项', example: example.options })
  @ValidateNested({ message: '商品参数模板选项不正确' })
  @Type(() => ProductAttributeTemplateOptionPayload)
  readonly options: IProductAttributeTemplateOption[]
}
