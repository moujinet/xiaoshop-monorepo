import type {
  IMemberCardRepository,
  IMemberCardSelect,
  IMemberCardWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberCardType, YesOrNo } from '@xiaoshop/shared'

import {
  DEFAULT_MEMBER_BADGE_STYLE,
  DEFAULT_MEMBER_CARD_DISCOUNT,
  DEFAULT_MEMBER_CARD_NEED_EXP,
  DEFAULT_MEMBER_CARD_POINTS_RATIO,
  DEFAULT_MEMBER_CARD_STYLE,
} from '@/member/card/constants'

import { MemberCardEntity } from './entity'

@Injectable()
export class MemberCardRepository implements IMemberCardRepository {
  constructor(
    @InjectRepository(MemberCardEntity)
    private readonly repo: Repository<MemberCardEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async find(
    where: IMemberCardWhere,
    select: IMemberCardSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        type: 'ASC',
        key: 'ASC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: IMemberCardSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberCardWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<MemberCardEntity>) {
    const card = this.repo.create(data)

    const count = await this.repo.countBy({
      type: MemberCardType.CUSTOM,
    })

    card.isEnabled = YesOrNo.YES
    card.type = MemberCardType.CUSTOM
    card.key = data.key || `svip${count + 1}`
    card.name = data.name ? data.name.trim() : `超级会员 ${count + 1}`
    card.desc = data.desc ? data.desc.trim() : ''
    card.cardStyle = data.cardStyle || DEFAULT_MEMBER_CARD_STYLE
    card.badgeStyle = data.badgeStyle || DEFAULT_MEMBER_BADGE_STYLE
    card.needExp = data.needExp
      ? data.needExp < 0 ? 0 : data.needExp
      : DEFAULT_MEMBER_CARD_NEED_EXP
    card.discount = data.discount
      ? data.discount > 100 ? 100 : data.discount
      : DEFAULT_MEMBER_CARD_DISCOUNT
    card.pointsRatio = data.pointsRatio
      ? data.pointsRatio < 1 ? 1 : data.pointsRatio
      : DEFAULT_MEMBER_CARD_POINTS_RATIO
    card.isFreeShipping = data.isFreeShipping || YesOrNo.NO
    card.plans = data.plans || []

    return await this.repo.save(card)
  }

  /**
   * @inheritdoc
   */
  async update(
    card: MemberCardEntity,
    data: Partial<MemberCardEntity>,
  ) {
    if (data.name !== undefined && data.name.trim() !== card.name)
      card.name = data.name.trim()

    if (data.desc !== undefined && data.desc !== card.desc)
      card.desc = data.desc

    if (data.cardStyle !== undefined && data.cardStyle !== card.cardStyle)
      card.cardStyle = data.cardStyle

    if (data.badgeStyle !== undefined && data.badgeStyle !== card.badgeStyle)
      card.badgeStyle = data.badgeStyle

    if (data.needExp !== undefined && data.needExp !== card.needExp)
      card.needExp = data.needExp < 0 ? 0 : data.needExp

    if (data.discount !== undefined && data.discount !== card.discount)
      card.discount = data.discount > 100 ? 100 : data.discount

    if (data.pointsRatio !== undefined && data.pointsRatio !== card.pointsRatio)
      card.pointsRatio = data.pointsRatio < 1 ? 1 : data.pointsRatio

    if (data.isFreeShipping !== undefined && data.isFreeShipping !== card.isFreeShipping)
      card.isFreeShipping = data.isFreeShipping

    if (data.plans !== undefined && data.plans !== card.plans)
      card.plans = data.plans

    if (data.isEnabled !== undefined && data.isEnabled !== card.isEnabled)
      card.isEnabled = data.isEnabled

    return await this.repo.save(card)
  }

  /**
   * @inheritdoc
   */
  async destroy(id: number) {
    await this.repo.delete(id)
  }
}
