/**
 * 会员令牌
 */
export interface IMemberToken {
  /**
   * 令牌 ID
   */
  id: number
  /**
   * 会员令牌
   */
  token: string
  /**
   * 令牌过期时间
   */
  expires: string
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 刷新时间
   */
  refreshTime: string
}
