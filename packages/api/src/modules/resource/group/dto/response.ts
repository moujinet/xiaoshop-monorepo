import {
  type IResourceGroup,
  type IResourceType,
  type IYesOrNo,
  ResourceType,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 素材分组响应 DTO
 */
export class ResourceGroupResponse implements IResourceGroup {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '上级分组 ID', example: 0 })
  readonly parentId: number

  @ApiProperty({ description: '素材类型', example: ResourceType.IMAGE })
  readonly type: IResourceType

  @ApiProperty({ description: '分组名称', example: '图片' })
  readonly name: string

  @ApiProperty({ description: '启用图片压缩', default: YesOrNo.NO })
  readonly enableCompress: IYesOrNo

  @ApiProperty({ description: '启用图片水印', default: YesOrNo.NO })
  readonly enableWatermark: IYesOrNo

  @ApiProperty({ description: '启用图片缩略图', default: YesOrNo.NO })
  readonly enableThumbnail: IYesOrNo

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}
