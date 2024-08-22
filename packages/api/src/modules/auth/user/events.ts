import { BaseEvent } from '~/common/events'

/**
 * 员工账号登录事件
 */
export class AuthUserLoginEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工登录')
  }

  getLogs() {
    return `员工登录 ${this.userName}(#${this.id})`
  }
}

/**
 * 员工密码错误事件
 */
export class AuthUserPasswordWrongEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工登录')
  }
}

/**
 * 员工账号锁定事件
 */
export class AuthUserLockedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `密码错误超过 5 次, 员工账号 ${this.userName}(#${this.id}) 被系统锁定`
  }
}

/**
 * 员工账号解锁事件
 */
export class AuthUserUnlockedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `锁定时间超过 60 分钟, 员工账号 ${this.userName}(#${this.id}) 被系统解锁`
  }
}

/**
 * 员工账号禁用事件
 */
export class AuthUserBlockedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `禁用员工账号 ${this.userName}(#${this.id})`
  }
}

/**
 * 员工账号恢复事件
 */
export class AuthUserUnblockedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `恢复员工账号 ${this.userName}(#${this.id})`
  }
}

/**
 * 员工账号创建事件
 */
export class AuthUserCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `创建员工账号 ${this.userName}(#${this.id})`
  }
}

/**
 * 员工账号更新事件
 */
export class AuthUserUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `更新员工账号 ${this.userName}(#${this.id})`
  }
}

/**
 * 员工账号删除事件
 */
export class AuthUserDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly userName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `删除员工账号 ${this.userName}(#${this.id})`
  }
}
