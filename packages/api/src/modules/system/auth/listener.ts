import { Cache } from 'cache-manager'
import { OnEvent } from '@nestjs/event-emitter'
import { SystemUserStatus } from '@xiaoshop/shared'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { SystemUserService } from './user/service'
import { AUTH_USER_PASSWORD_ERROR_KEY } from './constants'
import { SystemUserUnblockEvent, SystemUserWrongPasswordEvent } from './user/events'

@Injectable()
export class SystemAuthListener {
  private readonly logger = new Logger(SystemAuthListener.name)

  constructor(
    @Inject(SystemUserService)
    private readonly user: SystemUserService,

    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  /**
   * 处理用户密码错误
   *
   * 规则:
   * - 连续错误 5 次，锁定账号，待管理员手动解锁
   *
   * @param payload SystemUserWrongPasswordEvent
   */
  @OnEvent(toEventName(SystemUserWrongPasswordEvent.name), { async: true })
  async handleSystemUserWrongPassword(payload: SystemUserWrongPasswordEvent) {
    try {
      const key = `${AUTH_USER_PASSWORD_ERROR_KEY}.${payload.userId}`
      const errors = await this.cache.get<number>(key) || 0

      if (errors >= 5) {
        await this.user.lock(payload.userId, SystemUserStatus.LOCKED)
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
   * 处理用户解锁
   *
   * @param payload SystemUserUnblockEvent
   */
  @OnEvent(toEventName(SystemUserUnblockEvent.name), { async: true })
  async handleSystemUserUnblock(payload: SystemUserUnblockEvent) {
    try {
      await this.cache.del(`${AUTH_USER_PASSWORD_ERROR_KEY}.${payload.userId}`)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
