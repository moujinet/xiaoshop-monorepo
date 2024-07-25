import type { IGoodsAttributeOptionType } from '@/goods/types'

/**
 * 商品参数模板
 */
export interface IGoodsAttributeTemplate {
  /**
   * 商品参数模板编号
   */
  id: number
  /**
   * 商品参数模板名称
   */
  name: string
  /**
   * 商品参数模板描述
   */
  desc: string
  /**
   * 模板参数选项
   */
  options: IGoodsAttributeTemplateOption[]
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
 * 商品参数模板参数选项
 */
export interface IGoodsAttributeTemplateOption {
  /**
   * 商品参数名称
   */
  name: string
  /**
   * 商品参数选项类型
   *
   * @see {@link IGoodsAttributeOptionType}
   */
  type: IGoodsAttributeOptionType
  /**
   * 商品参数选项
   */
  options: string[]
  /**
   * 商品参数选项默认值
   */
  defaultValue: string[]
}

/**
 * 商品参数
 */
export interface IGoodsAttribute {
  /**
   * 商品参数类型
   *
   * @see {@link IGoodsAttributeOptionType}
   */
  type: IGoodsAttributeOptionType
  /**
   * 商品参数名
   */
  name: string
  /**
   * 商品参数选项
   */
  options: string[]
  /**
   * 商品参数选择结果
   */
  values: string[]
}

/**
 * 商品参数模板字典
 */
export type IGoodsAttributeTemplateDict = Pick<IGoodsAttributeTemplate, 'id' | 'name'>

/**
 * 商品参数模板列表
 */
export type IGoodsAttributeTemplateListItem = Omit<IGoodsAttributeTemplate, 'options' | 'createdTime'>
