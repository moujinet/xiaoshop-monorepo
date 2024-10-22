import type { ISystemSettingMap } from '@xiaoshop/shared'

import sharp from 'sharp'
import { join } from 'node:path'
import { Logger } from '@nestjs/common'

export class WatermarkProcessor {
  private readonly logger = new Logger(WatermarkProcessor.name)

  constructor(
    private readonly options: ISystemSettingMap,
  ) {}

  async process(file: string, uploadDir: string) {
    try {
      const options = this.getOptions()

      if (!options.enable)
        return

      this.logger.debug(`开始添加水印: ${file} - 水印类型: ${options.type}`)

      if (options.type === 'text')
        await this.processText(file)
      else if (options.type === 'image')
        await this.processImage(file, uploadDir)

      this.logger.debug(`添加水印完成: ${file}`)
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  /**
   * 添加文字水印
   *
   * @param file 图片文件路径
   */
  async processText(file: string) {
    const options = this.getOptions()

    const text = options.text.value || 'XiaoShop'

    await sharp(file)
      .composite([
        {
          input: {
            text: {
              text: `<span foreground="${options.text.color}${options.opacity}">${text}</span>`,
              align: 'center',
              dpi: 300,
              rgba: true,
            },
          },
          top: options.text.y,
          left: options.text.x,
          gravity: options.text.position,
        },
      ])
      .toFile(file)
  }

  /**
   * 添加图片水印
   *
   * @param file 图片文件路径
   */
  async processImage(file: string, uploadDir: string) {
    const options = this.getOptions()

    if (!options.image.src) {
      this.logger.error(`无法获取水印图片路径: ${file}`)
      return
    }

    const { width, height } = await sharp(file).metadata()

    if (!width || !height) {
      this.logger.error(`无法获取图片 ${file} 信息`)
      return
    }

    const watermarkWidth = Math.round(width * (options.image.ratio / 100))
    const watermarkHeight = Math.round(height * (options.image.ratio / 100))

    const watermark = await sharp(join(uploadDir, options.image.src))
      .resize({
        width: watermarkWidth,
        height: watermarkHeight,
      })
      .toBuffer()

    await sharp(file)
      .composite([
        {
          input: watermark,
          top: options.image.y,
          left: options.image.x,
          gravity: options.image.position,
        },
      ])
      .toFile(file)
  }

  getOptions() {
    return {
      enable: this.options['asset.image.enableWatermark'] as boolean,
      type: this.options['asset.image.watermarkType'] as string,
      opacity: this.options['asset.image.watermarkOpacity'] as number,

      // Text Watermark
      text: {
        value: this.options['asset.image.watermarkTextValue'] as string,
        size: this.options['asset.image.watermarkTextSize'] as number,
        color: this.options['asset.image.watermarkTextColor'] as string,
        position: this.options['asset.image.watermarkTextPosition'] as string,
        x: this.options['asset.image.watermarkTextX'] as number,
        y: this.options['asset.image.watermarkTextY'] as number,
      },

      // Image Watermark
      image: {
        src: this.options['asset.image.watermarkImageSrc'] as string,
        ratio: this.options['asset.image.watermarkImageRatio'] as number,
        position: this.options['asset.image.watermarkImagePosition'] as string,
        x: this.options['asset.image.watermarkImageX'] as number,
        y: this.options['asset.image.watermarkImageY'] as number,
      },
    }
  }
}
