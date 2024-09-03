import {
  AuthLogType,
  type IMemberAccountKeys,
  type IMemberTagDict,
  MEMBER_ACCOUNT_CHANGE_TYPES,
  MEMBER_STATUSES,
  MemberAccountChangeType,
  MemberStatus,
} from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 会员账户创建事件
 */
export class MemberCreatedEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `创建会员 ${this.nickname} - (@${this.memberId})`
  }
}

/**
 * 会员账户变动事件
 */
export class MemberAccountChangedEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
    public readonly changeType: MemberAccountChangeType,
    public readonly key: IMemberAccountKeys,
    public readonly value: number,
    public readonly reason: string,
    public readonly withoutUser = false,
  ) {
    super(
      '会员管理',
      withoutUser
        ? AuthLogType.SYSTEM
        : AuthLogType.USER,
    )
  }

  getAuthLogs() {
    const changeType = MEMBER_ACCOUNT_CHANGE_TYPES.find(
      t => t.value === this.changeType,
    )?.label

    const accountMap: Record<IMemberAccountKeys, string> = {
      exp: '经验值',
      points: '积分',
      balance: '账户余额',
      orders: '消费次数',
      orderAmount: '消费金额',
      redPacket: '红包数',
      coupon: '优惠券数',
      signInTimes: '签到次数',
      loginTimes: '登录次数',
    }

    return `${changeType}会员 ${this.nickname || ''}(@${this.memberId}) ${accountMap[this.key]} - ${this.value} - 原因: ${this.reason}`
  }
}

/**
 * 会员账户状态变更事件
 */
export class MemberStatusChangedEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
    public readonly status: MemberStatus,
  ) {
    super(
      '会员管理',
      status === MemberStatus.LOCKED
        ? AuthLogType.SYSTEM
        : AuthLogType.USER,
    )
  }

  getAuthLogs() {
    const status = this.status === MemberStatus.NORMAL
      ? '恢复'
      : MEMBER_STATUSES.find(i => i.value === this.status)?.label

    return `${status}会员 ${this.nickname} 账户 - (@${this.memberId})`
  }
}

/**
 * 会员账户标签变更事件
 */
export class MemberTagsChangedEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
    public readonly tags: IMemberTagDict[],
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `设置会员 ${this.nickname}(@${this.memberId}) 标签 - ${this.tags.map(i => i.name).join(',')}`
  }
}

/**
 * 会员账户分组变更事件
 */
export class MemberGroupChangedEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
    public readonly groupName: string,
  ) {
    super('会员管理', AuthLogType.SYSTEM)
  }

  getAuthLogs() {
    return `设置会员 ${this.nickname}(@${this.memberId}) 分组 - ${this.groupName}`
  }
}

/**
 * 会员账户密码重置事件
 */
export class MemberPasswordResetEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
    public readonly password: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `重置会员密码 ${this.nickname}(@${this.memberId}) 为 ${this.password}`
  }
}

/**
 * 会员登录事件
 */
export class MemberLoginEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
    public readonly loginTime: string,
  ) {
    super('会员登录')
  }
}

/**
 * 会员注册事件
 */
export class MemberRegisteredEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
  ) {
    super('会员注册')
  }
}

/**
 * 会员注销事件
 */
export class MemberUnregisteredEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
  ) {
    super('会员注销')
  }
}

/**
 * 会员资料更新事件
 */
export class MemberProfileUpdatedEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly nickname: string,
  ) {
    super('会员资料')
  }
}
