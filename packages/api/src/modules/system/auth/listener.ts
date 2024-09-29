import { Cache } from 'cache-manager'
import { OnEvent } from '@nestjs/event-emitter'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'
import { SystemSettingService } from '@/system/setting/domain/setting/service'

import { USER_PASSWORD_ERROR_KEY } from './constants'
import { SystemUserAdminUnlockEvent } from './user/admin/events'
import { SystemUserSessionService } from './user/session/service'
import { SystemUserAutoUnlockEvent, SystemUserWrongPasswordEvent } from './user/session/events'

@Injectable()
export class SystemAuthListener {
  private readonly logger = new Logger(SystemAuthListener.name)

  constructor(
    @Inject(SystemUserSessionService)
    private readonly session: SystemUserSessionService,

    @Inject(SystemSettingService)
    private readonly setting: SystemSettingService,

    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  /**
   * 处理用户密码错误
   *
   * @param payload SystemUserWrongPasswordEvent
   */
  @OnEvent(toEventName(SystemUserWrongPasswordEvent.name), { async: true })
  async handleSystemUserWrongPassword(payload: SystemUserWrongPasswordEvent) {
    try {
      const key = `${USER_PASSWORD_ERROR_KEY}.${payload.userId}`
      const errors = await this.cache.get<number>(key) || 0
      const retry = await this.setting.findValueByKey('system.auth.security.passwordRetryTimes') as number

      if (errors >= retry) {
        await this.session.lock(payload.userId)
      }
      else {
        await this.cache.set(key, errors + 1, 24 * 60 * 60 * 1000)
      }
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
  @OnEvent(toEventName(SystemUserAutoUnlockEvent.name), { async: true })
  async handleAutoUnlock(payload: SystemUserAutoUnlockEvent) {
    await this.resetSystemUserWrongPasswordTimes(payload.userId)
  }

  /**
   * 处理手动解锁(清理记数器)
   *
   * @param payload SystemUserAdminUnlockEvent
   */
  @OnEvent(toEventName(SystemUserAdminUnlockEvent.name), { async: true })
  async handleAdminUnlock(payload: SystemUserAdminUnlockEvent) {
    await this.resetSystemUserWrongPasswordTimes(payload.userId)
  }

  /**
   * 重置用户错误密码记数器
   *
   * @param userId number
   */
  async resetSystemUserWrongPasswordTimes(userId: number) {
    try {
      await this.cache.del(`${USER_PASSWORD_ERROR_KEY}.${userId}`)
    }
    catch (e) {
      this.logger.error(`重置用户错误密码记数器 - ${e.message}`)
    }
  }
}
