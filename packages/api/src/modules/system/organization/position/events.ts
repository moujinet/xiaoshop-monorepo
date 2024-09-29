import { AdminEvent } from '~/common/events/event.admin'
import { MODULE_NAME } from '@/system/organization/constants'

/**
 * 系统部门职位创建事件
 */
export class SystemPositionCreateEvent extends AdminEvent {
  constructor(
    public readonly departmentId: number,
    public readonly departmentName: string,
    public readonly positionId: number,
    public readonly positionName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建职位 ${this.departmentName}/${this.positionName}`
  }
}

/**
 * 系统部门职位更新事件
 */
export class SystemPositionUpdateEvent extends AdminEvent {
  constructor(
    public readonly departmentId: number,
    public readonly departmentName: string,
    public readonly positionId: number,
    public readonly positionName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新职位 ${this.departmentName}/${this.positionName}`
  }
}

/**
 * 系统部门职位删除事件
 */
export class SystemPositionDeleteEvent extends AdminEvent {
  constructor(
    public readonly departmentId: number,
    public readonly departmentName: string,
    public readonly positionId: number,
    public readonly positionName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除职位 ${this.departmentName}/${this.positionName}`
  }
}
