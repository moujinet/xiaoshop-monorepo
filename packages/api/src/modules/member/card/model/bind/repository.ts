import type {
  IMemberCardBindRepository,
  IMemberCardBindSelect,
  IMemberCardBindWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberCardPlanType, MemberCardType } from '@xiaoshop/shared'

import { afterDateTime } from '~/utils/formatter'
import { NotFoundException } from '~/common/exceptions'

import { MemberCardBindEntity } from './entity'
import { MemberCardEntity } from '../card/entity'

const defaultSelect: IMemberCardBindSelect = {
  id: true,
  cardId: true,
  key: true,
  type: true,
  name: true,
  cardPlanId: true,
  cardPlanType: true,
  cardStyle: { image: true, icon: true, textColor: true, bgColor: true, bgImage: true },
  badgeStyle: { image: true, icon: true, textColor: true, bgColor: true },
  needExp: true,
  discount: true,
  pointsRatio: true,
  isFreeShipping: true,
  useTimes: true,
  limitTimes: true,
  dueTime: true,
  createdTime: true,
}

@Injectable()
export class MemberCardBindRepository implements IMemberCardBindRepository {
  constructor(
    @InjectRepository(MemberCardBindEntity)
    private readonly repo: Repository<MemberCardBindEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findOne(
    where: IMemberCardBindWhere,
    select: IMemberCardBindSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberCardBindWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async upsert(card: MemberCardEntity, data: Partial<MemberCardBindEntity>) {
    const bind = await this.repo.findOne({
      where: { memberId: data.memberId },
    }) || this.repo.create()

    if (
      card.id === bind.cardId
      || (
        data.cardPlanId
        && bind.cardId === data.cardId
        && bind.cardPlanId === data.cardPlanId
      )
    ) {
      return bind
    }

    bind.memberId = data.memberId
    bind.cardId = card.id
    bind.type = card.type
    bind.key = card.key
    bind.name = card.name
    bind.cardStyle = card.cardStyle
    bind.badgeStyle = card.badgeStyle
    bind.needExp = card.needExp
    bind.discount = card.discount
    bind.pointsRatio = card.pointsRatio
    bind.isFreeShipping = card.isFreeShipping

    if (bind.type === MemberCardType.CUSTOM) {
      const plan = card.plans.find(p => p.id === data.cardPlanId)

      if (!plan)
        throw new NotFoundException('会员卡套餐')

      bind.cardPlanId = plan.id
      bind.cardPlanType = plan.type.key

      const today = new Date()

      switch (bind.cardPlanType) {
        // 年卡
        case MemberCardPlanType.YEAR:
          bind.dueTime = afterDateTime(today, plan.due, 'year').format()
          break
        // 月卡
        case MemberCardPlanType.MONTH:
          bind.dueTime = afterDateTime(today, plan.due, 'month').format()
          break
        // 天卡
        case MemberCardPlanType.DAY:
          bind.dueTime = afterDateTime(today, plan.due, 'day').format()
          break
        // 次卡
        case MemberCardPlanType.TIMES:
          bind.useTimes = 0
          bind.limitTimes = Math.ceil(plan.due || 1)
          break
      }
    }

    return await this.repo.save(bind)
  }
}
