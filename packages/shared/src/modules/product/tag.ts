import type { IColorName } from '~/common'

/**
 * 商品标签信息
 */
export interface IProductTag {
  /**
   * 标签 ID
   */
  id: number
  /**
   * 标签名称
   */
  name: string
  /**
   * 标签颜色
   *
   * @see {@link IColorName}
   */
  color: IColorName
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
 * 商品标签字典
 *
 * @see {@link IProductTag}
 */
export type IProductTagDict = Pick<
  IProductTag,
  | 'id'
  | 'color'
  | 'name'
>

/**
 * 商品标签列表
 *
 * @see {@link IProductTag}
 */
export type IProductTagListItem = Pick<
  IProductTag,
  | 'id'
  | 'name'
  | 'color'
  | 'updatedTime'
>
