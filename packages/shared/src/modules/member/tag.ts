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
   * 会员标签名称
   */
  name: string
  /**
   * 会员标签颜色
   */
  color: IColorName
}

/**
 * 会员标签字典
 */
export type IMemberTagDict = Pick<
  IMemberTagInfo,
  | 'id'
  | 'name'
>

/**
 * 会员标签列表
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
