import type { ISettingOptionMap } from '@xiaoshop/shared'
import { Logger } from '@nestjs/common'
import sharp from 'sharp'

export class ThumbnailProcessor {
  private readonly logger = new Logger(ThumbnailProcessor.name)

  constructor(
    private readonly options: ISettingOptionMap,
  ) {}

  async process(file: string) {
    const options = this.getOptions()

    if (!options.enable)
      return

    this.logger.debug(`开始生成缩略图: ${file}`)

    await this.thumbnail(file, 'large')
    await this.thumbnail(file, 'medium')
    await this.thumbnail(file, 'small')

    this.logger.debug(`生成缩略图完成: ${file}`)
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
      enable: this.options['resource.image.enableThumbnail'] as boolean,

      // Large Thumbnail
      large: {
        width: this.options['resource.image.thumbnailLargeWidth'] as number,
        height: this.options['resource.image.thumbnailLargeHeight'] as number,
      },

      // Medium Thumbnail
      medium: {
        width: this.options['resource.image.thumbnailMediumWidth'] as number,
        height: this.options['resource.image.thumbnailMediumHeight'] as number,
      },

      // Small Thumbnail
      small: {
        width: this.options['resource.image.thumbnailSmallWidth'] as number,
        height: this.options['resource.image.thumbnailSmallHeight'] as number,
      },
    }
  }
}
