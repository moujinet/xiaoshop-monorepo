import {
  type IMemberBindingInfo,
  MemberCardPlanType,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MemberBinding } from '@/member/binding/entity'
import { MemberCardService } from '@/member/card/service'
import {
  MemberBindingCardEvent,
} from '@/member/binding/events'
import {
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class MemberBindingService {
  constructor(
    @InjectRepository(MemberBinding)
    private readonly repository: Repository<MemberBinding>,

    @Inject(MemberCardService)
    private readonly memberCard: MemberCardService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员卡绑定信息
   *
   * @param memberId 会员 ID
   * @returns Promise<IMemberBindingInfo>
   * @throws {FailedException} 获取会员卡绑定信息失败
   */
  async findMemberBinding(memberId: number): Promise<IMemberBindingInfo> {
    try {
      return await this.repository.findOne({
        select: [
          'id',
          'key',
          'name',
          'cardId',
          'cardType',
          'cardStyle',
          'badgeStyle',
          'discount',
          'pointsRatio',
          'needExp',
          'nextLevelExp',
          'freeShipping',
          'upgradeable',
          'times',
          'dueTime',
        ],
        where: { memberId },
      })
    }
    catch (e) {
      throw new FailedException('获取会员卡绑定信息', e.message)
    }
  }

  /**
   * 绑定会员卡
   *
   * @param memberId 会员 ID
   * @param cardId 会员卡 ID
   * @param planId 会员卡有效期 ID
   * @returns Promise<MemberBinding>
   * @throws {NotFoundException} 会员卡不存在
   * @throws {NotFoundException} 会员卡有效期不存在
   * @throws {FailedException} 绑定会员卡失败
   */
  async bindMemberCard(
    memberId: number,
    cardId: number,
    planId?: number,
  ): Promise<MemberBinding> {
    try {
      const binding = await this.repository.findOne({
        where: {
          memberId,
        },
      }) || new MemberBinding()

      // 相同会员卡不重复绑定
      if (cardId !== 0 && binding.cardId === cardId && (!planId || binding.planId === planId))
        return binding

      const cardInfo = await this.memberCard.findById(cardId)

      if (!cardInfo)
        throw new NotFoundException('会员卡不存在')

      binding.memberId = memberId
      binding.cardId = cardId
      binding.cardType = cardInfo.type
      binding.planId = planId || 0
      binding.key = cardInfo.key
      binding.name = cardInfo.name
      binding.cardStyle = cardInfo.cardStyle
      binding.badgeStyle = cardInfo.badgeStyle
      binding.discount = cardInfo.discount
      binding.pointsRatio = cardInfo.pointsRatio
      binding.needExp = cardInfo.needExp
      binding.freeShipping = cardInfo.freeShipping

      if (binding.cardType === MemberCardType.CUSTOM && cardInfo.plans.length > 0) {
        const plan = cardInfo.plans.find(item => item.id === binding.planId)

        if (!plan)
          throw new NotFoundException('会员卡有效期不存在')

        binding.planId = plan.id
        binding.planType = plan.type

        const today = new Date()

        if (plan.type === MemberCardPlanType.DAY)
          binding.dueTime = new Date(today.setDate(today.getDate() + plan.due)).toISOString()
        else if (plan.type === MemberCardPlanType.MONTH)
          binding.dueTime = new Date(today.setMonth(today.getMonth() + plan.due)).toISOString()
        else if (plan.type === MemberCardPlanType.YEAR)
          binding.dueTime = new Date(today.setFullYear(today.getFullYear() + plan.due)).toISOString()
      }
      else {
        const nextLevel = await this.memberCard.findNextLevelCard(cardInfo.key)

        if (nextLevel) {
          binding.upgradeable = YesOrNo.YES
          binding.nextLevelExp = nextLevel.needExp
        }
      }

      const created = await this.repository.save(binding)

      this.event.emit(
        toEventName(MemberBindingCardEvent.name),
        new MemberBindingCardEvent(memberId, binding.cardId, binding.name, binding.cardType),
      )

      return created
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
   * @param planId 会员卡有效期 ID
   * @throws {NotFoundException} 会员卡不存在
   * @throws {NotFoundException} 会员卡有效期不存在
   * @throws {FailedException} 批量绑定会员卡失败
   */
  async batchBindMemberCard(memberIds: number[], cardId: number, planId?: number) {
    try {
      await Promise.all(memberIds.map(
        memberId => this.bindMemberCard(memberId, cardId, planId),
      ))
    }
    catch (e) {
      throw new FailedException('批量绑定会员卡', e.message)
    }
  }

  /**
   * 同步会员卡样式
   *
   * @param ids 会员卡绑定 ID
   * @param cardId 会员卡 ID
   * @returns Promise<void>
   * @throws {NotFoundException} 会员卡不存在
   * @throws {FailedException} 同步会员卡样式失败
   */
  async syncMemberCardStyles(ids: number[], cardId: number) {
    try {
      const card = await this.memberCard.findCardStyles(cardId)

      if (!card)
        throw new NotFoundException('会员卡不存在')

      await this.repository.update(ids, {
        cardStyle: card.cardStyle,
        badgeStyle: card.badgeStyle,
      })
    }
    catch (e) {
      throw new FailedException('同步会员卡样式', e.message, e.status)
    }
  }

  /**
   * 检查会员是否已绑定会员卡
   *
   * @param memberId 会员 ID
   * @returns Promise<boolean>
   */
  async existsByMemberId(memberId: number) {
    return await this.repository.existsBy({ memberId })
  }
}
