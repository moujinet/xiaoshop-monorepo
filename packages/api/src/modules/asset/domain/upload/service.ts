import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { ConfigService } from '@nestjs/config'
import { BadRequestException, Inject } from '@nestjs/common'

import { uuid } from '~/utils/uuid'
import { ensureLocalDir } from '~/utils/fs'
import { FailedException } from '~/common/exceptions'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'

export class AssetUploadService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(SystemSettingReadService)
    private readonly settings: SystemSettingReadService,
  ) {}

  /**
   * 上传文件
   *
   * @param file 上传文件对象
   * @returns 上传文件相对路径
   * @throws {FailedException} 上传文件失败
   * @throws {BadRequestException} 文件大小超出限制
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      if (!await this.validFileSize(file))
        throw new BadRequestException('文件大小超出限制')

      const hash = uuid()
      const uploadDir = this.config.get<string>('upload.dest')
      const resolvedDir = ensureLocalDir(uploadDir, this.getFileType(file.mimetype))
      const filePath = join(resolvedDir, hash)

      writeFileSync(resolve(join(uploadDir, filePath)), file.buffer)

      return filePath
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
  private async validFileSize(file: Express.Multer.File): Promise<boolean> {
    const configKey = file.mimetype.startsWith('image')
      ? 'maxFileSizeImage'
      : file.mimetype.startsWith('video')
        ? 'maxFileSizeVideo'
        : 'maxFileSizeFile'

    const maxFileSize = await this.settings.findValue(`asset.upload.${configKey}`)

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
  private getFileType(mimeType: string): 'image' | 'video' | 'file' {
    if (mimeType.startsWith('image'))
      return 'image'

    if (mimeType.startsWith('video'))
      return 'video'

    return 'file'
  }
}
