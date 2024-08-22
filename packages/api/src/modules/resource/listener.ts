import { existsSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { OnEvent } from '@nestjs/event-emitter'
import { ResourceType } from '@xiaoshop/shared'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ResourceService } from '@/resource/resource/service'
import type { IResourceImageProcessJob } from '@/resource/interface'
import { toEventName } from '~/utils/transformers'
import {
  ResourceDeletedEvent,
  ResourceUploadedEvent,
} from '@/resource/resource/events'
import {
  RESOURCE_IMAGE_PROCESS,
  RESOURCE_QUEUE_ID,
} from '@/resource/constants'

@Injectable()
export class ResourceListener {
  private readonly logger = new Logger(ResourceListener.name)

  constructor(
    @Inject(ResourceService)
    private readonly resource: ResourceService,

    @Inject(ConfigService)
    private readonly config: ConfigService,

    @InjectQueue(RESOURCE_QUEUE_ID)
    private readonly queue: Queue<IResourceImageProcessJob>,
  ) {}

  /**
   * 处理图片
   *
   * @param payload ResourceUploadedEvent
   */
  @OnEvent(toEventName(ResourceUploadedEvent.name), { async: true })
  async handleResourceImageProcess(payload: ResourceUploadedEvent) {
    try {
      const { id, fileType } = payload

      if (fileType === ResourceType.IMAGE) {
        const resource = await this.resource.findById(id)

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
   * @param payload ResourceDeletedEvent
   */
  @OnEvent(toEventName(ResourceDeletedEvent.name), { async: true })
  async handleResourceDelete(payload: ResourceDeletedEvent) {
    try {
      const uploadDir = this.config.get<string>('upload.dest')
      const dest = join(uploadDir, payload.filePath)

      const files: string[] = [
        '',
        '-large',
        '-medium',
        '-small',
      ].map(suffix => `${dest}${suffix}`)

      for (const file of files) {
        if (existsSync(file))
          unlinkSync(file)
      }
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
