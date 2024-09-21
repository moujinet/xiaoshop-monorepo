import { EventEmitter2 } from '@nestjs/event-emitter'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { MODULE_NAME } from './constants'
import { SystemMessageLogService } from './log/service'
import { SystemMessageService } from './message/service'
import { SystemSettingsService } from '../settings/service'
import { SystemCronJobExecuteEvent } from '../monitor/cron/events'

@Injectable()
export class SystemMessageScheduler {
  private readonly logger = new Logger(SystemMessageScheduler.name)
  private days: number = 0
  private msgDays: number = 0

  constructor(
    @Inject(SystemSettingsService)
    private readonly settings: SystemSettingsService,

    @Inject(SystemMessageLogService)
    private readonly log: SystemMessageLogService,

    @Inject(SystemMessageService)
    private readonly message: SystemMessageService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
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

      this.days = Number(options.cleanupPeriod) || 90

      await this.log.cleanupBeforeDays(this.days)

      this.event.emit(
        toEventName(SystemCronJobExecuteEvent.name),
        new SystemCronJobExecuteEvent(
          'system.message.log.cleanup',
          MODULE_NAME,
          '清理发送日志',
          `定时清理超过 ${this.days} 天的消息发送日志`,
          CronExpression.EVERY_DAY_AT_2AM,
          `成功清理消息发送日志`,
        ),
      )

      this.logger.debug('清理消息发送日志完成')
    }
    catch (e) {
      this.logger.error(e.message)

      this.event.emit(
        toEventName(SystemCronJobExecuteEvent.name),
        new SystemCronJobExecuteEvent(
          'system.message.log.cleanup',
          MODULE_NAME,
          '清理发送日志',
          `定时清理 ${this.days} 天前的消息发送日志`,
          CronExpression.EVERY_DAY_AT_2AM,
          e.message,
        ),
      )
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

      this.msgDays = Number(options.cleanupPeriod) || 180

      await this.message.cleanupBeforeDays(this.msgDays)

      this.event.emit(
        toEventName(SystemCronJobExecuteEvent.name),
        new SystemCronJobExecuteEvent(
          'system.message.cleanup',
          MODULE_NAME,
          '清理系统消息',
          `定时清理 ${this.msgDays} 天前历史系统消息`,
          CronExpression.EVERY_DAY_AT_2AM,
          '成功清理历史系统消息',
        ),
      )

      this.logger.debug(`清理 ${options.cleanupPeriod || 180} 天前历史系统消息完成`)
    }
    catch (e) {
      this.logger.error(e.message)

      this.event.emit(
        toEventName(SystemCronJobExecuteEvent.name),
        new SystemCronJobExecuteEvent(
          'system.message.cleanup',
          MODULE_NAME,
          '清理系统消息',
          `定时清理 ${this.msgDays} 天前历史系统消息`,
          CronExpression.EVERY_DAY_AT_2AM,
          e.message,
        ),
      )
    }
  }
}
