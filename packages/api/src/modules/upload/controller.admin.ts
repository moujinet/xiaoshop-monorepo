import { Controller, HttpCode, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { UPLOAD_FILE_MIMETYPE } from '@/upload/constants'
import { exceptionFactory } from '~/common/exceptions'
import { UploadService } from '@/upload/service'
import {
  ApiAnyResponse,
  ApiBadRequestExceptionResponse,
  ApiFailedExceptionResponse,
} from '~/common/decorators'

@ApiTags('文件上传/管理')
@Controller('admin/upload')
export class UploadAdminController {
  constructor(
    private readonly service: UploadService,
  ) {}

  @ApiOperation({
    summary: '上传文件',
    description: `仅支持 \`Excel\` 格式`,
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiAnyResponse('path/to/file')
  @ApiFailedExceptionResponse({ description: '文件上传失败' })
  @ApiBadRequestExceptionResponse({ description: '文件文件大小超出限制' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  @HttpCode(200)
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: UPLOAD_FILE_MIMETYPE })
        .build({ exceptionFactory }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const filePath = await this.service.dest(file)
      return Promise.resolve(filePath)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }
}
