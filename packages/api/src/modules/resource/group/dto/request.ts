import {
  ResourceType,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取素材分组请求 DTO
 */
export class GetResourceGroupListRequest {
  @ApiProperty({ description: '素材类型', enum: ResourceType, default: ResourceType.IMAGE })
  @IsNumberString({}, { message: '素材类型不正确' })
  readonly type: ResourceType
}

/**
 * 获取素材分组请求 DTO
 */
export class GetResourceGroupRequest {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNumberString({}, { message: '素材分组 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除素材分组请求 DTO
 */
export class DeleteResourceGroupRequest {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNumber({}, { message: '素材分组 ID 必须为数字' })
  readonly id: number
}
