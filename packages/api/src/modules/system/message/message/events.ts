import type {
  ISystemMessageTemplateInfo,
  SystemMessageSendStatus,
} from '@xiaoshop/shared'

import type { SystemMessage } from './entity'

import { LogBasedEvent } from '~/common/events'

import { MODULE_NAME } from '../constants'

/**
 * 系统消息发送事件
 */
export class SystemMessageSentEvent extends LogBasedEvent {
  constructor(
    public readonly templateId: ISystemMessageTemplateInfo['id'],
    public readonly message: SystemMessage,
    public readonly status: SystemMessageSendStatus,
  ) {
    super(MODULE_NAME)
  }
}
