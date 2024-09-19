import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/system/organize/constants'

/**
 * 系统部门职位创建事件
 */
export class SystemDepartmentPositionCreateEvent extends LogBasedEvent {
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
export class SystemDepartmentPositionUpdateEvent extends LogBasedEvent {
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
export class SystemDepartmentPositionDeleteEvent extends LogBasedEvent {
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
