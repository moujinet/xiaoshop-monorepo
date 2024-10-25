import { SystemEvent } from '~/common/events'
import { MODULE_NAME } from '@/system/log/constants'

/**
 * Cleanup System Log Event
 */
export class SystemLogCleanupEvent extends SystemEvent {
  constructor(
    public readonly beforeDays: number,
    public readonly results: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `自动清理 ${this.beforeDays} 天前的系统日志 - 共计 ${this.results} 条`
  }
}
