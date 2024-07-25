import type { IAssetGroup, IAssetType, IEnabled } from '@xiaoshop/schema'
import { EnabledEnum } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 素材分组响应 DTO
 */
export class AssetGroupResponse implements IAssetGroup {
  @ApiProperty({ description: '素材分组 ID' })
  id: number

  @ApiProperty({ description: '上级分组 ID' })
  parentId: number

  @ApiProperty({ description: '素材类型' })
  type: IAssetType

  @ApiProperty({ description: '分组名称' })
  name: string

  @ApiProperty({ description: '启用图片压缩', default: EnabledEnum.YES })
  enableCompress: IEnabled

  @ApiProperty({ description: '启用图片水印', default: EnabledEnum.YES })
  enableWatermark: IEnabled

  @ApiProperty({ description: '启用图片缩略图', default: EnabledEnum.YES })
  enableThumbnail: IEnabled

  @ApiProperty({ description: '创建时间' })
  createdTime: string
}
