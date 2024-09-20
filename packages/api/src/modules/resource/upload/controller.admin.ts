import { FileInterceptor } from '@nestjs/platform-express'
import { Controller, HttpCode, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'

import { exceptionFactory } from '~/common/exceptions'

import { ResourceUploadService } from './service'
import { RESOURCE_MIMETYPE_FILE } from '../constants'

@Controller('admin/resource/upload')
export class ResourceUploadAdminController {
  constructor(
    private readonly service: ResourceUploadService,
  ) {}

  /**
   * 上传 Excel 文件
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  @HttpCode(200)
  async uploadExcel(
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: RESOURCE_MIMETYPE_FILE })
      .build({ exceptionFactory }))
    file: Express.Multer.File,
  ) {
    try {
      const filePath = await this.service.upload(file)
      return Promise.resolve(filePath)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }
}
