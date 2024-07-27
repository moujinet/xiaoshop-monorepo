import type { IAssetGroup, IAssetType, IEnabled } from '@xiaoshop/schema'
import { Enabled } from '@xiaoshop/schema'
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

  @ApiProperty({ description: '启用图片压缩', default: Enabled.NO })
  enableCompress: IEnabled

  @ApiProperty({ description: '启用图片水印', default: Enabled.NO })
  enableWatermark: IEnabled

  @ApiProperty({ description: '启用图片缩略图', default: Enabled.NO })
  enableThumbnail: IEnabled

  @ApiProperty({ description: '创建时间' })
  createdTime: string
}
