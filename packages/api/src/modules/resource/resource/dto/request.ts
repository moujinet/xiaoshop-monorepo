import type { ResourceType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetResourcePagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '素材类型不正确' })
  @IsNotEmpty({ message: '素材类型不能为空' })
  readonly type: ResourceType

  @IsNumberString({}, { message: '素材分组 ID 不正确' })
  @IsOptional()
  readonly groupId?: number

  @IsString({ message: '素材名称不正确' })
  @IsOptional()
  readonly name?: string
}

export class GetResourceInfoRequest {
  @IsNumberString({}, { message: '素材 ID 不正确' })
  @IsNotEmpty({ message: '素材 ID 不能为空' })
  readonly id: number
}

export class DeleteResourceInfoRequest {
  @IsNumber({}, { message: '素材 ID 不正确' })
  readonly id: number
}
