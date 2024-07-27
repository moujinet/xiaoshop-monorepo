import type { IStaffRole, IStaffRoleDict, IStaffRoleInfo } from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 员工角色响应 DTO
 */
export class RoleResponse implements IStaffRole {
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
 * 员工角色 - 基本信息 - 响应 DTO
 */
export class RoleInfoResponse
  extends PickType(RoleResponse, ['id', 'name', 'permissions'] as const)
  implements IStaffRoleInfo {}

/**
 * 员工角色 - 字典 - 响应 DTO
 */
export class RoleDictResponse
  extends PickType(RoleResponse, ['id', 'name'] as const)
  implements IStaffRoleDict {}
