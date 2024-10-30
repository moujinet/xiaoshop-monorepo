import type { IMemberGroupFilterPayload, IMemberGroupRepository } from '@/member/group/model/interface'

import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { MemberGroupRepo } from '@/member/group/model/provider'
import { MemberGroupEntity } from '@/member/group/model/entity'
import { MemberStatisticsService } from '@/member/account/domain/statistics/service'

import { MemberGroupRefreshEvent } from './events'

@Injectable()
export class MemberGroupRefreshService {
  private readonly logger = new Logger(MemberGroupRefreshService.name)

  constructor(
    @MemberGroupRepo()
    private readonly repo: IMemberGroupRepository,

    @Inject(MemberStatisticsService)
    private readonly statistics: MemberStatisticsService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 每天凌晨 01:00 执行, 刷新会员群体
   */
  @Cron(
    CronExpression.EVERY_DAY_AT_1AM,
    { name: '@MemberGroupRefresh' },
  )
  async handleMemberGroupRefresh() {
    try {
      const groups = await this.repo.find(
        ['id', 'name', 'total', 'filters'],
      )

      for (const group of groups) {
        await this.refresh(
          group.id,
          group.name,
          group.filters,
          group.total,
        )
      }
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  /**
   * 刷新会员群体
   *
   * @param id 会员群体 ID
   * @param name 会员群体名称
   * @param filters 会员群体筛选条件
   * @param total 会员群体总数
   * @throws {FailedException} 刷新会员群体失败
   */
  async refresh(
    id: number,
    name: string,
    filters: IMemberGroupFilterPayload[],
    total: number,
  ) {
    try {
      const group = new MemberGroupEntity()

      group.id = id
      group.total = total

      const updated = await this.statistics.countMemberByFilters(
        id,
        name,
        filters,
      )

      if (group.total === updated)
        return

      await this.repo.update(group, { total: updated })

      this.event.emit(
        new MemberGroupRefreshEvent(
          group.id,
          group.name,
          updated,
        ),
      )
    }
    catch (e) {
      throw new FailedException('刷新会员群体', e.message, e.code)
    }
  }
}
