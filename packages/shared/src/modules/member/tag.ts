import type { IColorName } from '~/common'

/**
 * 会员标签信息
 */
export interface IMemberTagInfo {
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
}

/**
 * 会员标签字典
 *
 * @see {@link IMemberTagInfo}
 */
export type IMemberTagDict = Pick<
  IMemberTagInfo,
  | 'id'
  | 'name'
>

/**
 * 会员标签列表
 *
 * @see {@link IMemberTagInfo}
 */
export type IMemberTagList = Pick<
  IMemberTagInfo,
  | 'id'
  | 'name'
  | 'color'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}
