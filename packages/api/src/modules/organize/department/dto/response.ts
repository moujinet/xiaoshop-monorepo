import type {
  IOrganizeDepartmentDict,
  IOrganizeDepartmentDictTree,
  IOrganizeDepartmentInfo,
  IOrganizeDepartmentList,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 组织部门列表
 */
export class OrganizeDepartmentListResponse implements IOrganizeDepartmentList {
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

  @ApiProperty({ type: 'datetime', description: '更新日期' })
  readonly updatedTime: string
}

/**
 * 组织部门
 */
export class OrganizeDepartmentDictResponse
  extends PickType(OrganizeDepartmentListResponse, [
    'id',
    'name',
  ] as const)
  implements IOrganizeDepartmentDict {}

/**
 * 组织部门树
 */
export class OrganizeDepartmentDictTreeResponse
  extends PickType(OrganizeDepartmentListResponse, [
    'id',
    'parentId',
    'name',
  ] as const)
  implements IOrganizeDepartmentDictTree {}

/**
 * 组织部门详情
 */
export class OrganizeDepartmentInfoResponse
  extends PickType(OrganizeDepartmentListResponse, [
    'id',
    'parentId',
    'name',
    'desc',
    'sort',
  ] as const)
  implements IOrganizeDepartmentInfo {}
