/**
 * 会员标签
 */
export interface IMemberTag {
  /**
   * 会员标签编号
   */
  id: number
  /**
   * 标签名称
   */
  name: string
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 字典 - 会员标签
 */
export type IMemberTagDict = Pick<IMemberTag, 'id' | 'name'>
