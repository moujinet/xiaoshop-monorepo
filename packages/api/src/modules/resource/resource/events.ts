import type { ResourceType } from '@xiaoshop/shared'

import { LogBasedEvent } from '~/common/events'

import { MODULE_NAME } from '../constants'

/**
 * 素材上传事件
 */
export class ResourceUploadEvent extends LogBasedEvent {
  constructor(
    public readonly resourceId: number,
    public readonly resourceType: ResourceType,
    public readonly resourcePath: string,
    public readonly resourceName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `上传 ${this.resourceType} 素材 - ${this.resourceName}`
  }
}

/**
 * 素材删除事件
 */
export class ResourceDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly resourceId: number,
    public readonly resourceType: ResourceType,
    public readonly resourcePath: string,
    public readonly resourceName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除 ${this.resourceType} 素材 - ${this.resourceName}`
  }
}
