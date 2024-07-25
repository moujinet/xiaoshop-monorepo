import type {
  IGoodsAttributeTemplate,
  IGoodsAttributeTemplateDict,
  IGoodsAttributeTemplateListItem,
  IGoodsAttributeTemplateOption,
} from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 获取商品参数模板响应 DTO
 */
export class GoodsAttributeTemplateResponse implements IGoodsAttributeTemplate {
  @ApiProperty({ description: '商品参数模板 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品参数模板名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品参数模板介绍', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '商品参数模板选项', example: example.options })
  readonly options: IGoodsAttributeTemplateOption[]

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 获取商品参数模板列表响应 DTO
 */
export class GoodsAttributeTemplateListResponse
  extends OmitType(GoodsAttributeTemplateResponse, ['options', 'createdTime'])
  implements IGoodsAttributeTemplateListItem {}

/**
 * 获取商品参数模板字典响应 DTO
 */
export class GoodsAttributeTemplateDictResponse
  extends PickType(GoodsAttributeTemplateResponse, ['id', 'name'])
  implements IGoodsAttributeTemplateDict {}
