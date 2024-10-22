import type { AssetType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

/**
 * Query Asset Group List By Type
 */
export class GetAssetGroupListRequest {
  @IsNumberString({}, { message: '素材分组类型不正确' })
  @IsNotEmpty({ message: '素材分组类型不能为空' })
  readonly type: AssetType
}

/**
 * Get Asset Group
 */
export class GetAssetGroupRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Asset Group
 */
export class DeleteAssetGroupRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}

/**
 * Query Asset Resource Pages
 */
export class GetAssetResourcePagesRequest extends PaginationDto {
  @IsNumberString({}, { message: '素材类型不正确' })
  @IsNotEmpty({ message: '素材类型不能为空' })
  readonly type: AssetType

  @IsNumberString({}, { message: '素材分组 ID 不正确' })
  @IsOptional()
  readonly groupId?: number

  @IsString({ message: '素材名称不正确' })
  @IsOptional()
  readonly name?: string
}

/**
 * Get Asset Resource
 */
export class GetAssetResourceRequest {
  @IsNumberString({}, { message: 'ID 不正确' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  readonly id: number
}

/**
 * Delete Asset Resource
 */
export class DeleteAssetResourceRequest {
  @IsNumber({}, { message: 'ID 不正确' })
  readonly id: number
}
