import { EventEmitter2 } from '@nestjs/event-emitter'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { MemberService } from '@/member/profile/service'
import { MemberLogoutEvent } from '@/member/member.events'
import { MemberGroupService } from '@/member/group/service'
import { MemberLogoutService } from '@/member/logout/service'
import { SettingsService } from '@/settings/settings.service'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class MemberScheduler {
  private readonly logger = new Logger(MemberScheduler.name)

  constructor(
    @Inject(MemberService)
    private readonly member: MemberService,

    @Inject(MemberGroupService)
    private readonly group: MemberGroupService,

    @Inject(MemberLogoutService)
    private readonly logout: MemberLogoutService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 刷新会员群体统计 (每天执行一次 01:00)
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleRefreshMemberGroupCount() {
    try {
      const groups = await this.group.findConditionList()

      if (groups.length > 0) {
        this.logger.debug('开始刷新会员群体统计')

        for (const group of groups) {
          this.logger.debug(`开始刷新「${group.name}」会员群体统计`)

          const total = await this.member.countMemberByGroupConditions(group.conditions)

          if (total !== group.total) {
            await this.group.updateTotal(group.id, total)
            await this.log.writeCrontabLog('会员管理', `刷新「${group.name}」会员群体统计完成, 总数: ${total}`)
          }

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
        const applies = await this.logout.findApproveList()

        if (applies.length > 0) {
          this.logger.debug(`注销会员账号, 共计 ${applies.length} 个申请`)

          for (const apply of applies) {
            this.eventEmitter.emitAsync(
              MemberLogoutEvent.name,
              new MemberLogoutEvent(apply.memberId),
            )
          }
        }
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
