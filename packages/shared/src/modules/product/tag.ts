import type { IColorName } from '~/common'

/**
 * 商品标签信息
 */
export interface IProductTagInfo {
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
   */
  color: IColorName
}

/**
 * 商品标签字典
 */
export type IProductTagDict = Pick<
  IProductTagInfo,
  | 'id'
  | 'color'
  | 'name'
>

/**
 * 商品标签列表
 */
export type IProductTagList = Pick<
  IProductTagInfo,
  | 'id'
  | 'name'
  | 'color'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
