import {
  type IStaffAccountInfo,
  type IStaffLogExtra,
  type IStaffLogType,
  StaffLogType,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { StaffLogExtraPayload } from '@/staffs/log/dto'
import { AccountInfoPayload } from '@/staffs/account/dto'

export class StaffLogResponse {
  @ApiProperty({ description: '日志 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '日志类型', enum: StaffLogType, example: example.type })
  readonly type: IStaffLogType

  @ApiProperty({ type: AccountInfoPayload, description: '操作员工', example: example.staff })
  readonly staff: IStaffAccountInfo

  @ApiProperty({ description: '日志操作', example: example.action })
  readonly action: string

  @ApiProperty({ description: '日志内容', example: example.content })
  readonly content: string

  @ApiProperty({ type: StaffLogExtraPayload, description: '额外信息' })
  readonly extra: IStaffLogExtra

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  readonly createdTime: string
}
