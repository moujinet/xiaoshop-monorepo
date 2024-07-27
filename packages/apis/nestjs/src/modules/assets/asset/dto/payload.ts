import {
  AssetType,
  Enabled,
  type IAssetType,
  type IAssetUploadOptions,
  type IEnabled,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator'

/**
 * 上传素材文件信息 DTO
 */
export class UploadAssetFilePayload {
  @ApiProperty({ description: '文件名', example: 'filename' })
  readonly name: string

  @ApiProperty({ description: '文件路径', example: 'path/to/file' })
  readonly path: string

  @ApiProperty({ description: '文件大小', example: 0 })
  readonly size: number
}

/**
 * 上传素材图片选项 DTO
 */
export class UploadAssetImageOptionsPayload implements IAssetUploadOptions {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNotEmpty()
  @IsNumberString()
  readonly groupId: string

  @ApiProperty({ description: '素材类型', enum: AssetType, default: AssetType.IMAGE })
  @IsEnum(AssetType)
  @IsNotEmpty()
  @IsString()
  readonly type: IAssetType

  @ApiProperty({ description: '是否开启压缩', enum: Enabled, default: Enabled.NO })
  @IsEnum(Enabled)
  @IsNotEmpty()
  @IsString()
  readonly enableCompress: IEnabled

  @ApiProperty({ description: '是否开启缩略图', enum: Enabled, default: Enabled.NO })
  @IsEnum(Enabled)
  @IsNotEmpty()
  @IsString()
  readonly enableThumbnail: IEnabled

  @ApiProperty({ description: '是否开启水印', enum: Enabled, default: Enabled.NO })
  @IsEnum(Enabled)
  @IsNotEmpty()
  @IsString()
  readonly enableWatermark: IEnabled
}

/**
 * 上传素材视频选项 DTO
 */
export class UploadAssetVideoOptionsPayload {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNotEmpty()
  @IsNumberString()
  readonly groupId: string

  @ApiProperty({ description: '素材类型', enum: AssetType, default: AssetType.IMAGE })
  @IsEnum(AssetType)
  @IsNotEmpty()
  @IsString()
  readonly type: IAssetType
}
