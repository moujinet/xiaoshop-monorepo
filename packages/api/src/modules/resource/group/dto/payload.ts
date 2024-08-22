import {
  type IResourceType,
  type IYesOrNo,
  ResourceType,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

/**
 * 创建素材分组 DTO
 */
export class ResourceGroupPayload {
  @ApiProperty({ description: '上级分组 ID', default: 0 })
  @IsNumber({}, { message: '上级分组 ID 必须为数字' })
  @IsOptional()
  readonly parentId: number

  @ApiProperty({ enum: ResourceType, description: '素材类型', default: ResourceType.IMAGE })
  @IsEnum(ResourceType, { message: '素材类型不正确' })
  @IsNotEmpty({ message: '素材类型不允许为空' })
  @IsString({ message: '素材类型必须为字符串' })
  readonly type: IResourceType

  @ApiProperty({ description: '分组名称' })
  @MaxLength(32, { message: '分组名称最大长度为 32 位' })
  @IsNotEmpty({ message: '分组名称不允许为空' })
  @IsString({ message: '分组名称必须为字符串' })
  readonly name: string

  @ApiProperty({ enum: YesOrNo, description: '启用图片压缩', default: YesOrNo.NO })
  @IsEnum(YesOrNo, { message: '启用图片压缩不正确' })
  @IsNotEmpty({ message: '启用图片压缩不允许为空' })
  @IsString({ message: '启用图片压缩必须为字符串' })
  readonly enableCompress: IYesOrNo

  @ApiProperty({ enum: YesOrNo, description: '启用图片水印', default: YesOrNo.NO })
  @IsEnum(YesOrNo, { message: '启用图片水印不正确' })
  @IsNotEmpty({ message: '启用图片水印不允许为空' })
  @IsString({ message: '启用图片水印必须为字符串' })
  readonly enableWatermark: IYesOrNo

  @ApiProperty({ enum: YesOrNo, description: '启用图片缩略图', default: YesOrNo.NO })
  @IsEnum(YesOrNo, { message: '启用图片缩略图不正确' })
  @IsNotEmpty({ message: '启用图片缩略图不允许为空' })
  @IsString({ message: '启用图片缩略图必须为字符串' })
  readonly enableThumbnail: IYesOrNo
}
