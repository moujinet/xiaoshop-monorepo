import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { SystemUserSessionService } from './user/session/service'

@Injectable()
export class SystemAuthScheduler {
  private readonly logger = new Logger(SystemAuthScheduler.name)

  constructor(
    @Inject(SystemUserSessionService)
    private readonly session: SystemUserSessionService,
  ) {}

  /**
   * 解锁超过 60 分钟的超级管理员 (30 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleUnlockLockedAdmins() {
    try {
      const users = await this.session.findLockedAdminList()

      for (const user of users) {
        if (Date.now() - new Date(user.lockedTime).getTime() >= 60 * 60 * 1000) {
          await this.session.unlock(user.id)
        }
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
