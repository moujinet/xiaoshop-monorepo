import type { INotificationInboxRepository } from '@/notification/inbox/model/interface'

import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { NotificationInboxRepo } from '@/notification/inbox/model/provider'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'

import { NotificationInboxCleanupEvent } from './events'

@Injectable()
export class NotificationInboxCleanupService {
  private readonly logger = new Logger(NotificationInboxCleanupService.name)

  constructor(
    @NotificationInboxRepo()
    private readonly repo: INotificationInboxRepository,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 每天凌晨 00:00 执行, 清理通知收件箱
   */
  @Cron(
    CronExpression.EVERY_DAY_AT_MIDNIGHT,
    { name: '@NotificationInboxCleanup' },
  )
  async handleNotificationInboxCleanup() {
    try {
      const options = await this.setting.find('notification.inbox.cleanup.*')

      if (!options['notification.inbox.cleanup.enable'])
        return

      const days = options['notification.inbox.cleanup.beforeDays'] || 180

      await this.cleanup(days)
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  /**
   * 根据配置自动清理通知
   *
   * @param days 天数
   * @throws {FailedException} 自动清理通知失败
   */
  async cleanup(days: number) {
    try {
      const result = await this.repo.cleanup(days)

      if (result.affected > 0) {
        this.event.emit(
          new NotificationInboxCleanupEvent(days, result.affected),
        )
      }
    }
    catch (e) {
      throw new FailedException('自动清理通知', e.message, e.code)
    }
  }
}
