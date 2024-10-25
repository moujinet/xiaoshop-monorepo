import type { AssetType } from '@xiaoshop/shared'

import { ASSET_TYPES } from '~/dicts/asset'
import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/asset/constants'

/**
 * Upload Asset Resource Event
 */
export class AssetResourceUploadEvent extends AdminEvent {
  constructor(
    public readonly resourceId: number,
    public readonly resourceType: AssetType,
    public readonly resourceName: string,
    public readonly resourcePath: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    const typeName = ASSET_TYPES.find(
      type => type.key === this.resourceType,
    )?.value

    return `上传${typeName}素材 - ${this.resourceName}`
  }
}

/**
 * Delete Asset Resource Event
 */
export class AssetResourceDeleteEvent extends AdminEvent {
  constructor(
    public readonly resourceId: number,
    public readonly resourceType: AssetType,
    public readonly resourceName: string,
    public readonly resourcePath: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    const typeName = ASSET_TYPES.find(
      type => type.key === this.resourceType,
    )?.value

    return `删除${typeName}素材 - ${this.resourceName}`
  }
}
