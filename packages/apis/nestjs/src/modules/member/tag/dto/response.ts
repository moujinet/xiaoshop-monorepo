import type { IMemberTag, IMemberTagDict } from '@xiaoshop/schema'
import { ApiProperty, OmitType } from '@nestjs/swagger'
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
}

/**
 * 会员标签关联响应 DTO
 */
export class MemberTagRelationResponse
  extends OmitType(MemberTagResponse, ['createdTime'])
  implements IMemberTagDict {}
