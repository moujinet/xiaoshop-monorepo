import { ResourceType } from '@xiaoshop/shared'

import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/resource/constants'

/**
 * 素材上传事件
 */
export class ResourceUploadEvent extends AdminEvent {
  constructor(
    public readonly resourceId: number,
    public readonly resourceType: ResourceType,
    public readonly resourcePath: string,
    public readonly resourceName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    const type = this.resourceType === ResourceType.IMAGE ? '图片' : '视频'

    return `上传${type}素材 - ${this.resourceName}`
  }
}

/**
 * 素材删除事件
 */
export class ResourceDeleteEvent extends AdminEvent {
  constructor(
    public readonly resourceId: number,
    public readonly resourceType: ResourceType,
    public readonly resourcePath: string,
    public readonly resourceName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    const type = this.resourceType === ResourceType.IMAGE ? '图片' : '视频'

    return `删除${type}素材 - ${this.resourceName}`
  }
}
