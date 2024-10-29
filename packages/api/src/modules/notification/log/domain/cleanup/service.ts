import type { INotificationLogRepository } from '@/notification/log/model/interface'

import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { NotificationLogRepo } from '@/notification/log/model/provider'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'

import { NotificationLogCleanupEvent } from './events'

@Injectable()
export class NotificationLogCleanupService {
  private readonly logger = new Logger(NotificationLogCleanupService.name)

  constructor(
    @NotificationLogRepo()
    private readonly repo: INotificationLogRepository,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 每天凌晨 00:00 执行, 清理通知消息发送日志
   */
  @Cron(
    CronExpression.EVERY_DAY_AT_MIDNIGHT,
    { name: '@NotificationLogCleanup' },
  )
  async handleNotificationLogCleanup() {
    try {
      const options = await this.setting.find('notification.log.cleanup.*')

      if (!options['notification.log.cleanup.enable'])
        return

      const days = options['notification.log.cleanup.beforeDays'] || 180

      await this.cleanup(days)
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  /**
   * 根据配置自动清理通知发送日志
   *
   * @param days 天数
   * @throws {FailedException} 自动清理通知发送日志失败
   */
  async cleanup(days: number) {
    try {
      const result = await this.repo.cleanup(days)

      if (result.affected > 0) {
        this.event.emit(
          new NotificationLogCleanupEvent(days, result.affected),
        )
      }
    }
    catch (e) {
      throw new FailedException('自动清理通知发送日志', e.message, e.code)
    }
  }
}
