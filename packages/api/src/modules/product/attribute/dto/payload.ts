import type { IProductAttributeTemplateOption, ProductAttributeOptionType } from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

/**
 * Product Attribute Template Option Payload
 */
export class ProductAttributeTemplateOptionPayload implements IProductAttributeTemplateOption {
  @IsString({ message: '参数选项名称不正确' })
  @IsNotEmpty({ message: '参数选项名称不能为空' })
  readonly name: string

  @IsNumber({}, { message: '参数选项类型不正确' })
  @IsNotEmpty({ message: '参数选项类型不能为空' })
  readonly type: ProductAttributeOptionType

  @IsString({ each: true, message: '参数选项值不正确' })
  @IsArray({ message: '参数选项值不正确' })
  @ArrayNotEmpty({ message: '参数选项值不能为空' })
  readonly options: string[]

  @IsString({ each: true, message: '参数选项默认值不正确' })
  @IsArray({ message: '参数选项默认值不正确' })
  @ArrayNotEmpty({ message: '参数选项默认值不能为空' })
  readonly defaultValue: string[]
}

/**
 * Create Product Attribute Template
 */
export class CreateProductAttributeTemplatePayload {
  @IsString({ message: '参数模板名称不正确' })
  @IsNotEmpty({ message: '参数模板名称不能为空' })
  readonly name: string

  @IsString({ message: '参数模板描述不正确' })
  @IsOptional()
  readonly desc?: string

  @Type(() => ProductAttributeTemplateOptionPayload)
  @IsArray({ message: '参数模板选项不正确' })
  @ArrayNotEmpty({ message: '参数模板选项不能为空' })
  @ValidateNested({ each: true })
  readonly options: ProductAttributeTemplateOptionPayload[]
}

/**
 * Update Product Attribute Template
 */
export class UpdateProductAttributeTemplatePayload extends CreateProductAttributeTemplatePayload {}
