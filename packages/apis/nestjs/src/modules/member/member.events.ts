/**
 * 会员管理事件
 */
abstract class MemberManageEvent {
  /**
   * 会员 ID
   */
  readonly id: string

  /**
   * 初始化
   *
   * @param id string
   */
  constructor(id: string) {
    this.id = id
  }
}

/**
 * 会员注册事件
 */
export class MemberRegisterEvent extends MemberManageEvent {}

/**
 * 会员登录事件
 */
export class MemberLoginEvent extends MemberManageEvent {}

/**
 * 会员签到事件
 */
export class MemberSignInEvent extends MemberManageEvent {}

/**
 * 会员升级事件
 */
export class MemberLevelUpEvent extends MemberManageEvent {}

/**
 * 会员注销事件
 */
export class MemberLogoutEvent extends MemberManageEvent {}
