import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { v4 as uuid } from 'uuid'
import { ConfigService } from '@nestjs/config'
import { Inject, Injectable } from '@nestjs/common'
import { SettingsService } from '@/settings/settings.service'
import { UploadSettings } from '@/upload/upload.settings'
import { BadRequestException, FailedException } from '~/common/exception'
import { ensureDir } from '~/utils/path'

@Injectable()
export class UploadService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,
  ) {}

  /**
   * 移动上传文件
   *
   * @param file Express.Multer.File
   */
  async dest(file: Express.Multer.File) {
    try {
      const valid = await this.validFileSize(file)

      if (!valid)
        throw new BadRequestException('文件大小超过限制')

      const hash = uuid()
      const uploadFolder = this.config.get<string>('upload.dest')
      const dest = ensureDir(uploadFolder, file.mimetype.split('/').shift())
      const filepath = join(dest, hash)

      writeFileSync(resolve(filepath), file.buffer)

      return filepath.replace(`${join(uploadFolder)}/`, '')
    }
    catch (e) {
      throw new FailedException('文件上传', e.message, e.status)
    }
  }

  /**
   * 检查文件大小
   *
   * @param file Express.Multer.File
   * @returns Promise<boolean>
   */
  async validFileSize(file: Express.Multer.File): Promise<boolean> {
    const key = file.mimetype.startsWith('image') ? 'maxFileSizeImage' : 'maxFileSizeVideo'
    const maxFileSize = await this.settings.get(
      `upload.${key}`,
      Number(UploadSettings[`${key}`]),
    ) as number

    return file.size < maxFileSize * 1024
  }
}
