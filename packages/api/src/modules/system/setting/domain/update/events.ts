import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/system/setting/constants'

/**
 * 系统设置更新事件
 */
export class SystemSettingUpdateEvent extends AdminEvent {
  constructor(
    readonly key: string,
    readonly value: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新系统设置 ${this.key} = ${this.value}`
  }
}
