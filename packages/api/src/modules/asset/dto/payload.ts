import type { AssetType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min } from 'class-validator'

/**
 * Create Asset Group
 */
export class CreateAssetGroupPayload {
  @IsString({ message: '素材分组名称不正确' })
  @IsNotEmpty({ message: '素材分组名称不能为空' })
  readonly name: string

  @IsNumber({}, { message: '素材分组类型不正确' })
  @IsOptional()
  readonly type?: AssetType

  @IsNumber({}, { message: '上级素材分组不正确' })
  @IsOptional()
  readonly parentId?: number

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number

  @IsNumber({}, { message: '是否启用压缩不正确' })
  @IsOptional()
  readonly enableCompress?: number

  @IsNumber({}, { message: '是否启用水印不正确' })
  @IsOptional()
  readonly enableWatermark?: number

  @IsNumber({}, { message: '是否启用缩略图不正确' })
  @IsOptional()
  readonly enableThumbnail?: number
}

/**
 * Update Asset Group
 */
export class UpdateAssetGroupPayload extends CreateAssetGroupPayload {}

/**
 * Upload Asset Resource Payload
 */
export class UploadAssetResourcePayload {
  @IsNumberString({}, { message: '素材分组 ID 不正确' })
  readonly groupId: number
}

/**
 * Asset Resource Payload
 */
export class AssetResourcePayload {
  @IsNumber({}, { message: '素材类型不正确' })
  readonly type: AssetType

  @IsNumber({}, { message: '素材分组 ID 不正确' })
  readonly groupId: number

  @IsString({ message: '素材名称不正确' })
  @IsNotEmpty({ message: '素材名称不能为空' })
  readonly name: string

  @IsString({ message: '文件类型不正确' })
  @IsNotEmpty({ message: '文件类型不能为空' })
  readonly mimeType: string

  @IsString({ message: '文件路径不正确' })
  @IsNotEmpty({ message: '文件路径不能为空' })
  readonly path: string

  @IsNumber({}, { message: '文件大小不正确' })
  @Min(0, { message: '文件大小不正确' })
  readonly size: number
}
