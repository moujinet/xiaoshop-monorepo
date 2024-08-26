import type { IColorName } from '~/common'

/**
 * 会员标签信息
 */
export interface IMemberTag {
  /**
   * 会员标签 ID
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
 * 会员标签字典
 *
 * @see {@link IMemberTag}
 */
export type IMemberTagDict = Pick<
  IMemberTag,
  | 'id'
  | 'name'
  | 'color'
>

/**
 * 会员标签列表
 *
 * @see {@link IMemberTag}
 */
export type IMemberTagListItem = Pick<
  IMemberTag,
  | 'id'
  | 'name'
  | 'color'
  | 'updatedTime'
>
