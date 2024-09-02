/**
 * 商品管理分类
 */
export interface IProductCategory {
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
 * 商品分类字典
 *
 * @see {@link IProductCategory}
 */
export type IProductCategoryDict = Pick<
  IProductCategory,
  | 'id'
  | 'parentId'
  | 'name'
>

/**
 * 嵌套商品分类字典
 *
 * @see {@link IProductCategoryDict}
 */
export interface IProductCategoryNestedDict extends IProductCategoryDict {
  /**
   * 子分类
   */
  children?: IProductCategoryNestedDict[]
}

/**
 * 商品分类列表
 *
 * @see {@link IProductCategory}
 */
export type IProductCategoryListItem = Pick<
  IProductCategory,
  | 'id'
  | 'parentId'
  | 'name'
  | 'desc'
  | 'image'
  | 'sort'
  | 'updatedTime'
>
