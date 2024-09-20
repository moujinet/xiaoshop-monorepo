import { LogBasedEvent } from '~/common/events'

import { MODULE_NAME } from '../constants'

/**
 * 素材分组创建事件
 */
export class ResourceGroupCreateEvent extends LogBasedEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建素材分组 ${this.groupName}`
  }
}

/**
 * 素材分组更新事件
 */
export class ResourceGroupUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新素材分组 ${this.groupName}`
  }
}

/**
 * 素材分组删除事件
 */
export class ResourceGroupDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除素材分组 ${this.groupName}`
  }
}
