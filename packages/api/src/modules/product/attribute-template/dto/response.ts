import type {
  IProductAttributeTemplate,
  IProductAttributeTemplateDict,
  IProductAttributeTemplateListItem,
  IProductAttributeTemplateOption,
} from '@xiaoshop/shared'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from './example'

export class ProductAttributeTemplateResponse implements IProductAttributeTemplate {
  @ApiProperty({ description: '商品参数模板 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品参数模板名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品参数模板介绍', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '商品参数模板选项', example: example.options })
  readonly options: IProductAttributeTemplateOption[]

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

export class ProductAttributeTemplateListResponse
  extends OmitType(ProductAttributeTemplateResponse, ['options', 'createdTime'] as const)
  implements IProductAttributeTemplateListItem {}

export class ProductAttributeTemplateDictResponse
  extends PickType(ProductAttributeTemplateResponse, ['id', 'name'] as const)
  implements IProductAttributeTemplateDict {}
