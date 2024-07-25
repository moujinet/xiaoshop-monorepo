import { Logger } from '@nestjs/common'
import type { ISettingsTyped } from '@/settings/interface'

export class AssetsImageWatermarkProcessor {
  private readonly logger = new Logger(AssetsImageWatermarkProcessor.name)
  private options: ISettingsTyped

  constructor(options: ISettingsTyped) {
    this.options = options
  }

  async process(file: string) {
    this.logger.debug(`watermark process: ${file}`)
  }
}
