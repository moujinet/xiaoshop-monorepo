import {
  IApiPaginationData,
  type IMemberListItem,
  MemberStatus,
} from '@xiaoshop/schema'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { GetMemberPagesRequest } from '@/member/account/dto'
import { MemberCardService } from '@/member/card/service'
import { MemberGroupService } from '@/member/group/service'
import { MemberLogoutService } from '@/member/logout/service'
import { MemberService } from '@/member/account/service'
import { SettingsService } from '@/settings/settings.service'

@Injectable()
export class MemberScheduler {
  private readonly logger = new Logger(MemberScheduler.name)

  constructor(
    @Inject(MemberService)
    private readonly member: MemberService,

    @Inject(MemberCardService)
    private readonly memberCard: MemberCardService,

    @Inject(MemberGroupService)
    private readonly group: MemberGroupService,

    @Inject(MemberLogoutService)
    private readonly logout: MemberLogoutService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,
  ) {}

  /**
   * 会员等级升级 (每天执行一次 00:00)
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleMemberLevelUp() {
    try {
      const levelCards = await this.memberCard.findLevelList()

      const loadMembers = async (page: number) => {
        return await this.member.findPages({
          status: MemberStatus.NORMAL,
          cardIds: levelCards.map(card => card.id),
          page,
          pagesize: 100,
        } as GetMemberPagesRequest)
      }

      const levelUpMembers = async (members: IApiPaginationData<IMemberListItem>) => {
        if (members.total === 0)
          return

        this.logger.debug('开始升级会员等级')

        for (const member of members.result) {
          this.logger.debug(`开始升级「${member.username}」会员等级`)
        }

        const maxPage = Math.ceil(members.total / members.pagesize)

        if (members.page < maxPage) {
          await levelUpMembers(await loadMembers(members.page + 1))
        }
      }

      await levelUpMembers(await loadMembers(1))
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

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
        const applies = await this.logout.findApproveList()

        if (applies.length > 0) {
          this.logger.debug('开始注销会员账号')
        }
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
