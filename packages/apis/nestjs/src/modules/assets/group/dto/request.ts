import { AssetTypeEnum, type IAssetType } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator'

/**
 * 获取素材分组请求 DTO
 */
export class GetAssetGroupListRequest {
  @ApiProperty({ description: '素材类型', enum: AssetTypeEnum, default: AssetTypeEnum.IMAGE })
  @IsEnum(AssetTypeEnum)
  @IsNotEmpty()
  @IsString()
  readonly type: IAssetType
}

/**
 * 获取素材分组请求 DTO
 */
export class GetAssetGroupRequest {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除素材分组请求 DTO
 */
export class DeleteAssetGroupRequest {
  @ApiProperty({ description: '素材分组 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
