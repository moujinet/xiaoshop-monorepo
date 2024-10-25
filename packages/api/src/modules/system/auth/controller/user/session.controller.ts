import type { ISystemLoginSignData } from '@xiaoshop/shared'

import { Cache } from 'cache-manager'
import { ClsService } from 'nestjs-cls'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Body, Controller, Get, HttpCode, Inject, Logger, Post, Put } from '@nestjs/common'

import { OnEvent } from '~/services/event-bus'
import { Admin, Public } from '~/common/decorators'
import { REQUEST_ADMIN_KEY } from '~/common/constants'
import { USER_PASSWORD_ERROR_KEY } from '@/system/auth/constants'
import { SystemSessionService } from '@/system/auth/domain/session/service'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'
import {
  ChangeSystemUserPasswordPayload,
  SystemUserLoginPayload,
} from '@/system/auth/dto/payload'
import {
  SystemUserAutoUnlockEvent,
  SystemUserWrongPasswordEvent,
} from '@/system/auth/domain/session/events'

@Controller('admin')
export class SystemUserSessionController {
  private readonly logger = new Logger(SystemUserSessionController.name)

  constructor(
    private readonly service: SystemSessionService,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 系统用户登录
   */
  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() payload: SystemUserLoginPayload) {
    return this.service.login(payload.username, payload.password)
  }

  /**
   * 获取当前登录用户
   */
  @Get('profile')
  @Admin()
  async profile() {
    return this.cls.get<ISystemLoginSignData['user']>(REQUEST_ADMIN_KEY)
  }

  /**
   * 当前登录用户更新密码
   */
  @Put('password/update')
  @Admin()
  async changePassword(@Body() payload: ChangeSystemUserPasswordPayload) {
    const query = this.cls.get<ISystemLoginSignData['user']>(REQUEST_ADMIN_KEY)

    return this.service.changePassword(
      +query.id,
      payload.password,
      payload.newPassword,
    )
  }

  /**
   * 处理用户密码错误
   *
   * @param payload SystemUserWrongPasswordEvent
   */
  @OnEvent(SystemUserWrongPasswordEvent)
  async onSystemUserWrongPassword(payload: SystemUserWrongPasswordEvent) {
    try {
      const key = `${USER_PASSWORD_ERROR_KEY}.${payload.userId}`
      const errors = await this.cache.get<number>(key) || 0
      const retry = await this.setting.findValue<number>(
        'system.auth.security.passwordRetryTimes',
      )

      if (errors >= retry)
        await this.service.lock(payload.userId)
      else
        await this.cache.set(key, errors + 1, 24 * 60 * 60 * 1000)
    }
    catch (e) {
      this.logger.error(`处理用户密码错误 - ${e.message}`)
    }
  }

  /**
   * 处理自动解锁(清理记数器)
   *
   * @param payload SystemUserAutoUnlockEvent
   */
  @OnEvent(SystemUserAutoUnlockEvent)
  async onSystemUserAutoUnlock(payload: SystemUserAutoUnlockEvent) {
    try {
      await this.cache.del(`${USER_PASSWORD_ERROR_KEY}.${payload.userId}`)
    }
    catch (e) {
      this.logger.error(`处理自动解锁 - ${e.message}`)
    }
  }
}
