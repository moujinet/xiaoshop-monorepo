import { AssetType } from '@xiaoshop/shared'
import { FileInterceptor } from '@nestjs/platform-express'
import { Body, Controller, HttpCode, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { exceptionFactory } from '~/common/exceptions'
import { UploadAssetResourcePayload } from '@/asset/dto/payload'
import { AssetUploadService } from '@/asset/domain/upload/service'
import { AssetResourceService } from '@/asset/domain/resource/service'
import { ASSET_MIMETYPE_FILE, ASSET_MIMETYPE_IMAGE, ASSET_MIMETYPE_VIDEO } from '@/asset/constants'

@Controller('admin/asset/upload')
export class AssetUploadAdminController {
  constructor(
    private readonly resource: AssetResourceService,
    private readonly upload: AssetUploadService,
  ) {}

  /**
   * 上传图片素材
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('image')
  @HttpCode(200)
  @Admin()
  async uploadImage(
    @Body() payload: UploadAssetResourcePayload,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: ASSET_MIMETYPE_IMAGE })
      .build({ exceptionFactory }))
    file: Express.Multer.File,
  ) {
    try {
      const path = await this.upload.uploadFile(file)

      await this.resource.create({
        type: AssetType.IMAGE,
        groupId: +payload.groupId,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path,
      })

      return Promise.resolve(path)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  /**
   * 上传视频素材
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('video')
  @HttpCode(200)
  @Admin()
  async uploadVideo(
      @Body() payload: UploadAssetResourcePayload,
      @UploadedFile(new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: ASSET_MIMETYPE_VIDEO })
        .build({ exceptionFactory }))
      file: Express.Multer.File,
  ) {
    try {
      const path = await this.upload.uploadFile(file)

      await this.resource.create({
        type: AssetType.VIDEO,
        groupId: +payload.groupId,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path,
      })

      return Promise.resolve(path)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  /**
   * 上传文件
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  @HttpCode(200)
  @Admin()
  async uploadFile(
      @UploadedFile(new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: ASSET_MIMETYPE_FILE })
        .build({ exceptionFactory }))
      file: Express.Multer.File,
  ) {
    try {
      const path = await this.upload.uploadFile(file)

      return Promise.resolve(path)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }
}
