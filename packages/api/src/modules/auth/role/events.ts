import { BaseEvent } from '~/common/events'

/**
 * 员工角色创建事件
 */
export class AuthRoleCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly roleName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `创建员工角色 ${this.roleName}(#${this.id})`
  }
}

/**
 * 员工角色更新事件
 */
export class AuthRoleUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly roleName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `更新员工角色 ${this.roleName}(#${this.id})`
  }
}

/**
 * 员工角色删除事件
 */
export class AuthRoleDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly roleName: string,
  ) {
    super('员工管理')
  }

  getLogs() {
    return `删除员工角色 ${this.roleName}(#${this.id})`
  }
}
