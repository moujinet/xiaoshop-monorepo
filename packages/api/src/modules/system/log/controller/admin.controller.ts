import type { ILogBasedEvent } from '~/common/events'

import { SystemLogType } from '@xiaoshop/shared'
import { Controller, Get, Logger, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { OnEvent } from '~/services/event-bus'
import { GetSystemLogPagesRequest } from '@/system/log/dto/request'
import { SystemLogQueryService } from '@/system/log/domain/query/service'
import { SystemLogStoreService } from '@/system/log/domain/store/service'
import { SystemUserLoginEvent } from '@/system/auth/domain/session/events'

@Controller('admin/system/log')
export class SystemLogAdminController {
  private readonly logger = new Logger(SystemLogAdminController.name)

  constructor(
    private readonly query: SystemLogQueryService,
    private readonly store: SystemLogStoreService,
  ) {}

  /**
   * 获取系统日志列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemLogPagesRequest) {
    return this.query.findPages(query)
  }

  /**
   * 处理系统日志
   *
   * @param payload ILogBasedEvent
   */
  @OnEvent('**')
  async handleLogBasedEvent(payload: ILogBasedEvent) {
    try {
      if (!['admin', 'system', 'connect'].includes(payload.source))
        return

      const content = payload.logContent || ''

      if (content) {
        const {
          level,
          source,
          module,
        } = payload

        const type = source === 'admin' ? SystemLogType.ADMIN : SystemLogType.SYSTEM
        const userId = payload instanceof SystemUserLoginEvent ? payload.userId : null

        await this.store.write(level, { type, module, content, userId })
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
