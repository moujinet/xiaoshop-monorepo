import type { IMemberPointsRuleKey, YesOrNo } from '@xiaoshop/shared'
import type {
  IMemberPointsRuleRepository,
  IMemberPointsRuleSelect,
  IMemberPointsRuleWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MemberPointsRuleEntity } from './entity'

const defaultSelect: IMemberPointsRuleSelect = ['key', 'isEnabled', 'name', 'desc', 'icon', 'options']

@Injectable()
export class MemberPointsRuleRepository implements IMemberPointsRuleRepository {
  constructor(
    @InjectRepository(MemberPointsRuleEntity)
    private readonly repo: Repository<MemberPointsRuleEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async find(where?: IMemberPointsRuleWhere) {
    return await this.repo.find({
      select: defaultSelect,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async findByKey(key: IMemberPointsRuleKey, select: IMemberPointsRuleSelect = defaultSelect) {
    return await this.repo.findOne({
      select,
      where: { key },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberPointsRuleWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async update(
    rule: MemberPointsRuleEntity,
    data: Partial<MemberPointsRuleEntity>,
  ) {
    if (data.desc.trim() !== rule.desc)
      rule.desc = data.desc

    if (data.icon.trim() !== rule.icon)
      rule.icon = data.icon

    if (data.options)
      rule.options = data.options

    return await this.repo.save(rule)
  }

  /**
   * @inheritdoc
   */
  async updateStatus(key: IMemberPointsRuleKey, isEnabled: YesOrNo) {
    await this.repo.update(key, { isEnabled })
  }
}
