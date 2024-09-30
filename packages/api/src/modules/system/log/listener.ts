import type { ILogBasedEvent } from '~/common/events'

import { OnEvent } from '@nestjs/event-emitter'
import { SystemLogType } from '@xiaoshop/shared'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { SystemUserLoginEvent } from '@/system/auth/user/session/events'

import { SystemLogAdminService } from './admin/service'

@Injectable()
export class SystemLogListener {
  private readonly logger = new Logger(SystemLogListener.name)

  constructor(
    @Inject(SystemLogAdminService)
    private readonly systemLog: SystemLogAdminService,
  ) {}

  /**
   * 处理系统日志
   *
   * @param payload ILogBasedEvent
   */
  @OnEvent('**', { async: true })
  async handleLogBasedEvent(payload: ILogBasedEvent) {
    try {
      if (!['admin', 'system'].includes(payload.source))
        return

      const content = payload.getLogContent()

      if (content) {
        const type = payload.source === 'admin' ? SystemLogType.ADMIN : SystemLogType.SYSTEM

        await this.systemLog.write(payload.logLevel, {
          type,
          module: payload.module,
          content,
          userId: payload instanceof SystemUserLoginEvent ? payload.userId : null,
        })
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
