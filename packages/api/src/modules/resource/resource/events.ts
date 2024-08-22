import { IResourceType, RESOURCE_TYPES } from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 素材上传事件
 */
export class ResourceUploadedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly fileType: IResourceType,
    public readonly fileName: string,
    public readonly filePath: string,
  ) {
    super('素材管理')
  }

  getLogs() {
    const typeName = RESOURCE_TYPES.find(t => t.value === this.fileType)?.label
    return `上传${typeName}素材 ${this.fileName}(${this.filePath})`
  }
}

/**
 * 素材删除事件
 */
export class ResourceDeletedEvent extends BaseEvent {
  constructor(
    public readonly fileType: IResourceType,
    public readonly fileName: string,
    public readonly filePath: string,
  ) {
    super('素材管理')
  }

  getLogs() {
    const typeName = RESOURCE_TYPES.find(t => t.value === this.fileType)?.label
    return `删除${typeName}素材 ${this.fileName}(${this.filePath})`
  }
}
