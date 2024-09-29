import type { IResourceImageProcessJob } from './interface'

import { Queue } from 'bull'
import { join } from 'node:path'
import { InjectQueue } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { OnEvent } from '@nestjs/event-emitter'
import { ResourceType } from '@xiaoshop/shared'
import { existsSync, unlinkSync } from 'node:fs'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { ResourceService } from './resource/service'
import { RESOURCE_IMAGE_PROCESS, RESOURCE_QUEUE_ID } from './constants'
import { ResourceDeleteEvent, ResourceUploadEvent } from './resource/events'

@Injectable()
export class ResourceListener {
  private readonly logger = new Logger(ResourceListener.name)

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(ResourceService)
    private readonly resource: ResourceService,

    @InjectQueue(RESOURCE_QUEUE_ID)
    private readonly queue: Queue<IResourceImageProcessJob>,
  ) {}

  /**
   * 处理图片
   *
   * @param payload ResourceUploadEvent
   */
  @OnEvent(toEventName(ResourceUploadEvent.name), { async: true })
  async handleResourceImageProcess(payload: ResourceUploadEvent) {
    try {
      const { resourceId, resourceType } = payload

      if (resourceType === ResourceType.IMAGE) {
        const resource = await this.resource.findById(resourceId)

        // 加入队列
        await this.queue.add(RESOURCE_IMAGE_PROCESS, {
          file: resource.path,
          mimeType: resource.mimeType,
          enableCompress: resource.group.enableCompress,
          enableThumbnail: resource.group.enableThumbnail,
          enableWatermark: resource.group.enableWatermark,
        }, {
          delay: 100,
        })
      }
    }
    catch (e) {
      this.logger.error(e)
    }
  }

  /**
   * 删除素材文件
   *
   * @param payload ResourceDeleteEvent
   */
  @OnEvent(toEventName(ResourceDeleteEvent.name), { async: true })
  async handleResourceDelete(payload: ResourceDeleteEvent) {
    try {
      const uploadDir = this.config.get<string>('upload.dest')
      const dest = join(uploadDir, payload.resourcePath)

      if (payload.resourceType === ResourceType.IMAGE) {
        const files: string[] = [
          '',
          '-large',
          '-medium',
          '-small',
        ].map(suffix => `${dest}${suffix}`)

        Promise.all(
          files.filter(file => existsSync(file))
            .map(file => unlinkSync(file)),
        )
      }
      else {
        unlinkSync(dest)
      }
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
