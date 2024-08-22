import { join } from 'node:path'
import { Job } from 'bull'
import { YesOrNo } from '@xiaoshop/shared'
import { ConfigService } from '@nestjs/config'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'
import { SettingsService } from '@/settings/service'
import type { IResourceImageProcessJob } from '@/resource/interface'
import {
  ImageCompressProcessor,
  ThumbnailProcessor,
  WatermarkProcessor,
} from '@/resource/resource/processors'
import {
  RESOURCE_IMAGE_PROCESS,
  RESOURCE_QUEUE_ID,
} from '@/resource/constants'

@Processor(RESOURCE_QUEUE_ID)
export class ResourceProcessor {
  private readonly logger = new Logger(ResourceProcessor.name)

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,
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
      if (enableWatermark === YesOrNo.YES) {
        const processor = new WatermarkProcessor(options)
        await processor.process(dest, uploadDir)
      }

      // 3. 生成缩略图
      if (enableThumbnail === YesOrNo.YES) {
        const processor = new ThumbnailProcessor(options)
        await processor.process(dest)
      }
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
