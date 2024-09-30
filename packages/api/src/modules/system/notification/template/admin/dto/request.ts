import type { SystemNotificationScene, SystemNotificationType } from '@xiaoshop/shared'

import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator'

export class GetSystemNotificationTemplateListRequest {
  @IsNumberString({}, { message: '通知类型不正确' })
  @IsOptional()
  readonly type?: SystemNotificationType

  @IsNumberString({}, { message: '通知场景不正确' })
  @IsOptional()
  readonly scene?: SystemNotificationScene
}

export class GetSystemNotificationTemplateInfoRequest {
  @IsNumberString({}, { message: '通知模板 ID 不正确' })
  @IsNotEmpty({ message: '通知模板 ID 不能为空' })
  readonly id: number
}
