import { ResourceType } from '@xiaoshop/shared'
import { FileInterceptor } from '@nestjs/platform-express'
import { Body, Controller, Delete, Get, HttpCode, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'
import { exceptionFactory } from '~/common/exceptions'

import { ResourceService } from './service'
import { ResourceUploadService } from '../upload/service'
import { RESOURCE_MIMETYPE_IMAGE, RESOURCE_MIMETYPE_VIDEO } from '../constants'
import {
  DeleteResourceInfoRequest,
  GetResourceInfoRequest,
  GetResourcePagesRequest,
  ResourceUploadPayload,
} from './dto'

@Controller('admin/resource')
export class ResourceAdminController {
  constructor(
    private readonly service: ResourceService,
    private readonly uploadService: ResourceUploadService,
  ) {}

  /**
   * 获取素材列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetResourcePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取素材信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetResourceInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 上传图片素材
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/image')
  @HttpCode(200)
  @Admin()
  async uploadImage(
    @Body() payload: ResourceUploadPayload,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: RESOURCE_MIMETYPE_IMAGE })
      .build({ exceptionFactory }))
    file: Express.Multer.File,
  ) {
    try {
      const path = await this.uploadService.upload(file)

      await this.service.create(ResourceType.IMAGE, {
        groupId: payload.groupId,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path,
      })

      return Promise.resolve(path)
    }
    catch (e) {
      return Promise.reject(e.message)
    }
  }

  /**
   * 上传视频素材
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/video')
  @HttpCode(200)
  @Admin()
  async uploadVideo(
    @Body() payload: ResourceUploadPayload,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: RESOURCE_MIMETYPE_VIDEO })
      .build({ exceptionFactory }))
    file: Express.Multer.File,
  ) {
    try {
      const path = await this.uploadService.upload(file)

      await this.service.create(ResourceType.VIDEO, {
        groupId: payload.groupId,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path,
      })

      return Promise.resolve(path)
    }
    catch (e) {
      return Promise.reject(e.message)
    }
  }

  /**
   * 删除素材
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteResourceInfoRequest) {
    return this.service.delete(data.id)
  }
}
