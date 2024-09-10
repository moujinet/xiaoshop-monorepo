import type {
  IAuthRoleDict,
  IAuthRoleInfo,
  IAuthRoleList,
  IAuthRolePermissions,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

export class AuthRoleInfoResponse implements IAuthRoleInfo {
  @ApiProperty({ description: '角色 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '角色名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '角色描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '角色权限', example: example.permissions })
  readonly permissions: string[]

  @ApiProperty({ description: '排序', default: 1 })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string
}

export class AuthRoleListResponse
  extends PickType(AuthRoleInfoResponse, [
    'id',
    'name',
    'desc',
    'sort',
  ] as const)
  implements IAuthRoleList {
  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

export class AuthRolePermissionsResponse
  extends PickType(AuthRoleInfoResponse, [
    'id',
    'name',
    'permissions',
  ] as const)
  implements IAuthRolePermissions {}

export class AuthRoleDictResponse
  extends PickType(AuthRoleInfoResponse, [
    'id',
    'name',
  ] as const)
  implements IAuthRoleDict {}
