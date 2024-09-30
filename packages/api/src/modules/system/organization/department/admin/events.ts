import { AdminEvent } from '~/common/events/event.admin'
import { MODULE_NAME } from '@/system/organization/constants'

/**
 * 系统部门创建事件
 */
export class SystemDepartmentCreateEvent extends AdminEvent {
  constructor(
    public readonly departmentId: number,
    public readonly departmentName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建部门 ${this.departmentName}`
  }
}

/**
 * 系统部门更新事件
 */
export class SystemDepartmentUpdateEvent extends AdminEvent {
  constructor(
    public readonly departmentId: number,
    public readonly departmentName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新部门 ${this.departmentName}`
  }
}

/**
 * 系统部门删除事件
 */
export class SystemDepartmentDeleteEvent extends AdminEvent {
  constructor(
    public readonly departmentId: number,
    public readonly departmentName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除部门 ${this.departmentName}`
  }
}
