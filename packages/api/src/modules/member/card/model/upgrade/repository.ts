import type {
  IMemberCardUpgradeRepository,
  IMemberCardUpgradeSelect,
  IMemberCardUpgradeWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MemberCardUpgradeEntity } from './entity'

const defaultSelect: IMemberCardUpgradeSelect = {
  id: true,
  cardId: true,
  cardPlanId: true,
  key: true,
  type: true,
  name: true,
  badgeStyle: { image: true, icon: true, textColor: true, bgColor: true },
  method: true,
  reason: true,
  createdTime: true,
}

const listSelect: IMemberCardUpgradeSelect = {
  id: true,
  key: true,
  type: true,
  name: true,
  badgeStyle: { image: true, icon: true, textColor: true, bgColor: true },
  method: true,
  reason: true,
  createdTime: true,
}

@Injectable()
export class MemberCardUpgradeRepository implements IMemberCardUpgradeRepository {
  constructor(
    @InjectRepository(MemberCardUpgradeEntity)
    private readonly repo: Repository<MemberCardUpgradeEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async find(
    where: IMemberCardUpgradeWhere,
    select: IMemberCardUpgradeSelect = listSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        createdTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: IMemberCardUpgradeSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberCardUpgradeWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<MemberCardUpgradeEntity>) {
    return await this.repo.save(data)
  }
}
