import type { ISettingOptionMap } from '@xiaoshop/shared'
import { Logger } from '@nestjs/common'
import sharp from 'sharp'

export class ImageCompressProcessor {
  private readonly logger = new Logger(ImageCompressProcessor.name)

  constructor(
    private readonly options: ISettingOptionMap,
  ) {}

  /**
   * 图片压缩
   *
   * @param file 图片路径
   * @param mimeType 图片 MIME 类型
   */
  async compress(file: string, mimeType: string) {
    try {
      const options = this.getOptions()

      if (!options.enable)
        return

      this.logger.debug(`开始压缩图片: ${file}(${mimeType}) - 图片质量: ${options.quality}`)

      const image = sharp(file)

      if (mimeType === 'image/png') {
        await image.png({
          quality: options.quality || 80,
        }).toFile(file)
      }
      else if (mimeType === 'image/jpeg') {
        await image.jpeg({
          quality: options.quality || 80,
        }).toFile(file)
      }

      this.logger.debug(`压缩图片完成: ${file}(${mimeType})`)
    }
    catch (e) {
      this.logger.error(e)
    }
  }

  getOptions() {
    return {
      enable: this.options['resource.image.enableCompress'] as boolean,
      quality: this.options['resource.image.compressQuality'] as number,
    }
  }
}
