import type { IAsset, IAssetGroupInfo, IAssetListItem, IAssetType } from '@xiaoshop/schema'
import { AssetType } from '@xiaoshop/schema'
import { ApiProperty, OmitType } from '@nestjs/swagger'

/**
 * 素材响应 DTO
 */
export class AssetResponse implements IAsset {
  @ApiProperty({ description: '素材 ID' })
  readonly id: number

  @ApiProperty({ description: '素材分组', example: { id: 1, name: '图片', enableCompress: 'Y', enableWatermark: 'Y', enableThumbnail: 'Y' } })
  readonly group: IAssetGroupInfo

  @ApiProperty({ description: '素材类型', enum: AssetType, example: AssetType.IMAGE })
  readonly type: IAssetType

  @ApiProperty({ description: '文件名称', example: 'image.png' })
  readonly name: string

  @ApiProperty({ description: '文件路径', example: 'https://example.com/image.png' })
  readonly path: string

  @ApiProperty({ description: '文件大小', example: 0 })
  readonly size: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string
}

/**
 * 素材分页响应 DTO
 */
export class AssetListItemResponse
  extends OmitType(AssetResponse, ['group'])
  implements IAssetListItem {}
