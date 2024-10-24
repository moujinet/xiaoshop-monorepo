import { type ISystemUserInfo, SystemLogType } from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'

export class CreateSystemLogPayload {
  @IsNumber({}, { message: '日志类型不正确' })
  @IsOptional()
  readonly type?: SystemLogType

  @ValidateIf(o => o.type === SystemLogType.ADMIN)
  @IsNumber({}, { message: '操作用户不正确' })
  @IsOptional()
  readonly userId?: ISystemUserInfo['id']

  @IsString({ message: '日志模块不正确' })
  @IsNotEmpty({ message: '日志模块不可为空' })
  readonly module: string

  @IsString({ message: '日志内容不正确' })
  @IsNotEmpty({ message: '日志内容不可为空' })
  readonly content: string
}
