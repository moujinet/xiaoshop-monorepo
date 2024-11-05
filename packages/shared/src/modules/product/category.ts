/**
 * 商品管理分类
 */
export interface IProductCategoryInfo {
  /**
   * 商品分类 ID
   */
  id: number
  /**
   * 商品父分类 ID
   */
  parentId: number
  /**
   * 商品分类名称
   */
  name: string
  /**
   * 商品分类描述
   */
  desc: string
  /**
   * 商品分类图片
   */
  image: string
  /**
   * 排序
   */
  sort: number
}

/**
 * 商品分类字典
 */
export type IProductCategoryDict = Pick<
  IProductCategoryInfo,
  | 'id'
  | 'parentId'
  | 'name'
>

/**
 * 嵌套商品分类字典
 */
export interface IProductCategoryNestedDict extends IProductCategoryDict {
  /**
   * 子分类
   */
  children?: IProductCategoryNestedDict[]
}

/**
 * 商品分类列表
 */
export type IProductCategoryList = Pick<
  IProductCategoryInfo,
  | 'id'
  | 'parentId'
  | 'name'
  | 'desc'
  | 'image'
  | 'sort'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
