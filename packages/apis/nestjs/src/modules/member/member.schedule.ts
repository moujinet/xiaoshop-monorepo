import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { MemberGroupService } from '@/member/group/service'

@Injectable()
export class MemberScheduleService {
  private readonly logger = new Logger(MemberScheduleService.name)

  constructor(
    @Inject(MemberGroupService)
    private readonly service: MemberGroupService,
  ) {}

  /**
   * 刷新会员群体统计数据 (每晚 0 点执行一次)
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleRefreshGroupTotal() {
    try {
      await this.service.refreshTotal()

      this.logger.debug('刷新会员群体统计数据')
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
