import type { IAssetProcessImage } from './interface'

import { Job } from 'bull'
import { join } from 'node:path'
import { YesOrNo } from '@xiaoshop/shared'
import { ConfigService } from '@nestjs/config'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'

import { SystemSettingReadService } from '@/system/setting/domain/read/service'
import { ASSET_IMAGE_PROCESS, ASSET_PROCESS_QUEUE_KEY } from '@/asset/constants'

import { CompressProcessor } from './processor/compress'
import { ThumbnailProcessor } from './processor/thumbnail'
import { WatermarkProcessor } from './processor/watermark'

@Processor(ASSET_PROCESS_QUEUE_KEY)
export class AssetProcessService {
  private readonly logger = new Logger(AssetProcessService.name)

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(SystemSettingReadService)
    private readonly settings: SystemSettingReadService,
  ) {}

  @Process(ASSET_IMAGE_PROCESS)
  async handleResourceImageProcess(job: Job<IAssetProcessImage>) {
    try {
      const {
        file,
        mimeType,
        enableCompress,
        enableThumbnail,
        enableWatermark,
      } = job.data

      const options = await this.settings.find('asset.image.*')
      const uploadDir = this.config.get<string>('upload.dest')
      const dest = join(uploadDir, file)

      // 1. 压缩图片
      if (enableCompress === YesOrNo.YES) {
        const processor = new CompressProcessor(options)
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
