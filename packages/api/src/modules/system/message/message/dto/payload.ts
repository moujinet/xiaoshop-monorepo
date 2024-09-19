import type { SystemMessageScene, SystemMessageType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, NotEquals } from 'class-validator'

export class SystemMessagePayload {
  @IsNumber({}, { message: '用户 ID 不正确' })
  @NotEquals(0, { message: '用户 ID 不能为 0' })
  readonly receiverId: number

  @IsNumber({}, { message: '消息类型不正确' })
  @IsOptional()
  readonly type?: SystemMessageType

  @IsNumber({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene?: SystemMessageScene

  @IsString({ message: '消息标题不正确' })
  @IsNotEmpty({ message: '消息标题不能为空' })
  readonly title: string

  @IsString({ message: '消息内容不正确' })
  @IsNotEmpty({ message: '消息内容不能为空' })
  readonly content: string

  @IsObject({ message: '附加数据不正确' })
  @IsOptional()
  readonly extras?: Record<string, any>
}
