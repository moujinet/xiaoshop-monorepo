import type { IAssetProcessImage } from '@/asset/domain/process/interface'

import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { AssetType } from '@xiaoshop/shared'
import { Body, Controller, Delete, Get, Logger, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { OnEvent } from '~/services/event-bus'
import { AssetResourceService } from '@/asset/domain/resource/service'
import { AssetResourceDeleteEvent, AssetResourceUploadEvent } from '@/asset/domain/resource/events'
import { ASSET_IMAGE_PROCESS, ASSET_IMAGE_PROCESS_PRIORITY, ASSET_PROCESS_QUEUE_KEY } from '@/asset/constants'
import { DeleteAssetResourceRequest, GetAssetResourcePagesRequest, GetAssetResourceRequest } from '@/asset/dto/request'

@Controller('admin/asset/resource')
export class AssetResourceAdminController {
  private readonly logger = new Logger(AssetResourceAdminController.name)

  constructor(
    private readonly service: AssetResourceService,

    @InjectQueue(ASSET_PROCESS_QUEUE_KEY)
    private readonly queue: Queue<IAssetProcessImage>,
  ) {}

  /**
   * Get Asset Resource Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetAssetResourcePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Asset Resource Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetAssetResourceRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Delete Asset Resource
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteAssetResourceRequest) {
    return this.service.delete(data.id)
  }

  /**
   * 上传素材处理
   *
   * @param payload AssetResourceUploadEvent
   */
  @OnEvent(AssetResourceUploadEvent)
  async handleUploadResource(payload: AssetResourceUploadEvent) {
    try {
      const { resourceId, resourceType } = payload

      if (resourceType === AssetType.IMAGE) {
        const resource = await this.service.findById(resourceId)

        await this.queue.add(ASSET_IMAGE_PROCESS, {
          file: resource.path,
          mimeType: resource.mimeType,
          enableCompress: resource.group.enableCompress,
          enableThumbnail: resource.group.enableThumbnail,
          enableWatermark: resource.group.enableWatermark,
        }, {
          priority: ASSET_IMAGE_PROCESS_PRIORITY,
        })
      }
    }
    catch (e) {
      this.logger.error(`处理上传素材 - ${e.message}`, e.stack)
    }
  }

  /**
   * 删除素材文件
   *
   * @param payload AssetResourceDeleteEvent
   */
  @OnEvent(AssetResourceDeleteEvent)
  async handleDeleteResource(payload: AssetResourceDeleteEvent) {
    try {
      const dest = payload.resourcePath
      const files: string[] = payload.resourceType === AssetType.IMAGE
        ? [
            '',
            '-large',
            '-medium',
            '-small',
          ].map(suffix => `${dest}${suffix}`)
        : [dest]

      await this.service.deleteResources(files)
    }
    catch (e) {
      this.logger.error(`删除素材 - ${e.message}`, e.stack)
    }
  }
}
