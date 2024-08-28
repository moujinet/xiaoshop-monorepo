import { BaseEvent } from '~/common/events'

/**
 * 组织部门创建事件
 */
export class OrganizeDepartmentCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly departmentName: string,
  ) {
    super('组织管理')
  }

  getAuthLogs() {
    return `创建组织部门 ${this.departmentName}(#${this.id})`
  }
}

/**
 * 组织部门更新事件
 */
export class OrganizeDepartmentUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly departmentName: string,
  ) {
    super('组织管理')
  }

  getAuthLogs() {
    return `更新组织部门 ${this.departmentName}(#${this.id})`
  }
}

/**
 * 组织部门删除事件
 */
export class OrganizeDepartmentDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly departmentName: string,
  ) {
    super('组织管理')
  }

  getAuthLogs() {
    return `删除组织部门 ${this.departmentName}(#${this.id})`
  }
}
