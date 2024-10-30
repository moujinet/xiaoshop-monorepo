import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Create Member Event
 */
export class MemberCreateEvent extends AdminEvent {
  constructor(
    public readonly memberId: number,
    public readonly memberUsername: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建会员 - ${this.memberUsername}`
  }
}

/**
 * Block Member Event
 */
export class MemberBlockEvent extends AdminEvent {
  constructor(
    public readonly memberId: number,
    public readonly memberUsername: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `冻结会员 - ${this.memberUsername}`
  }
}

/**
 * Recover Member Event
 */
export class MemberRecoverEvent extends AdminEvent {
  constructor(
    public readonly memberId: number,
    public readonly memberUsername: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `恢复会员 - ${this.memberUsername}`
  }
}

/**
 * Reset Member Password Event
 */
export class MemberPasswordResetEvent extends AdminEvent {
  constructor(
    public readonly memberId: number,
    public readonly memberUsername: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `重置会员密码 - ${this.memberUsername}`
  }
}
