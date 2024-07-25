/**
 * 事件 - 会员注销
 */
export class MemberLogoutEvent {
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 会员账号
   */
  username: string
  /**
   * 会员昵称
   */
  nickname: string
  /**
   * 会员手机
   */
  mobile: string
  /**
   * 注销原因
   */
  reason: string
}
