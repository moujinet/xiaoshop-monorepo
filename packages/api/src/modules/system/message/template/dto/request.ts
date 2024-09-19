import type { SystemMessageScene, SystemMessageType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator'

export class GetSystemMessageTemplateListRequest {
  @IsNumberString({}, { message: '消息类型不正确' })
  @IsOptional()
  readonly type?: SystemMessageType

  @IsNumberString({}, { message: '消息场景不正确' })
  @IsOptional()
  readonly scene?: SystemMessageScene
}

export class GetSystemMessageTemplateInfoRequest {
  @IsNumberString({}, { message: '消息模板 ID 不正确' })
  @IsNotEmpty({ message: '消息模板 ID 不能为空' })
  readonly id: number
}
