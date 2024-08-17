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
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 字典 - 会员标签
 */
export type IMemberTagDict = Pick<IMemberTag, 'id' | 'name'>

/**
 * 会员标签列表
 */
export type IMemberTagListItem = Pick<IMemberTag, 'id' | 'name' | 'updatedTime'>
