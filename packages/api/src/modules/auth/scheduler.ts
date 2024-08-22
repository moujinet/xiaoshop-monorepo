import { Inject, Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { AuthUserService } from '@/auth/user/service'

@Injectable()
export class AuthScheduler {
  private readonly logger = new Logger(AuthScheduler.name)

  constructor(
    @Inject(AuthUserService)
    private readonly user: AuthUserService,
  ) {}

  /**
   * 解锁超过 60 分钟的超级管理员 (30 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleUnlockAdminUsers() {
    try {
      const users = await this.user.findLockedAdminList()

      if (users.length > 0) {
        for (const user of users) {
          // 筛选超过 60 分钟的超级管理员
          if (new Date(user.lockedTime) <= new Date(Date.now() - 60 * 60 * 1000)) {
            await this.user.unlockUser(user.id)
          }
        }
      }
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
