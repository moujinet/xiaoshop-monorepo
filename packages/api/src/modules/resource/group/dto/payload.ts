import type { ResourceType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ResourceGroupPayload {
  @IsNumber({}, { message: '素材分组类型不正确' })
  @IsOptional()
  readonly type?: ResourceType

  @IsNumber({}, { message: '上级素材分组不正确' })
  @IsOptional()
  readonly parentId?: number

  @IsString({ message: '素材分组名称不正确' })
  @IsNotEmpty({ message: '素材分组名称不能为空' })
  readonly name: string

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
