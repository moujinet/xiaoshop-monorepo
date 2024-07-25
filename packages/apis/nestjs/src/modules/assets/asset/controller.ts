import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { AssetTypeEnum } from '@xiaoshop/schema'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Inject, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { AssetService } from '@/assets/asset/service'
import { UploadService } from '@/upload/upload.service'
import { ASSET_PROCESSOR_IMAGE, ASSET_QUEUE_ID } from '@/assets/constants'
import { UPLOAD_IMAGE_MIMETYPE, UPLOAD_VIDEO_MIMETYPE } from '@/upload/constants'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND, exceptionFactory } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiObjectResponse, ApiPaginatedResponse } from '~/common/response/decorators'
import { IAssetImageProcessJob } from '@/assets/interface'
import {
  AssetListItemResponse,
  AssetResponse,
  DeleteAssetRequest,
  GetAssetPagesRequest,
  GetAssetRequest,
  UploadAssetImageOptionsPayload,
  UploadAssetVideoOptionsPayload,
} from '@/assets/asset/dto'

@ApiTags('素材列表')
@Controller('assets')
export class AssetController {
  constructor(
    private readonly asset: AssetService,

    @Inject(UploadService)
    private readonly upload: UploadService,

    @InjectQueue(ASSET_QUEUE_ID)
    private readonly queue: Queue<IAssetImageProcessJob>,
  ) {}

  @ApiOperation({
    summary: '获取素材列表',
  })
  @ApiPaginatedResponse(AssetListItemResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetAssetPagesRequest) {
    return this.asset.findPages(query)
  }

  @ApiOperation({
    summary: '获取素材详情',
  })
  @ApiObjectResponse(AssetResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '素材不存在' })
  @Get('detail')
  async detail(@Query() query: GetAssetRequest) {
    return this.asset.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '上传素材 - 图片',
    description: `仅支持 \`image/jpg\` \`image/jpeg\` \`image/png\` \`image/gif\` 格式的图片`,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiDoneResponse('上传成功')
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('upload/image')
  @HttpCode(200)
  async uploadImage(
    @Body() options: UploadAssetImageOptionsPayload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: UPLOAD_IMAGE_MIMETYPE })
        .build({ exceptionFactory }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const filePath = await this.upload.dest(file)

      await this.asset.create(options, {
        name: file.originalname,
        path: filePath,
        size: file.size,
      })

      // 图片处理队列
      if (options.type === AssetTypeEnum.IMAGE) {
        await this.queue.add(
          ASSET_PROCESSOR_IMAGE,
          {
            file: filePath,
            enableCompress: options.enableCompress,
            enableWatermark: options.enableWatermark,
            enableThumbnail: options.enableThumbnail,
          },
        )
      }

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiDoneResponse('上传成功')
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('upload/video')
  @HttpCode(200)
  async uploadVideo(
    @Body() options: UploadAssetVideoOptionsPayload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: UPLOAD_VIDEO_MIMETYPE })
        .build({ exceptionFactory }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const filePath = await this.upload.dest(file)

      await this.asset.create(options, {
        name: file.originalname,
        path: filePath,
        size: file.size,
      })

      return Promise.resolve(filePath)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  @ApiOperation({
    summary: '删除素材',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteAssetRequest) {
    return this.asset.delete(data.id)
  }
}
