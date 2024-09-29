import { SystemLogLevel } from '@xiaoshop/shared'

import { MODULE_NAME } from '@/system/auth/constants'
import { AdminEvent } from '~/common/events/event.admin'

/**
 * 系统用户创建事件
 */
export class SystemUserCreateEvent extends AdminEvent {
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
export class SystemUserUpdateEvent extends AdminEvent {
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
export class SystemUserDeleteEvent extends AdminEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME, SystemLogLevel.WARN)
  }

  getLogContent() {
    return `删除系统用户 ${this.userName}`
  }
}

/**
 * 系统用户解锁事件 (管理员手动解锁)
 */
export class SystemUserAdminUnlockEvent extends AdminEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 被管理员解除锁定`
  }
}

/**
 * 系统用户禁用事件
 */
export class SystemUserBlockEvent extends AdminEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME, SystemLogLevel.WARN)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 已禁用`
  }
}

/**
 * 系统用户恢复事件
 */
export class SystemUserUnblockEvent extends AdminEvent {
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
export class SystemUserResetPasswordEvent extends AdminEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME, SystemLogLevel.WARN)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 重置密码`
  }
}
