import { Logger } from '@nestjs/common'
import type { ISettingsTyped } from '@/settings/interface'

/**
 * 图片压缩处理器
 */
export class AssetsImageCompressProcessor {
  private readonly logger = new Logger(AssetsImageCompressProcessor.name)
  private options: ISettingsTyped

  constructor(options: ISettingsTyped) {
    this.options = options
  }

  async process(file: string) {
    this.logger.debug(`compress process: ${file}`)
  }
}
