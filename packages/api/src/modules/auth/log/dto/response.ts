import {
  AuthLogType,
  type IAuthLog,
  type IAuthLogType,
  type IAuthUserInfo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 获取员工操作日志响应 DTO
 */
export class AuthLogResponse implements IAuthLog {
  @ApiProperty({ description: '日志 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '日志类型', enum: AuthLogType, example: example.type })
  readonly type: IAuthLogType

  @ApiProperty({ description: '操作员工 ID', example: 1 })
  readonly userId: number

  @ApiProperty({ description: '操作员工', example: example.user })
  readonly user: IAuthUserInfo

  @ApiProperty({ description: '操作模块', example: example.module })
  readonly module: string

  @ApiProperty({ description: '日志内容', example: example.content })
  readonly content: string

  @ApiProperty({ description: '操作设备', example: example.device })
  readonly device: string

  @ApiProperty({ description: '操作 IP', example: example.ip })
  readonly ip: string

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  readonly createdTime: string
}
