import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Repository } from 'typeorm'
import { MemberCardPlanType, MemberCardType } from '@xiaoshop/shared'

import { toEventName } from '~/utils/transformers'
import { FailedException, NotFoundException } from '~/common/exceptions'

import { MemberCard } from '../card/entity'
import { MemberCardBinding } from './entity'
import { MemberCardBindEvent } from './events'

@Injectable()
export class MemberCardBindingService {
  constructor(
    @InjectRepository(MemberCardBinding)
    private readonly repository: Repository<MemberCardBinding>,

    @InjectRepository(MemberCard)
    private readonly cardRepo: Repository<MemberCard>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员卡绑定信息
   *
   * @param memberId 会员 ID
   * @returns 会员卡绑定信息
   * @throws {FailedException} 获取会员卡绑定信息失败
   */
  async findByMemberId(memberId: number): Promise<MemberCardBinding> {
    try {
      return await this.repository.findOneBy({ memberId })
    }
    catch (e) {
      throw new FailedException('获取会员卡绑定信息', e.message)
    }
  }

  /**
   * 检查会员卡是否绑定
   *
   * @param cardId 会员卡 ID
   * @param memberId 会员 ID
   * @returns 是否存在
   */
  async exists(cardId: number, memberId?: number): Promise<boolean> {
    try {
      const where: FindOptionsWhere<MemberCardBinding> = {
        cardId,
      }

      if (memberId)
        where.memberId = memberId

      return await this.repository.existsBy(where)
    }
    catch (e) {
      throw new FailedException('检查会员卡是否绑定', e.message)
    }
  }

  /**
   * 绑定会员卡
   *
   * @param memberId 会员 ID
   * @param cardId 会员卡 ID
   * @param cardPlanId 会员卡套餐 ID
   * @param reason 绑定原因
   * @throws {FailedException} 绑定会员卡
   * @throws {NotFoundException} 会员卡不存在
   */
  async bind(memberId: number, cardId: number, cardPlanId?: number, reason?: string) {
    try {
      const card = await this.cardRepo.findOneBy({ id: cardId })

      if (!card)
        throw new NotFoundException('会员卡')

      const binding = await this.findByMemberId(memberId) || new MemberCardBinding()

      // 避免重复绑定
      if (cardId !== 0 && binding.cardId === cardId && (!cardPlanId || binding.cardPlanId === cardPlanId))
        return

      binding.memberId = memberId
      binding.cardId = card.id
      binding.type = card.type
      binding.key = card.key
      binding.name = card.name
      binding.cardStyle = card.cardStyle
      binding.badgeStyle = card.badgeStyle
      binding.needExp = card.needExp
      binding.discount = card.discount
      binding.pointsRatio = card.pointsRatio
      binding.isFreeShipping = card.isFreeShipping

      if (card.type === MemberCardType.CUSTOM) {
        const plan = card.plans.find(p => p.id === cardPlanId)

        if (!plan)
          throw new NotFoundException('会员卡套餐')

        binding.cardPlanId = cardPlanId
        binding.cardPlanType = plan.type.key

        const today = new Date()

        switch (plan.type.key) {
          case MemberCardPlanType.DAY:
            binding.dueTime = new Date(today.setDate(today.getDate() + plan.due)).toISOString()
            break
          case MemberCardPlanType.MONTH:
            binding.dueTime = new Date(today.setMonth(today.getMonth() + plan.due)).toISOString()
            break
          case MemberCardPlanType.YEAR:
            binding.dueTime = new Date(today.setFullYear(today.getFullYear() + plan.due)).toISOString()
            break
        }
      }

      const saved = await this.repository.save(binding)

      this.event.emit(
        toEventName(MemberCardBindEvent.name),
        new MemberCardBindEvent(
          saved.id,
          saved.cardId,
          saved.type,
          saved.name,
          saved.cardPlanId,
          reason,
        ),
      )
    }
    catch (e) {
      throw new FailedException('绑定会员卡', e.message, e.status)
    }
  }

  /**
   * 批量绑定会员卡
   *
   * @param memberIds 会员 ID 数组
   * @param cardId 会员卡 ID
   * @param cardPlanId 会员卡套餐 ID
   * @param reason 绑定原因
   * @throws {FailedException} 批量绑定会员卡
   */
  async bindMany(memberIds: number[], cardId: number, cardPlanId?: number, reason?: string) {
    try {
      await Promise.all(
        memberIds.map(memberId => this.bind(memberId, cardId, cardPlanId, reason)),
      )
    }
    catch (e) {
      throw new FailedException('绑定会员卡', e.message, e.status)
    }
  }
}
