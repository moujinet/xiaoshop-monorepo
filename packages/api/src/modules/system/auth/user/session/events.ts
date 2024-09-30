import { SystemLogLevel } from '@xiaoshop/shared'

import { MODULE_NAME } from '@/system/auth/constants'
import { AdminEvent } from '~/common/events/event.admin'
import { SystemEvent } from '~/common/events/event.system'

/**
 * 系统用户登录事件
 */
export class SystemUserLoginEvent extends AdminEvent {
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
export class SystemUserWrongPasswordEvent extends AdminEvent {
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
export class SystemUserAutoLockEvent extends SystemEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME, SystemLogLevel.WARN)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 登录密码错误超过重试次数, 系统已自动锁定`
  }
}

/**
 * 系统用户解锁事件 (60 分钟 自动解锁)
 */
export class SystemUserAutoUnlockEvent extends SystemEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `系统用户 ${this.userName} 锁定超过锁定时间, 系统已自动解除锁定`
  }
}
