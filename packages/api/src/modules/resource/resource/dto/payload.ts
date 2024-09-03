import { YesOrNo } from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'

/**
 * 上传素材文件信息 DTO
 */
export class ResourceUploadFilePayload {
  @ApiProperty({ description: '文件名', example: 'filename' })
  readonly name: string

  @ApiProperty({ description: '文件路径', example: 'path/to/file' })
  readonly path: string

  @ApiProperty({ description: '文件 MIME 类型', example: 'image/png' })
  readonly mimeType: string

  @ApiProperty({ description: '文件大小', example: 0 })
  readonly size: number
}

/**
 * 上传素材图片选项 DTO
 */
export class ResourceUploadImageOptionsPayload {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNumberString({}, { message: '素材分组 ID 必须为数字' })
  readonly groupId: number

  @ApiProperty({ description: '是否开启压缩', enum: YesOrNo, default: YesOrNo.NO })
  @IsNumberString({}, { message: '是否开启压缩不正确' })
  readonly enableCompress: YesOrNo

  @ApiProperty({ description: '是否开启缩略图', enum: YesOrNo, default: YesOrNo.NO })
  @IsNumberString({}, { message: '是否开启缩略图不正确' })
  readonly enableThumbnail: YesOrNo

  @ApiProperty({ description: '是否开启水印', enum: YesOrNo, default: YesOrNo.NO })
  @IsNumberString({}, { message: '是否开启水印不正确' })
  readonly enableWatermark: YesOrNo
}

/**
 * 上传素材视频选项 DTO
 */
export class ResourceUploadVideoOptionsPayload {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNumberString({}, { message: '素材分组 ID 必须为数字' })
  readonly groupId: number
}
