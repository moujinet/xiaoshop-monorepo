import {
  Enabled,
  MemberCardPlanType,
  MemberCardType,
} from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { MemberCardService } from '@/member/card/service'
import { MemberCardBinding } from '@/member/binding/entity'
import { SettingsService } from '@/settings/settings.service'
import { FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberCardBindingService {
  constructor(
    @InjectRepository(MemberCardBinding)
    private readonly repository: Repository<MemberCardBinding>,

    @Inject(MemberCardService)
    private readonly memberCardService: MemberCardService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,
  ) {}

  /**
   * 获取会员卡绑定信息
   *
   * @param memberId 会员 ID
   * @returns Promise<MemberCardBinding>
   * @throws {FailedException} 获取会员卡绑定信息失败
   */
  async findMemberBinding(memberId: number): Promise<MemberCardBinding> {
    try {
      return await this.repository.findOneBy({ memberId })
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
   * @returns Promise<MemberCardBinding>
   * @throws {NotFoundException} 会员卡不存在
   * @throws {NotFoundException} 会员卡有效期不存在
   * @throws {FailedException} 绑定会员卡失败
   */
  async bindMemberCard(
    memberId: number,
    cardId: number,
    planId?: number,
  ): Promise<MemberCardBinding> {
    try {
      const binding = await this.repository.findOne({
        where: {
          memberId,
        },
      }) || new MemberCardBinding()

      // 相同会员卡不重复绑定
      if (binding.cardId === cardId && (!planId || binding.planId === planId))
        return binding

      // 默认会员卡
      cardId = cardId || Number(await this.settings.get('member.register.defaultCardId', 0))

      const cardInfo = await this.memberCardService.findDetail(cardId)

      if (!cardInfo)
        throw new NotFoundException('会员卡不存在')

      binding.memberId = memberId
      binding.cardId = cardId
      binding.planId = planId || 0
      binding.type = cardInfo.type
      binding.key = cardInfo.key
      binding.name = cardInfo.name
      binding.discount = cardInfo.discount
      binding.pointsRatio = cardInfo.pointsRatio
      binding.isFreeShipping = cardInfo.isFreeShipping
      binding.needExp = cardInfo.needExp
      binding.cardStyles = cardInfo.cardStyles
      binding.badgeStyles = cardInfo.badgeStyles

      if (binding.type === MemberCardType.CUSTOM) {
        const plan = cardInfo.plans.find(item => item.id === planId)

        if (!plan)
          throw new NotFoundException('会员卡有效期不存在')

        binding.planId = plan.id
        binding.planType = plan.type

        const today = new Date()

        if (plan.type === MemberCardPlanType.DAY)
          binding.dueTime = new Date(today.setDate(today.getDate() + plan.duration)).toISOString()
        else if (plan.type === MemberCardPlanType.MONTH)
          binding.dueTime = new Date(today.setMonth(today.getMonth() + plan.duration)).toISOString()
        else if (plan.type === MemberCardPlanType.YEAR)
          binding.dueTime = new Date(today.setFullYear(today.getFullYear() + plan.duration)).toISOString()
      }
      else {
        const nextLevel = await this.memberCardService.findNextLevelCard(cardInfo.key)

        if (nextLevel) {
          binding.isUpgradeable = Enabled.YES
          binding.nextNeedExp = nextLevel.needExp
        }
      }

      return await this.repository.save(binding)
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
      const card = await this.memberCardService.findCardStyles(cardId)

      if (!card)
        throw new NotFoundException('会员卡不存在')

      await this.repository.update(ids, {
        cardStyles: card.cardStyles,
        badgeStyles: card.badgeStyles,
      })
    }
    catch (e) {
      throw new FailedException('同步会员卡样式', e.message, e.status)
    }
  }
}
