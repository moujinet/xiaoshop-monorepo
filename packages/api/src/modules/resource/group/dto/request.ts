import type { ResourceType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

export class GetResourceGroupNestedListRequest {
  @IsNumberString({}, { message: '素材分组类型不正确' })
  @IsNotEmpty({ message: '素材分组类型不能为空' })
  readonly type: ResourceType
}

export class GetResourceGroupInfoRequest {
  @IsNumberString({}, { message: '素材分组 ID 不正确' })
  @IsNotEmpty({ message: '素材分组 ID 不能为空' })
  readonly id: number
}

export class DeleteResourceGroupRequest {
  @IsNumber({}, { message: '素材分组 ID 不正确' })
  readonly id: number
}
