import { SystemUserStatus } from '@xiaoshop/shared'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { SystemUserService } from './user/service'

@Injectable()
export class SystemAuthScheduler {
  private readonly logger = new Logger(SystemAuthScheduler.name)

  constructor(
    @Inject(SystemUserService)
    private readonly user: SystemUserService,
  ) {}

  /**
   * 解锁超过 60 分钟的超级管理员 (30 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleUnlockedSuperAdmin() {
    try {
      const users = await this.user.findLockedAdminList()

      for (const user of users) {
        if (Date.now() - new Date(user.lockedTime).getTime() >= 60 * 60 * 1000) {
          await this.user.lock(user.id, SystemUserStatus.NORMAL)
        }
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
