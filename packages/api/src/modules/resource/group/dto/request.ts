import {
  type IResourceType,
  ResourceType,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator'

/**
 * 获取素材分组请求 DTO
 */
export class GetResourceGroupListRequest {
  @ApiProperty({ description: '素材类型', enum: ResourceType, default: ResourceType.IMAGE })
  @IsEnum(ResourceType, { message: '素材类型不正确' })
  @IsNotEmpty({ message: '素材类型不允许为空' })
  @IsString({ message: '素材类型必须为字符串' })
  readonly type: IResourceType
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
