import type { ProductAttributeTemplateOptionType } from './constants'

/**
 * 商品参数信息
 */
export interface IProductAttribute {
  /**
   * 参数名
   */
  name: string
  /**
   * 参数值
   */
  value: string[]
}

/**
 * 商品参数模板
 */
export interface IProductAttributeTemplate {
  /**
   * 参数模板 ID
   */
  id: number
  /**
   * 参数模板名称
   */
  name: string
  /**
   * 参数模板描述
   */
  desc: string
  /**
   * 参数模板选项
   *
   * @see {@link IProductAttributeTemplateOption}
   */
  options: IProductAttributeTemplateOption[]
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 商品参数模板选项
 */
export interface IProductAttributeTemplateOption {
  /**
   * 选项名称
   */
  name: string
  /**
   * 选项类型
   *
   * @see {@link ProductAttributeTemplateOptionType}
   */
  type: ProductAttributeTemplateOptionType
  /**
   * 选项值
   */
  options: string[]
  /**
   * 默认值
   */
  defaultValue: string | string[]
}

/**
 * 商品参数模板字典
 *
 * @see {@link IProductAttributeTemplate}
 */
export type IProductAttributeTemplateDict = Pick<
  IProductAttributeTemplate,
  | 'id'
  | 'name'
>

/**
 * 商品参数模板列表
 *
 * @see {@link IProductAttributeTemplate}
 */
export type IProductAttributeTemplateListItem = Pick<
  IProductAttributeTemplate,
  | 'id'
  | 'name'
  | 'desc'
  | 'updatedTime'
>
