import { AssetType, IAssetType } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator'
import { PaginationQueryDto } from '~/common'

/**
 * 查询素材分页列表请求 DTO
 */
export class GetAssetPagesRequest extends PaginationQueryDto {
  @ApiProperty({ description: '素材类型', enum: AssetType, default: AssetType.IMAGE })
  @IsEnum(AssetType)
  @IsNotEmpty()
  @IsString()
  readonly type: IAssetType

  @ApiProperty({ required: false, description: '素材名称', example: '素材名称' })
  @MaxLength(200)
  @IsString()
  @IsOptional()
  readonly name: string

  @ApiProperty({ required: false, description: '素材分组 ID', example: 0 })
  @IsNumberString()
  @IsOptional()
  readonly groupId: number
}

/**
 * 获取素材请求 DTO
 */
export class GetAssetRequest {
  @ApiProperty({ description: '素材 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除素材请求 DTO
 */
export class DeleteAssetRequest {
  @ApiProperty({ description: '素材 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
