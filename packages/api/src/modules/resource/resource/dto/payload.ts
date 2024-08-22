import {
  type IYesOrNo,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator'

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
  @IsNotEmpty({ message: '素材分组 ID 不能为空' })
  readonly groupId: number

  @ApiProperty({ description: '是否开启压缩', enum: YesOrNo, default: YesOrNo.NO })
  @IsEnum(YesOrNo, { message: '是否开启压缩 必须为 Y 或 N' })
  @IsString({ message: '是否开启压缩 必须为 Y 或 N' })
  @IsNotEmpty({ message: '是否开启压缩 不能为空' })
  readonly enableCompress: IYesOrNo

  @ApiProperty({ description: '是否开启缩略图', enum: YesOrNo, default: YesOrNo.NO })
  @IsEnum(YesOrNo, { message: '是否开启缩略图 必须为 Y 或 N' })
  @IsString({ message: '是否开启缩略图 必须为 Y 或 N' })
  @IsNotEmpty({ message: '是否开启缩略图 不能为空' })
  readonly enableThumbnail: IYesOrNo

  @ApiProperty({ description: '是否开启水印', enum: YesOrNo, default: YesOrNo.NO })
  @IsEnum(YesOrNo, { message: '是否开启水印 必须为 Y 或 N' })
  @IsString({ message: '是否开启水印 必须为 Y 或 N' })
  @IsNotEmpty({ message: '是否开启水印 不能为空' })
  readonly enableWatermark: IYesOrNo
}

/**
 * 上传素材视频选项 DTO
 */
export class ResourceUploadVideoOptionsPayload {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNumberString({}, { message: '素材分组 ID 必须为数字' })
  @IsNotEmpty({ message: '素材分组 ID 不能为空' })
  readonly groupId: number
}
