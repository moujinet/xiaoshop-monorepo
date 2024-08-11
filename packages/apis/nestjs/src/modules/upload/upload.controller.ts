import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { Controller, HttpCode, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { UPLOAD_IMAGE_MIMETYPE, UPLOAD_VIDEO_MIMETYPE } from '@/upload/constants'
import { UploadService } from '@/upload/upload.service'
import { exceptionFactory } from '~/common/exception'

@ApiTags('通用/文件上传')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @ApiOperation({
    summary: '上传图片',
    description: `仅支持 \`image/jpg\` \`image/jpeg\` \`image/png\` \`image/gif\` 格式`,
  })
  @ApiConsumes('multipart/form-data')
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
      const filePath = await this.uploadService.dest(file)
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
  @ApiConsumes('multipart/form-data')
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
    return this.uploadService.dest(file)
  }
}
