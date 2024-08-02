import type { IMemberTag, IMemberTagDict, IMemberTagListItem } from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 获取会员标签响应 DTO
 */
export class MemberTagResponse implements IMemberTag {
  @ApiProperty({ description: '会员标签 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员标签名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 会员标签字典响应 DTO
 */
export class MemberTagDictResponse
  extends PickType(MemberTagResponse, ['id', 'name'])
  implements IMemberTagDict {}

/**
 * 会员标签列表响应 DTO
 */
export class MemberTagListResponse
  extends PickType(MemberTagResponse, ['id', 'name', 'updatedTime'])
  implements IMemberTagListItem {}
