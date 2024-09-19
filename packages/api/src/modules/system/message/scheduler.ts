import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { SystemMessageLogService } from './log/service'
import { SystemMessageService } from './message/service'
import { SystemSettingsService } from '../settings/service'

@Injectable()
export class SystemMessageScheduler {
  private readonly logger = new Logger(SystemMessageScheduler.name)

  constructor(
    @Inject(SystemSettingsService)
    private readonly settings: SystemSettingsService,

    @Inject(SystemMessageLogService)
    private readonly log: SystemMessageLogService,

    @Inject(SystemMessageService)
    private readonly message: SystemMessageService,
  ) {}

  /**
   * 清理发送日志 (每天 2:00 执行一次)
   */
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleCleanupSystemMessageLog() {
    try {
      const options = await this.settings.findByKey('system.message.log.*')

      if (!options.enableCleanup)
        return

      await this.log.cleanupBeforeDays(Number(options.cleanupPeriod) || 90)

      this.logger.debug('清理消息发送日志完成')
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 清理系统消息 (每天 2:00 执行一次)
   */
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleCleanupSystemMessage() {
    try {
      const options = await this.settings.findByKey('system.message.message.*')

      if (!options.enableCleanup)
        return

      await this.message.cleanupBeforeDays(Number(options.cleanupPeriod) || 180)

      this.logger.debug(`清理 ${options.cleanupPeriod || 180} 天前历史系统消息完成`)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
