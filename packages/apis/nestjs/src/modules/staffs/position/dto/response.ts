import type { IStaffDepartmentDict, IStaffPosition, IStaffPositionDict } from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { DepartmentDictResponse } from '@/staffs/department/dto'
import { example } from '@/staffs/position/dto/example'

/**
 * 组织职位 - 响应 DTO
 */
export class PositionResponse implements IStaffPosition {
  @ApiProperty({ description: '组织职位 ID', example: 1 })
  readonly id: number

  @ApiProperty({ type: DepartmentDictResponse, description: '所属部门' })
  readonly department: IStaffDepartmentDict

  @ApiProperty({ description: '职位描述', example: example.name })
  readonly name: string

  @ApiProperty({ description: '职位描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '排序', example: 1 })
  readonly sort: number

  @ApiProperty({ type: 'datetime', description: '创建日期' })
  readonly createdTime: string
}

/**
 * 组织职位 - 关联 DTO
 */
export class PositionDictResponse
  extends PickType(PositionResponse, ['id', 'name'])
  implements IStaffPositionDict {}
