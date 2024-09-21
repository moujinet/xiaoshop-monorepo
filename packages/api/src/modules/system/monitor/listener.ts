import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { SystemMonitorCronService } from './cron/service'
import { SystemCronJobExecuteEvent } from './cron/events'

@Injectable()
export class SystemMonitorListener {
  private readonly logger = new Logger(SystemMonitorListener.name)

  constructor(
    @Inject(SystemMonitorCronService)
    private readonly service: SystemMonitorCronService,
  ) {}

  /**
   * 更新设置缓存
   */
  @OnEvent(toEventName(SystemCronJobExecuteEvent.name), { async: true })
  async handleSystemCronExecute(payload: SystemCronJobExecuteEvent) {
    try {
      this.service.update(payload.key, {
        module: payload.module,
        name: payload.name,
        desc: payload.desc,
        cron: payload.cron,
        result: payload.result,
      })
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
