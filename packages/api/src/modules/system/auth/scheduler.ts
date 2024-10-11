import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toUtcDateTime } from '~/utils/formatter'

import { SystemSessionService } from './domain/session/service'

@Injectable()
export class SystemAuthScheduler {
  private readonly logger = new Logger(SystemAuthScheduler.name)

  constructor(
    @Inject(SystemSessionService)
    private readonly session: SystemSessionService,
  ) {}

  /**
   * 解锁超过 60 分钟的超级管理员 (30 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleUnlockLockedAdmins() {
    try {
      const users = await this.session.findLockedAdminList()

      for (const user of users) {
        if (toUtcDateTime(user.lockedTime).add(1, 'hour') >= toUtcDateTime())
          await this.session.unlock(user.id)
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
