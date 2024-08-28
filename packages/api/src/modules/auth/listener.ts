import { AuthLogType } from '@xiaoshop/shared'
import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { AuthUserLoginEvent, AuthUserPasswordWrongEvent } from '@/auth/user/events'
import { AuthLogService } from '@/auth/log/service'
import { toEventName } from '~/utils/transformers'
import { ILogBasedEvent } from '~/common/events'

@Injectable()
export class AuthListener {
  private readonly logger = new Logger(AuthListener.name)

  constructor(
    @Inject(AuthLogService)
    private readonly log: AuthLogService,
  ) {}

  /**
   * 处理日志
   *
   * @param payload ILogBasedEvent
   */
  @OnEvent('**', { async: true })
  async handleLogs(payload: ILogBasedEvent) {
    try {
      const log = payload.getAuthLogs()

      if (log) {
        if (payload.authLogType === AuthLogType.SYSTEM) {
          await this.log.writeSystemLog(payload.module, log)
        }
        else {
          await this.log.write(
            payload.module,
            log,
            payload instanceof AuthUserLoginEvent ? payload.id : 0,
          )
        }
      }
    }
    catch (e) {
      this.logger.error(e)
    }
  }

  /**
   * 处理用户密码错误
   *
   * 规则:
   * - 连续错误 5 次，锁定账号，待管理员手动解锁
   * - 管理员，60 分钟后，自动解锁
   *
   * @param payload AuthUserPasswordWrongEvent
   */
  @OnEvent(toEventName(AuthUserPasswordWrongEvent.name), { async: true })
  async handleAuthUserPasswordWrong(payload: AuthUserPasswordWrongEvent) {
    try {
      this.logger.debug(`用户密码错误 ${JSON.stringify(payload)}`)
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
