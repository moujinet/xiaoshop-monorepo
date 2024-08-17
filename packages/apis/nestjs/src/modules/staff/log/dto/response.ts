import {
  type IStaffAccountInfo,
  type IStaffLog,
  type IStaffLogExtra,
  type IStaffLogType,
  StaffLogType,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

export class StaffLogResponse implements IStaffLog {
  @ApiProperty({ description: '日志 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '操作员工 ID', example: 1 })
  readonly staffId: number

  @ApiProperty({ description: '操作员工', example: example.staff })
  readonly staff: IStaffAccountInfo

  @ApiProperty({ description: '日志类型', enum: StaffLogType, example: example.type })
  readonly type: IStaffLogType

  @ApiProperty({ description: '操作模块', example: 'module' })
  readonly module: string

  @ApiProperty({ description: '日志操作', example: example.action })
  readonly action: string

  @ApiProperty({ description: '日志内容', example: example.content })
  readonly content: string

  @ApiProperty({ description: '额外信息', example: example.extra })
  readonly extra: IStaffLogExtra

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  readonly createdTime: string
}
