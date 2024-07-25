import type { IStaffDepartment, IStaffDepartmentDict } from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 组织部门 - 响应 DTO
 */
export class DepartmentResponse implements IStaffDepartment {
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
}

/**
 * 组织部门 - 关联 DTO
 */
export class DepartmentDictResponse
  extends PickType(DepartmentResponse, ['id', 'name'])
  implements IStaffDepartmentDict {}
