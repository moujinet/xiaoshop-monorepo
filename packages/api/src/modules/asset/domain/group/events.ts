import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/asset/constants'

/**
 * Create Asset Group Event
 */
export class AssetGroupCreateEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建素材分组 ${this.groupName}`
  }
}

/**
 * Update Asset Group Event
 */
export class AssetGroupUpdateEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新素材分组 ${this.groupName}`
  }
}

/**
 * Delete Asset Group Event
 */
export class AssetGroupDeleteEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除素材分组 ${this.groupName}`
  }
}
