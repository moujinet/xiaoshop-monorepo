import {
  EnabledEnum,
  type IEnabled,
  type IMemberCard,
  type IMemberCardBinding,
  type IMemberCardDict,
  type IMemberLevelCard,
  MemberCardPlanTypeEnum,
  MemberCardTypeEnum,
} from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberCardPayload } from '@/member/card/dto'
import { MemberCard } from '@/member/card/entities/card.entity'
import { MemberCardPlan } from '@/member/card/entities/card-plan.entity'
import { MemberCardBinding } from '@/member/card/entities/card-binding.entity'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberCardService {
  constructor(
    @InjectRepository(MemberCard)
    private readonly card: Repository<MemberCard>,

    @InjectRepository(MemberCardBinding)
    private readonly binding: Repository<MemberCardBinding>,
  ) {}

  /**
   * 获取所有类型会员卡列表
   *
   * @returns {Promise<IMemberCardDict[]>} IMemberCardDict
   * @throws {FailedException}
   */
  async findAllCardList(): Promise<IMemberCardDict[]> {
    try {
      return await this.card.find({
        select: ['id', 'type', 'name'],
      })
    }
    catch (e) {
      throw new FailedException('获取会员卡列表', e.message)
    }
  }

  /**
   * 获取会员等级列表
   *
   * @returns {Promise<IMemberLevelCard[]>} IMemberLevelCard
   * @throws {FailedException}
   */
  async findLevelCardList(): Promise<IMemberLevelCard[]> {
    try {
      return await this.card.find({
        select: [
          'id',
          'isEnabled',
          'key',
          'name',
          'desc',
          'styles',
          'needExp',
          'discount',
          'pointsRatio',
          'isFreeShipping',
          'createdTime',
        ],
        where: {
          type: MemberCardTypeEnum.LEVEL,
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员等级列表', e.message)
    }
  }

  /**
   * 获取自定义会员卡列表
   *
   * @returns {Promise<IMemberCard[]>} IMemberCard
   * @throws {FailedException}
   */
  async findCustomCardList(): Promise<IMemberCard[]> {
    try {
      return await this.card.find({
        where: {
          type: MemberCardTypeEnum.CUSTOM,
        },
        relations: [
          'plans',
        ],
      })
    }
    catch (e) {
      throw new FailedException('获取自定义会员卡列表', e.message)
    }
  }

  /**
   * 获取会员卡详情
   *
   * @param {number} id
   * @returns {Promise<IMemberCard>} IMemberCard
   * @throws {NotFoundException}
   * @throws {FailedException}
   */
  async findDetail(id: number): Promise<IMemberCard> {
    try {
      const detail = await this.card.findOne({
        where: { id },
        relations: [
          'plans',
        ],
      })

      if (!detail)
        throw new NotFoundException('会员卡')

      return detail
    }
    catch (e) {
      throw new FailedException('获取会员卡详情', e.message, e.status)
    }
  }

  /**
   * 创建会员卡 (自定义会员卡)
   *
   * @param {MemberCardPayload} data
   * @returns {Promise<void>}
   * @throws {FailedException}
   * @throws {NotFoundException}
   */
  async create(data: MemberCardPayload): Promise<void> {
    try {
      const founded = await this.card.existsBy({
        type: MemberCardTypeEnum.CUSTOM,
        name: data.name,
      })

      if (!founded)
        throw new NotFoundException('会员卡')

      const count = await this.card.countBy({
        type: MemberCardTypeEnum.CUSTOM,
      })

      const card = new MemberCard()

      card.key = `custom-${count + 1}`
      card.type = MemberCardTypeEnum.CUSTOM
      card.isEnabled = EnabledEnum.YES
      card.name = data.name
      card.desc = data.desc
      card.styles = data.styles
      card.needExp = data.needExp
      card.discount = data.discount
      card.pointsRatio = data.pointsRatio
      card.isFreeShipping = data.isFreeShipping
      card.plans = []

      if (data.plans) {
        for (const item of data.plans) {
          const plan = new MemberCardPlan()

          plan.type = item.type
          plan.price = item.price

          if (plan.type === MemberCardPlanTypeEnum.MONTHS)
            plan.duration = item.duration * 30
          else if (plan.type === MemberCardPlanTypeEnum.YEARS)
            plan.duration = item.duration * 365
          else
            plan.duration = item.duration

          card.plans.push(plan)
        }
      }

      await this.card.save(card)
    }
    catch (e) {
      throw new FailedException('创建会员卡', e.message)
    }
  }

  /**
   * 更新会员卡
   *
   * @param {number} id
   * @param {MemberCardPayload} data
   * @returns {Promise<void>}
   * @throws {NotFoundException}
   * @throws {ExistsException}
   * @throws {FailedException}
   */
  async update(id: number, data: MemberCardPayload): Promise<void> {
    try {
      const founded = await this.card.findOne({
        select: ['key', 'type'],
        where: { id },
      })

      if (!founded)
        throw new NotFoundException('会员卡')

      const exists = await this.card.existsBy({
        id: Not(id),
        name: data.name,
        key: founded.key,
        type: founded.type,
      })

      if (exists)
        throw new ExistsException('会员卡')

      const card = new MemberCard()

      card.id = id
      card.name = data.name
      card.desc = data.desc
      card.styles = data.styles
      card.needExp = data.needExp
      card.discount = data.discount
      card.pointsRatio = data.pointsRatio
      card.isFreeShipping = data.isFreeShipping
      card.plans = []

      if (data.plans) {
        for (const item of data.plans) {
          const plan = new MemberCardPlan()

          plan.type = item.type
          plan.price = item.price

          if (item.id)
            plan.id = item.id

          if (plan.type === MemberCardPlanTypeEnum.MONTHS)
            plan.duration = item.duration * 30
          else if (plan.type === MemberCardPlanTypeEnum.YEARS)
            plan.duration = item.duration * 365
          else
            plan.duration = item.duration

          card.plans.push(plan)
        }
      }

      await this.card.save(card)
    }
    catch (e) {
      throw new FailedException('更新会员卡', e.message)
    }
  }

  /**
   * 更新会员卡状态
   *
   * @param {number} id
   * @param {IEnabled} status
   * @returns {Promise<void>}
   * @throws {NotFoundException}
   * @throws {FailedException}
   */
  async updateStatus(id: number, status: IEnabled): Promise<void> {
    try {
      const founded = await this.card.existsBy({ id })

      if (!founded)
        throw new NotFoundException('会员卡')

      await this.card.update(id, { isEnabled: status })
    }
    catch (e) {
      throw new FailedException('更新会员卡状态', e.message, e.status)
    }
  }

  /**
   * 创建会员卡绑定信息
   *
   * @param {number} cardId
   * @param {number} planId
   * @returns {Promise<IMemberCardBinding>} IMemberCardBinding
   * @throws {FailedException}
   */
  async createBinding(cardId: number, planId?: number): Promise<IMemberCardBinding> {
    try {
      const binding = new MemberCardBinding()
      const card = new MemberCard()

      card.id = cardId
      binding.card = card

      if (planId) {
        const plan = new MemberCardPlan()
        plan.id = planId
        binding.plan = plan
      }

      return await this.binding.save(binding)
    }
    catch (e) {
      throw new FailedException('绑定会员卡', e.message, e.status)
    }
  }

  /**
   * 更新会员卡绑定信息
   *
   * @param {number} id
   * @param {number} cardId
   * @param {number} planId
   * @returns {Promise<void>}
   * @throws {FailedException}
   * @throws {NotFoundException}
   */
  async updateBinding(id: number, cardId: number, planId?: number): Promise<void> {
    try {
      const binding = await this.binding.findOneBy({ id })

      if (!binding)
        throw new NotFoundException('会员卡绑定')

      const card = new MemberCard()
      card.id = cardId
      binding.card = card

      if (planId) {
        const plan = new MemberCardPlan()
        plan.id = planId
        binding.plan = plan
      }

      await this.binding.save(binding)
    }
    catch (e) {
      throw new FailedException('更新会员卡绑定', e.message, e.status)
    }
  }

  /**
   * 删除自定义会员卡
   *
   * @param {number} id
   * @returns {Promise<void>}
   * @throws {FailedException}
   */
  async deleteCustomCard(id: number): Promise<void> {
    try {
      const founded = await this.card.findOne({
        select: ['type'],
        where: { id },
      })

      if (founded.type === MemberCardTypeEnum.CUSTOM)
        await this.card.delete(id)
    }
    catch (e) {
      throw new FailedException('删除会员卡', e.message)
    }
  }
}
