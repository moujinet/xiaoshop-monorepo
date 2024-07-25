import { Logger } from '@nestjs/common'
import type { ISettingsTyped } from '@/settings/interface'

export class AssetsImageThumbnailProcessor {
  private readonly logger = new Logger(AssetsImageThumbnailProcessor.name)
  private options: ISettingsTyped

  constructor(options: ISettingsTyped) {
    this.options = options
  }

  async process(file: string) {
    this.logger.debug(`thumbnail process: ${file}`)
  }
}
