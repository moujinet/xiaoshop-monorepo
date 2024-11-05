import type { ProductAttributeOptionType } from './constants'

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
  values: string[]
}

/**
 * 商品参数模板
 */
export interface IProductAttributeTemplateInfo {
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
   */
  options: IProductAttributeTemplateOption[]
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
   */
  type: ProductAttributeOptionType
  /**
   * 选项值
   */
  options: string[]
  /**
   * 默认值
   */
  defaultValue: string[]
}

/**
 * 商品参数模板字典
 */
export type IProductAttributeTemplateDict = Pick<
  IProductAttributeTemplateInfo,
  | 'id'
  | 'name'
>

/**
 * 商品参数模板列表
 */
export type IProductAttributeTemplateList = Pick<
  IProductAttributeTemplateInfo,
  | 'id'
  | 'name'
  | 'desc'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
