import type { ISystemSettingMap } from '@xiaoshop/shared'

import sharp from 'sharp'
import { Logger } from '@nestjs/common'

export class ThumbnailProcessor {
  private readonly logger = new Logger(ThumbnailProcessor.name)

  constructor(
    private readonly options: ISystemSettingMap,
  ) {}

  async process(file: string) {
    const options = this.getOptions()

    if (!options.enable)
      return

    try {
      this.logger.debug(`开始生成缩略图: ${file}`)

      await this.thumbnail(file, 'large')
      await this.thumbnail(file, 'medium')
      await this.thumbnail(file, 'small')

      this.logger.debug(`生成缩略图完成: ${file}`)
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  async thumbnail(file: string, suffix: 'large' | 'medium' | 'small') {
    const options = this.getOptions()
    const { width, height } = options[suffix]

    await sharp(file)
      .resize({
        width,
        height,
      })
      .toFile(`${file}-${suffix}`)
  }

  getOptions() {
    return {
      enable: this.options['asset.image.enableThumbnail'] as boolean,

      // Large Thumbnail
      large: {
        width: this.options['asset.image.thumbnailLargeWidth'] as number,
        height: this.options['asset.image.thumbnailLargeHeight'] as number,
      },

      // Medium Thumbnail
      medium: {
        width: this.options['asset.image.thumbnailMediumWidth'] as number,
        height: this.options['asset.image.thumbnailMediumHeight'] as number,
      },

      // Small Thumbnail
      small: {
        width: this.options['asset.image.thumbnailSmallWidth'] as number,
        height: this.options['asset.image.thumbnailSmallHeight'] as number,
      },
    }
  }
}
