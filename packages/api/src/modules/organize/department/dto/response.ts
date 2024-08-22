import type {
  IOrganizeDepartment,
  IOrganizeDepartmentDict,
  IOrganizeDepartmentDictTreeItem,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 组织部门 - 响应 DTO
 */
export class OrganizeDepartmentResponse implements IOrganizeDepartment {
  @ApiProperty({ description: '组织部门 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '上级部门 ID', example: 1 })
  readonly parentId: number

  @ApiProperty({ description: '部门描述', example: example.name })
  readonly name: string

  @ApiProperty({ description: '部门描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '排序', example: 1 })
  readonly sort: number

  @ApiProperty({ type: 'datetime', description: '创建日期' })
  readonly createdTime: string

  @ApiProperty({ type: 'datetime', description: '更新日期' })
  readonly updatedTime: string
}

/**
 * 组织部门 - 字典 DTO
 */
export class OrganizeDepartmentDictResponse
  extends PickType(OrganizeDepartmentResponse, ['id', 'name'] as const)
  implements IOrganizeDepartmentDict {}

/**
 * 组织部门树 - 字典 DTO
 */
export class OrganizeDepartmentDictListResponse
  extends PickType(OrganizeDepartmentResponse, ['id', 'parentId', 'name'] as const)
  implements IOrganizeDepartmentDictTreeItem {}
