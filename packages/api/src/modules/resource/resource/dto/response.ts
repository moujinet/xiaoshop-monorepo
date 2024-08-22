import {
  type IResource,
  type IResourceGroupInfo,
  type IResourceListItem,
  type IResourceType,
  ResourceType,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'

/**
 * 素材响应 DTO
 */
export class ResourceResponse implements IResource {
  @ApiProperty({ description: '素材 ID' })
  readonly id: number

  @ApiProperty({ description: '素材分组 ID' })
  readonly groupId: number

  @ApiProperty({ description: '素材分组', example: { name: '图片', enableCompress: 'Y', enableWatermark: 'Y', enableThumbnail: 'Y' } })
  readonly group: IResourceGroupInfo

  @ApiProperty({ description: '素材类型', enum: ResourceType, example: ResourceType.IMAGE })
  readonly type: IResourceType

  @ApiProperty({ description: '文件名称', example: 'image.png' })
  readonly name: string

  @ApiProperty({ description: '文件 MIME 类型', example: 'image/png' })
  readonly mimeType: string

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
export class ResourceListResponse
  extends PickType(ResourceResponse, [
    'id',
    'type',
    'groupId',
    'group',
    'name',
    'mimeType',
    'path',
    'size',
    'createdTime',
  ])
  implements IResourceListItem {}
