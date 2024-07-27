import { AssetType, Enabled, type IAssetType } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

/**
 * 创建素材分组 DTO
 */
export class AssetGroupPayload {
  @ApiProperty({ description: '上级分组 ID', default: 0 })
  @IsNumber()
  readonly parentId: number

  @ApiProperty({ enum: AssetType, description: '素材类型', default: AssetType.IMAGE })
  @IsEnum(AssetType)
  @IsNotEmpty()
  @IsString()
  readonly type: IAssetType

  @ApiProperty({ description: '分组名称' })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ enum: Enabled, description: '启用图片压缩', default: Enabled.NO })
  @IsEnum(Enabled)
  @IsNotEmpty()
  @IsString()
  readonly enableCompress: Enabled

  @ApiProperty({ enum: Enabled, description: '启用图片水印', default: Enabled.NO })
  @IsEnum(Enabled)
  @IsNotEmpty()
  @IsString()
  readonly enableWatermark: Enabled

  @ApiProperty({ enum: Enabled, description: '启用图片缩略图', default: Enabled.NO })
  @IsEnum(Enabled)
  @IsNotEmpty()
  @IsString()
  readonly enableThumbnail: Enabled
}
