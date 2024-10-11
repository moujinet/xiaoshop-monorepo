import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { OnEvent } from '~/services/event-bus/decorators'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'

import { USER_PASSWORD_ERROR_KEY } from './constants'
import { SystemSessionService } from './domain/session/service'
import { SystemUserAdminUnlockEvent } from './domain/user/events'
import { SystemUserAutoUnlockEvent, SystemUserWrongPasswordEvent } from './domain/session/events'

@Injectable()
export class SystemAuthListener {
  private readonly logger = new Logger(SystemAuthListener.name)

  constructor(
    @Inject(SystemSessionService)
    private readonly session: SystemSessionService,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  /**
   * 处理用户密码错误
   *
   * @param payload SystemUserWrongPasswordEvent
   */
  @OnEvent(SystemUserWrongPasswordEvent)
  async handleSystemUserWrongPassword(payload: SystemUserWrongPasswordEvent) {
    try {
      const key = `${USER_PASSWORD_ERROR_KEY}.${payload.userId}`
      const errors = await this.cache.get<number>(key) || 0
      const retry = await this.setting.findValue<number>(
        'system.auth.security.passwordRetryTimes',
      )

      if (errors >= retry)
        await this.session.lock(payload.userId)
      else
        await this.cache.set(key, errors + 1, 24 * 60 * 60 * 1000)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 处理自动解锁(清理记数器)
   *
   * @param payload SystemUserAutoUnlockEvent
   */
  @OnEvent(SystemUserAutoUnlockEvent)
  async handleAutoUnlock(payload: SystemUserAutoUnlockEvent) {
    await this.resetPasswordRetryTimes(payload.userId)
  }

  /**
   * 处理手动解锁(清理记数器)
   *
   * @param payload SystemUserAdminUnlockEvent
   */
  @OnEvent(SystemUserAdminUnlockEvent)
  async handleAdminUnlock(payload: SystemUserAdminUnlockEvent) {
    await this.resetPasswordRetryTimes(payload.userId)
  }

  /**
   * 重置用户错误密码记数器
   *
   * @param userId number
   */
  async resetPasswordRetryTimes(userId: number) {
    try {
      await this.cache.del(`${USER_PASSWORD_ERROR_KEY}.${userId}`)
    }
    catch (e) {
      this.logger.error(`重置用户错误密码记数器 - ${e.message}`)
    }
  }
}
