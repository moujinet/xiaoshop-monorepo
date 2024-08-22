import type {
  IOrganizeDepartmentDict,
  IOrganizePosition,
  IOrganizePositionDict,
} from '@xiaoshop/shared'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 组织职位 - 响应 DTO
 */
export class OrganizePositionResponse implements IOrganizePosition {
  @ApiProperty({ description: '组织职位 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '部门 ID', example: 1 })
  readonly departmentId: number

  @ApiProperty({ description: '所属部门', example: { id: 1, name: '部门名称' } })
  readonly department: IOrganizeDepartmentDict

  @ApiProperty({ description: '职位描述', example: example.name })
  readonly name: string

  @ApiProperty({ description: '职位描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '排序', example: 1 })
  readonly sort: number

  @ApiProperty({ type: 'datetime', description: '创建日期' })
  readonly createdTime: string

  @ApiProperty({ type: 'datetime', description: '创建日期' })
  readonly updatedTime: string
}

/**
 * 组织职位 - 字典 DTO
 */
export class OrganizePositionDictResponse
  extends PickType(OrganizePositionResponse, ['id', 'name'] as const)
  implements IOrganizePositionDict {}
