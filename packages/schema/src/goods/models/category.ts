/**
 * 商品分类信息
 */
export interface IGoodsCategory {
  /**
   * 商品分类编号
   */
  id: number
  /**
   * 商品分类父编号
   */
  parentId: IGoodsCategory['id']
  /**
   * 商品分类名称
   */
  name: string
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
 */
export type IGoodsCategoryDict = Pick<IGoodsCategory, 'id' | 'name'>

/**
 * 商品分类字典(含父类)
 */
export type IGoodsCategoryNestedDict = Pick<IGoodsCategory, 'id' | 'parentId' | 'name'>

/**
 * 商品分类字典(树)
 */
export interface IGoodsCategoryTreeItem extends IGoodsCategoryNestedDict {
  children: IGoodsCategoryTreeItem[]
}

/**
 * 商品分类列表
 */
export type IGoodsCategoryListItem = Omit<IGoodsCategory, 'createdTime'>
