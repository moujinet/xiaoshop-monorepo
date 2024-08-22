import { Controller, HttpCode, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from '@/upload/service'
import {
  UPLOAD_IMAGE_MIMETYPE,
  UPLOAD_VIDEO_MIMETYPE,
} from '@/upload/constants'
import {
  ApiAnyResponse,
  ApiBadRequestExceptionResponse,
  ApiFailedExceptionResponse,
} from '~/common/decorators'
import { exceptionFactory } from '~/common/exceptions'

@ApiTags('文件上传/通用')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly service: UploadService,
  ) {}

  @ApiOperation({
    summary: '上传图片',
    description: `仅支持 \`image/jpg\` \`image/jpeg\` \`image/png\` \`image/gif\` 格式`,
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiAnyResponse('path/to/file')
  @ApiFailedExceptionResponse({ description: '图片上传失败' })
  @ApiBadRequestExceptionResponse({ description: '图片文件大小超出限制' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('image')
  @HttpCode(200)
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: UPLOAD_IMAGE_MIMETYPE })
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

  @ApiOperation({
    summary: '上传视频',
    description: `仅支持 \`video/mp4\` 格式，最多同时上传 1 个视频文件`,
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiAnyResponse('path/to/file')
  @ApiFailedExceptionResponse({ description: '视频上传失败' })
  @ApiBadRequestExceptionResponse({ description: '视频文件大小超出限制' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('video')
  @HttpCode(200)
  async uploadVideo(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: UPLOAD_VIDEO_MIMETYPE })
        .build({ exceptionFactory }),
    ) file: Express.Multer.File,
  ) {
    return this.service.dest(file)
  }
}
