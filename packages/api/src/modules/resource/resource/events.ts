import {
  RESOURCE_TYPES,
  type ResourceType,
} from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 素材上传事件
 */
export class ResourceUploadedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly fileType: ResourceType,
    public readonly fileName: string,
    public readonly filePath: string,
  ) {
    super('素材管理')
  }

  getAuthLogs() {
    const typeName = RESOURCE_TYPES.find(t => t.value === this.fileType)?.label
    return `上传${typeName}素材 ${this.fileName}(${this.filePath})`
  }
}

/**
 * 素材删除事件
 */
export class ResourceDeletedEvent extends BaseEvent {
  constructor(
    public readonly fileType: ResourceType,
    public readonly fileName: string,
    public readonly filePath: string,
  ) {
    super('素材管理')
  }

  getAuthLogs() {
    const typeName = RESOURCE_TYPES.find(t => t.value === this.fileType)?.label
    return `删除${typeName}素材 ${this.fileName}(${this.filePath})`
  }
}
