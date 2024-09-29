import { AdminEvent } from '~/common/events/event.admin'
import { MODULE_NAME } from '@/system/setting/constants'

/**
 * 系统设置更新事件
 */
export class SystemSettingUpdateEvent extends AdminEvent {
  constructor(
    public readonly key: string,
    public readonly value: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新系统设置 ${this.key}: ${this.value}`
  }
}
