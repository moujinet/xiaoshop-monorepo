import { SystemLogLevel, SystemLogType } from '@xiaoshop/shared'

import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/system/auth/constants'

/**
 * 系统用户创建事件
 */
export class SystemUserCreateEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建系统用户 ${this.userName}`
  }
}

/**
 * 系统用户更新事件
 */
export class SystemUserUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新系统用户 ${this.userName}`
  }
}

/**
 * 系统用户删除事件
 */
export class SystemUserDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除系统用户 ${this.userName}`
  }
}

/**
 * 系统用户登录事件
 */
export class SystemUserLoginEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 登录成功`
  }
}

/**
 * 系统用户密码错误事件
 *
 * - 登录时
 * - 修改密码
 */
export class SystemUserWrongPasswordEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
    public readonly method: 'login' | 'password' = 'login',
  ) {
    super(MODULE_NAME)
  }
}

/**
 * 系统用户锁定事件
 */
export class SystemUserLockEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME, SystemLogType.SYSTEM, SystemLogLevel.WARN)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 登录密码错误超过 5 次, 系统自动锁定`
  }
}

/**
 * 系统用户解锁事件 (60 分钟 自动解锁)
 */
export class SystemUserAutoUnlockEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME, SystemLogType.SYSTEM)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 锁定超过 60 分钟, 系统自动解除锁定`
  }
}

/**
 * 系统用户解锁事件 (管理员手动解锁)
 */
export class SystemUserAdminUnlockEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME, SystemLogType.SYSTEM)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 被管理员解除锁定`
  }
}

/**
 * 系统用户禁用事件
 */
export class SystemUserBlockEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 已禁用`
  }
}

/**
 * 系统用户恢复事件
 */
export class SystemUserUnblockEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 恢复正常`
  }
}

/**
 * 系统用户重置密码事件
 */
export class SystemUserResetPasswordEvent extends LogBasedEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 重置密码`
  }
}
