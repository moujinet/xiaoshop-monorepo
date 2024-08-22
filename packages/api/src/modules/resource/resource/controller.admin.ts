import { Body, Controller, Delete, Get, HttpCode, Inject, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ResourceType } from '@xiaoshop/shared'
import { UploadService } from '@/upload/service'
import { exceptionFactory } from '~/common/exceptions'
import { ResourceService } from '@/resource/resource/service'
import {
  UPLOAD_IMAGE_MIMETYPE,
  UPLOAD_VIDEO_MIMETYPE,
} from '@/upload/constants'
import {
  ApiAnyResponse,
  ApiBadRequestExceptionResponse,
  ApiDoneResponse,
  ApiFailedExceptionResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import {
  DeleteResourceRequest,
  GetResourcePagesRequest,
  GetResourceRequest,
  ResourceListResponse,
  ResourceResponse,
  ResourceUploadImageOptionsPayload,
  ResourceUploadVideoOptionsPayload,
} from '@/resource/resource/dto'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/素材')
@Controller('admin/resource')
export class ResourceAdminController {
  constructor(
    @Inject(ResourceService)
    private readonly service: ResourceService,

    @Inject(UploadService)
    private readonly upload: UploadService,
  ) {}

  @ApiOperation({
    summary: '获取素材列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ResourceListResponse)
  @ApiFailedExceptionResponse({ description: '获取素材列表失败' })
  @Get('pages')
  async pages(@Query() query: GetResourcePagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取素材详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ResourceResponse)
  @ApiFailedExceptionResponse({ description: '获取素材详情失败' })
  @ApiNotFoundExceptionResponse({ description: '素材不存在' })
  @Get('detail')
  async detail(@Query() query: GetResourceRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '上传素材 - 图片',
    description: `仅支持 \`image/jpg\` \`image/jpeg\` \`image/png\` \`image/gif\` 格式的图片`,
  })
  @Admin()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiAnyResponse('/path/to/file')
  @ApiFailedExceptionResponse({ description: '图片上传失败' })
  @ApiBadRequestExceptionResponse({ description: '图片文件大小超出限制' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/image')
  @HttpCode(200)
  async uploadImage(
    @Body() options: ResourceUploadImageOptionsPayload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: UPLOAD_IMAGE_MIMETYPE })
        .build({ exceptionFactory }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const filePath = await this.upload.dest(file)

      await this.service.create(ResourceType.IMAGE, {
        name: file.originalname,
        path: filePath,
        mimeType: file.mimetype,
        size: file.size,
      }, options)

      return Promise.resolve(filePath)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  @ApiOperation({
    summary: '上传素材 - 视频',
    description: `仅支持 \`image/mp4\` 格式，最多同时上传 1 个视频文件`,
  })
  @Admin()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiAnyResponse('/path/to/file')
  @ApiFailedExceptionResponse({ description: '视频上传失败' })
  @ApiBadRequestExceptionResponse({ description: '视频文件大小超出限制' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/video')
  @HttpCode(200)
  async uploadVideo(
    @Body() options: ResourceUploadVideoOptionsPayload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: UPLOAD_VIDEO_MIMETYPE })
        .build({ exceptionFactory }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const filePath = await this.upload.dest(file)

      await this.service.create(ResourceType.VIDEO, {
        name: file.originalname,
        path: filePath,
        mimeType: file.mimetype,
        size: file.size,
      }, options)

      return Promise.resolve(filePath)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  @ApiOperation({
    summary: '删除素材',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除素材失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteResourceRequest) {
    return this.service.delete(data.id)
  }
}
