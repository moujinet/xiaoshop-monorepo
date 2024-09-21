import { SystemUserStatus } from '@xiaoshop/shared'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'
import { SystemCronJobExecuteEvent } from '@/system/monitor/cron/events'

import { MODULE_NAME } from './constants'
import { SystemUserService } from './user/service'

@Injectable()
export class SystemAuthScheduler {
  private readonly logger = new Logger(SystemAuthScheduler.name)

  constructor(
    @Inject(SystemUserService)
    private readonly user: SystemUserService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 解锁超过 60 分钟的超级管理员 (30 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleLockedSuperAdmin() {
    try {
      const users = await this.user.findLockedAdminList()

      for (const user of users) {
        if (Date.now() - new Date(user.lockedTime).getTime() >= 60 * 60 * 1000) {
          await this.user.lock(user.id, SystemUserStatus.NORMAL)
        }
      }

      this.event.emit(
        toEventName(SystemCronJobExecuteEvent.name),
        new SystemCronJobExecuteEvent(
          'system.auth.unlock.admin',
          MODULE_NAME,
          '自动解锁管理员',
          '解锁超过 60 分钟的超级管理员',
          CronExpression.EVERY_30_MINUTES,
          `成功解锁 ${users.length} 个超级管理员`,
        ),
      )
    }
    catch (e) {
      this.logger.error(e.message)

      this.event.emit(
        toEventName(SystemCronJobExecuteEvent.name),
        new SystemCronJobExecuteEvent(
          'system.auth.unlock.admin',
          MODULE_NAME,
          '自动解锁管理员',
          '解锁超过 60 分钟的超级管理员',
          CronExpression.EVERY_30_MINUTES,
          e.message || '未知错误',
        ),
      )
    }
  }
}
