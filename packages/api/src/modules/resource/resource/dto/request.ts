import {
  type IResourceType,
  ResourceType,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator'
import { PaginationRequest } from '~/common/dto'

/**
 * 查询素材分页列表请求 DTO
 */
export class GetResourcePagesRequest extends PaginationRequest {
  @ApiProperty({ description: '素材类型', enum: ResourceType, default: ResourceType.IMAGE })
  @IsEnum(ResourceType, { message: '素材类型 必须为 image 或 video' })
  @IsNotEmpty({ message: '素材类型 不能为空' })
  @IsString({ message: '素材类型 必须为 image 或 video' })
  readonly type: IResourceType

  @ApiProperty({ required: false, description: '素材分组 ID', example: 0 })
  @IsNumberString({}, { message: '素材分组 ID 必须为数字' })
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ required: false, description: '素材名称', example: '素材名称' })
  @MaxLength(255, { message: '素材名称 最大长度为 255' })
  @IsString({ message: '素材名称 必须为字符串' })
  @IsOptional()
  readonly name: string
}

/**
 * 获取素材请求 DTO
 */
export class GetResourceRequest {
  @ApiProperty({ description: '素材 ID', example: 1 })
  @IsNumberString({}, { message: '素材 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除素材请求 DTO
 */
export class DeleteResourceRequest {
  @ApiProperty({ description: '素材 ID', example: 1 })
  @IsNumber({}, { message: '素材 ID 必须为数字' })
  readonly id: number
}
