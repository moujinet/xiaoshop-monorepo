import type { SystemLogLevel, SystemLogType } from '@xiaoshop/shared'

import { IsNumberString, IsOptional, IsString } from 'class-validator'

import { PaginationRequest } from '~/common/dto'

export class GetSystemLogPagesRequest extends PaginationRequest {
  @IsNumberString({}, { message: '日志类型不正确' })
  @IsOptional()
  readonly type?: SystemLogType

  @IsNumberString({}, { message: '日志级别不正确' })
  @IsOptional()
  readonly level?: SystemLogLevel

  @IsString({ message: '日志模块不正确' })
  @IsOptional()
  readonly module?: string

  @IsString({ message: '操作人姓名不正确' })
  @IsOptional()
  readonly name?: string

  @IsString({ message: '操作人手机号不正确' })
  @IsOptional()
  readonly mobile?: string

  @IsString({ message: '操作时间不正确' })
  @IsOptional()
  readonly createdTime?: string
}
