import type { IMemberCardUpgradeRepository } from '@/member/card/model/upgrade/interface'

import { Inject, Injectable } from '@nestjs/common'
import { type IMemberCardUpgradeList, MemberCardUpgradeMethod } from '@xiaoshop/shared'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { MemberCardUpgradeRepo } from '@/member/card/model/upgrade/provider'
import { toMemberCardUpgradeList } from '@/member/card/model/upgrade/mapper'

@Injectable()
export class MemberUpgradeService {
  constructor(
    @MemberCardUpgradeRepo()
    private readonly repo: IMemberCardUpgradeRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取会员卡升级列表
   *
   * @param memberId 会员 ID
   * @returns 会员卡升级列表
   * @throws {FailedException} 获取会员卡升级列表失败
   */
  async findList(memberId: number): Promise<IMemberCardUpgradeList[]> {
    try {
      return await this.repo.find({
        memberId,
        method: MemberCardUpgradeMethod.UPGRADE,
      }).then(toMemberCardUpgradeList)
    }
    catch (e) {
      throw new FailedException('获取会员卡升级列表', e.message)
    }
  }
}
