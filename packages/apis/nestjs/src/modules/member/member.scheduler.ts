import { Inject, Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { MemberService } from '@/member/account/service'
import { MemberGroupService } from '@/member/group/service'
import { SettingsService } from '@/settings/settings.service'

@Injectable()
export class MemberScheduler {
  private readonly logger = new Logger(MemberScheduler.name)

  constructor(
    @Inject(MemberService)
    private readonly member: MemberService,

    @Inject(MemberGroupService)
    private readonly group: MemberGroupService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,
  ) {}

  /**
   * 刷新会员群体统计 (每天执行一次 00:00)
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleRefreshMemberGroupCount() {
    try {
      const groups = await this.group.findConditionList()

      if (groups.length > 0) {
        this.logger.debug('开始刷新会员群体统计')

        for (const group of groups) {
          this.logger.debug(`开始刷新「${group.name}」会员群体统计`)

          const total = await this.member.countMemberByGroupConditions(group.conditions)

          if (total !== group.total)
            await this.group.updateTotal(group.id, total)

          this.logger.debug(`刷新「${group.name}」会员群体统计完成, 总数: ${total}`)
        }
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 注销会员账号 (每小时执行一次)
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleLogoutMember() {
    try {
      const enabled = await this.settings.get('member.logout.enableLogout', false)

      if (enabled) {
        this.logger.debug('开始注销会员账号')
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
