import type { IMemberCardBindInfo } from '@xiaoshop/shared'
import type { IMemberCardRepository } from '@/member/card/model/Card/interface'
import type { IMemberCardBindRepository } from '@/member/card/model/bind/interface'

import { Inject, Injectable } from '@nestjs/common'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { BindMemberCardPayload } from '@/member/card/dto/payload'
import { MemberCardRepo } from '@/member/card/model/card/provider'
import { MemberCardEntity } from '@/member/card/model/card/entity'
import { MemberCardBindRepo } from '@/member/card/model/bind/provider'
import { toMemberCardBindInfo } from '@/member/card/model/bind/mapper'
import { FailedException, NotFoundException } from '~/common/exceptions'

import { MemberCardAssignEvent } from './events'

@Injectable()
export class MemberBindService {
  constructor(
    @MemberCardRepo()
    private readonly card: IMemberCardRepository,

    @MemberCardBindRepo()
    private readonly bind: IMemberCardBindRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 分配会员卡/会员等级至指定会员
   *
   * @param memberIds 会员 ID 列表
   * @param cardId 会员卡 ID
   * @param cardPlanId 会员卡套餐 ID
   * @param reason 绑定原因
   * @throws {FailedException} 绑定会员卡失败
   */
  async assignTo(
    memberIds: number[],
    cardId: number,
    cardPlanId?: number,
    reason?: string,
  ) {
    try {
      const card = await this.card.findById(cardId)

      if (!card)
        throw new NotFoundException('会员卡')

      for (const memberId of memberIds) {
        const bind = await this.binding(card, {
          memberId,
          cardId,
          cardPlanId,
        })

        if (bind) {
          this.event.emit(
            new MemberCardAssignEvent(
              bind.id,
              memberId,
              cardId,
              card.type,
              cardPlanId,
              bind.name,
              reason,
            ),
          )
        }
      }
    }
    catch (e) {
      throw new FailedException('绑定会员卡/会员等级', e.message, e.code)
    }
  }

  /**
   * 绑定会员卡/会员等级
   *
   * @param card 会员卡信息
   * @param data 绑定信息
   * @returns 绑定会员卡信息
   * @throws {FailedException} 绑定会员卡失败
   */
  async binding(
    card: MemberCardEntity,
    data: BindMemberCardPayload,
  ): Promise<IMemberCardBindInfo> {
    try {
      return await this.bind
        .upsert(card, data)
        .then(toMemberCardBindInfo)
    }
    catch (e) {
      console.log(e)
      throw new FailedException('绑定会员卡/会员等级', e.message)
    }
  }
}
