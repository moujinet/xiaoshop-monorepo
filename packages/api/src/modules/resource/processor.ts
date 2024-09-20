import type { Job } from 'bull'

import type { IResourceImageProcessJob } from './interface'

import { join } from 'node:path'
import { YesOrNo } from '@xiaoshop/shared'
import { ConfigService } from '@nestjs/config'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'

import { SystemSettingsService } from '@/system/settings/service'

import { RESOURCE_IMAGE_PROCESS, RESOURCE_QUEUE_ID } from './constants'
import { ImageCompressProcessor, ThumbnailProcessor, WatermarkProcessor } from './resource/processors'

@Processor(RESOURCE_QUEUE_ID)
export class ResourceProcessor {
  private readonly logger = new Logger(ResourceProcessor.name)

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(SystemSettingsService)
    private readonly settings: SystemSettingsService,
  ) {}

  @Process(RESOURCE_IMAGE_PROCESS)
  async handleResourceImageProcess(job: Job<IResourceImageProcessJob>) {
    try {
      const {
        file,
        mimeType,
        enableCompress,
        enableThumbnail,
        enableWatermark,
      } = job.data

      const options = await this.settings.findByKey('resource.image.*')
      const uploadDir = this.config.get<string>('upload.dest')
      const dest = join(uploadDir, file)

      // 1. 压缩图片
      if (enableCompress === YesOrNo.YES) {
        const processor = new ImageCompressProcessor(options)
        await processor.compress(dest, mimeType)
      }

      // 2. 添加水印
      if (enableThumbnail === YesOrNo.YES) {
        const processor = new WatermarkProcessor(options)
        await processor.process(dest, uploadDir)
      }

      // 3. 生成缩略图
      if (enableWatermark === YesOrNo.YES) {
        const processor = new ThumbnailProcessor(options)
        await processor.process(dest)
      }
    }
    catch (e) {
      this.logger.error(`素材图片处理 - ${e.message} - ${JSON.stringify(job)}`)
    }
  }
}
