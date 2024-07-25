import { AssetTypeEnum, EnabledEnum, type IAssetType } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

/**
 * 创建素材分组 DTO
 */
export class AssetGroupPayload {
  @ApiProperty({ description: '上级分组 ID', default: 0 })
  @IsNumber()
  readonly parentId: number

  @ApiProperty({ enum: AssetTypeEnum, description: '素材类型', default: AssetTypeEnum.IMAGE })
  @IsEnum(AssetTypeEnum)
  @IsNotEmpty()
  @IsString()
  readonly type: IAssetType

  @ApiProperty({ description: '分组名称' })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ enum: EnabledEnum, description: '启用图片压缩', default: EnabledEnum.YES })
  @IsEnum(EnabledEnum)
  @IsNotEmpty()
  @IsString()
  readonly enableCompress: EnabledEnum

  @ApiProperty({ enum: EnabledEnum, description: '启用图片水印', default: EnabledEnum.YES })
  @IsEnum(EnabledEnum)
  @IsNotEmpty()
  @IsString()
  readonly enableWatermark: EnabledEnum

  @ApiProperty({ enum: EnabledEnum, description: '启用图片缩略图', default: EnabledEnum.YES })
  @IsEnum(EnabledEnum)
  @IsNotEmpty()
  @IsString()
  readonly enableThumbnail: EnabledEnum
}
