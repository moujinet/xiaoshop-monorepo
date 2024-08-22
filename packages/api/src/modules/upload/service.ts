import { join, resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { v4 as uuid } from 'uuid'
import { ConfigService } from '@nestjs/config'
import { Inject, Injectable } from '@nestjs/common'
import { SettingsService } from '@/settings/service'
import { ensureDir } from '@/upload/utils'
import {
  BadRequestException,
  FailedException,
} from '~/common/exceptions'

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
   * @param file 上传文件对象
   * @returns Promise<string> 文件路径 (不包含 `upload` 目录)
   * @throws {BadRequestException} 文件大小超出限制
   * @throws {FailedException} 移动上传文件失败
   */
  async dest(file: Express.Multer.File): Promise<string> {
    try {
      const valid = await this.validFileSize(file)

      if (!valid)
        throw new BadRequestException('文件大小超出限制')

      const hash = uuid()
      const uploadDir = this.config.get<string>('upload.dest')
      const resolvedDir = ensureDir(uploadDir, this.getFileType(file.mimetype))
      const filePath = join(resolvedDir, hash)

      writeFileSync(resolve(filePath), file.buffer)

      return filePath.replace(`${join(uploadDir)}/`, '')
    }
    catch (e) {
      throw new FailedException('上传文件', e.message, e.status)
    }
  }

  /**
   * 验证文件大小
   *
   * @param file 上传文件对象
   * @returns Promise<boolean>
   */
  async validFileSize(file: Express.Multer.File): Promise<boolean> {
    const configKey = file.mimetype.startsWith('image')
      ? 'maxFileSizeImage'
      : 'maxFileSizeVideo'

    const maxFileSize = await this.settings.findValueByKey(`upload.${configKey}`)

    if (!maxFileSize)
      return true

    return file.size < Number(maxFileSize) * 1024
  }

  /**
   * 获取文件类型
   *
   * @param mimeType 文件 MIME 类型
   * @returns 文件类型
   */
  getFileType(mimeType: string): 'image' | 'video' | 'file' {
    if (mimeType.startsWith('image'))
      return 'image'
    if (mimeType.startsWith('video'))
      return 'video'

    return 'file'
  }
}
