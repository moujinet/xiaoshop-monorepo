import { Job } from 'bull'
import { Enabled } from '@xiaoshop/schema'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'
import type { IAssetImageProcessJob } from '@/assets/interface'
import { SettingsService } from '@/settings/settings.service'
import { AssetsImageCompressProcessor } from '@/assets/asset/tasks/image/compress'
import { AssetsImageThumbnailProcessor } from '@/assets/asset/tasks/image/thumbnail'
import { AssetsImageWatermarkProcessor } from '@/assets/asset/tasks/image/watermark'
import { ASSET_PROCESSOR_IMAGE, ASSET_QUEUE_ID } from '@/assets/constants'

@Processor(ASSET_QUEUE_ID)
export class AssetsTaskImageProcess {
  private readonly logger = new Logger(AssetsTaskImageProcess.name)

  constructor(
    @Inject(SettingsService)
    private readonly settings: SettingsService,
  ) {}

  @Process(ASSET_PROCESSOR_IMAGE)
  async handler(job: Job<IAssetImageProcessJob>) {
    this.logger.debug(`image process job: ${JSON.stringify(job.data)}`)

    try {
      const {
        enableCompress,
        enableThumbnail,
        enableWatermark,
        file,
      } = job.data

      // 全局开启，则根据上传素材分组开启，否则不开启
      const settings = await this.settings.moduleSettings()

      settings['image.compress.enable'] = settings['image.compress.enable'] === true && enableCompress === Enabled.YES
      settings['image.thumbnail.enable'] = settings['image.thumbnail.enable'] === true && enableThumbnail === Enabled.YES
      settings['image.watermark.enable'] = settings['image.watermark.enable'] === true && enableWatermark === Enabled.YES

      // 压缩
      if (settings['image.compress.enable']) {
        const processor = new AssetsImageCompressProcessor(settings)
        await processor.process(file)
      }

      // 水印
      if (settings['image.watermark.enable']) {
        const processor = new AssetsImageWatermarkProcessor(settings)
        await processor.process(file)
      }

      // 缩略图
      if (settings['image.thumbnail.enable']) {
        const processor = new AssetsImageThumbnailProcessor(settings)
        await processor.process(file)
      }
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
