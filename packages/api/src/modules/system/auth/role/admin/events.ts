import { MODULE_NAME } from '@/system/auth/constants'
import { AdminEvent } from '~/common/events/event.admin'

/**
 * 系统角色创建事件
 */
export class SystemRoleCreateEvent extends AdminEvent {
  constructor(
    public readonly roleId: number,
    public readonly roleName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建系统角色 ${this.roleName}`
  }
}

/**
 * 系统角色更新事件
 */
export class SystemRoleUpdateEvent extends AdminEvent {
  constructor(
    public readonly roleId: number,
    public readonly roleName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新系统角色 ${this.roleName}`
  }
}

/**
 * 系统角色删除事件
 */
export class SystemRoleDeleteEvent extends AdminEvent {
  constructor(
    public readonly roleId: number,
    public readonly roleName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除系统角色 ${this.roleName}`
  }
}
