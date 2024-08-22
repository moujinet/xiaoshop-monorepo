import type {
  IAuthRole,
  IAuthRoleDict,
  IAuthRoleListItem,
  IAuthRolePermissions,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 员工角色响应 DTO
 */
export class AuthRoleResponse implements IAuthRole {
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

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 员工角色 - 列表 - 响应 DTO
 */
export class AuthRoleListResponse
  extends PickType(AuthRoleResponse, ['id', 'name', 'desc', 'sort', 'updatedTime'] as const)
  implements IAuthRoleListItem {}

/**
 * 员工角色 - 权限信息 - 响应 DTO
 */
export class AuthRolePermissionsResponse
  extends PickType(AuthRoleResponse, ['id', 'name', 'permissions'] as const)
  implements IAuthRolePermissions {}

/**
 * 员工角色 - 字典 - 响应 DTO
 */
export class AuthRoleDictResponse
  extends PickType(AuthRoleResponse, ['id', 'name'] as const)
  implements IAuthRoleDict {}
