import {
  Enabled,
  type IEnabled,
  type IMemberCard,
  type IMemberCardDict,
  type IMemberCardLevelListItem,
  type IMemberCardListItem,
  type IMemberCardPlan,
  MemberCardPlanType,
  MemberCardType,
} from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { MemberCardPayload } from '@/member/card/dto'
import { MEMBER_CARD_DEFAULT_STYLES } from '@/member/constants'
import { MemberCard, MemberCardPlan } from '@/member/card/entities'
import { ExistsException, FailedException } from '~/common/exception'

@Injectable()
export class MemberCardService {
  constructor(
    @InjectRepository(MemberCard)
    private readonly repository: Repository<MemberCard>,

    @InjectRepository(MemberCardPlan)
    private readonly planRepo: Repository<MemberCardPlan>,
  ) {}

  /**
   * 获取会员卡等级列表
   *
   * @returns Promise<IMemberCardLevelListItem[]>
   * @throws {FailedException} 获取会员卡等级列表失败
   */
  async findLevelList(): Promise<IMemberCardLevelListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          isEnabled: true,
          key: true,
          name: true,
          desc: true,
          needExp: true,
          discount: true,
          pointsRatio: true,
          isFreeShipping: true,
        },
        where: { type: MemberCardType.LEVEL },
        order: { key: 'ASC' },
      })
    }
    catch (e) {
      throw new FailedException('获取会员卡等级列表', e.message)
    }
  }

  /**
   * 获取自定义会员卡列表
   *
   * @returns Promise<IMemberCardListItem[]>
   * @throws {FailedException} 获取自定义会员卡列表失败
   */
  async findCustomList(): Promise<IMemberCardListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          isEnabled: true,
          key: true,
          name: true,
          desc: true,
          discount: true,
          pointsRatio: true,
          isFreeShipping: true,
          plans: true,
        },
        where: { type: MemberCardType.CUSTOM },
        relations: ['plans'],
        order: { updatedTime: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取自定义会员卡列表', e.message)
    }
  }

  /**
   * 获取会员卡字典列表
   *
   * @returns Promise<IMemberCardDict[]>
   * @throws {FailedException} 获取会员卡字典列表失败
   */
  async findDictList(): Promise<IMemberCardDict[]> {
    try {
      return await this.repository.find({
        select: { id: true, type: true, name: true },
        where: { type: MemberCardType.CUSTOM },
        order: { type: 'DESC', updatedTime: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取会员卡字典列表', e.message)
    }
  }

  /**
   * 获取会员卡详情
   *
   * @param id 会员卡 ID
   * @returns Promise<IMemberCard>
   * @throws {FailedException} 获取会员卡详情失败
   * @throws {NotFoundException} 会员卡不存在
   */
  async findDetail(id: number): Promise<IMemberCard> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
        relations: ['plans'],
      })

      if (!detail)
        throw new NotFoundException('会员卡不存在')

      return detail
    }
    catch (e) {
      throw new FailedException('获取会员卡详情', e.message, e.status)
    }
  }

  /**
   * 创建会员卡
   *
   * @param data 会员卡创建表单
   * @throws {FailedException} 创建会员卡失败
   * @throws {NotFoundException} 会员卡不存在
   * @throws {ExistsException} 会员卡已存在
   */
  async create(data: MemberCardPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name, type: MemberCardType.CUSTOM })

      if (exists)
        throw new ExistsException('会员卡已存在')

      const total = await this.repository.countBy({ type: MemberCardType.CUSTOM })

      const card = new MemberCard()

      card.key = `vip${total + 1}`
      card.name = data.name
      card.desc = data.desc || ''
      card.needExp = data.needExp || 0
      card.discount = data.discount || 0
      card.pointsRatio = data.pointsRatio || 0
      card.styles = data.styles || MEMBER_CARD_DEFAULT_STYLES
      card.isFreeShipping = data.isFreeShipping || Enabled.NO
      card.type = MemberCardType.CUSTOM
      card.isEnabled = Enabled.YES

      if (data.plans && data.plans.length > 0) {
        card.plans = []

        for (const plan of data.plans) {
          const cardPlan = new MemberCardPlan()

          cardPlan.card = card
          cardPlan.type = plan.type || MemberCardPlanType.TIMES
          cardPlan.price = plan.price || 0
          cardPlan.duration = plan.duration || 0

          card.plans.push(cardPlan)
        }
      }

      await this.repository.save(card)
    }
    catch (e) {
      throw new FailedException('创建会员卡', e.message, e.status)
    }
  }

  /**
   * 更新会员卡
   *
   * @param id 会员卡 ID
   * @param data 会员卡更新表单
   * @throws {FailedException} 更新会员卡失败
   * @throws {NotFoundException} 会员卡不存在
   * @throws {ExistsException} 会员卡已存在
   */
  async update(id: number, data: MemberCardPayload) {
    try {
      const card = await this.repository.findOne({
        where: { id },
        relations: ['plans'],
      })

      if (!card)
        throw new NotFoundException('会员卡不存在')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('会员卡已存在')

      card.name = data.name

      if (data.desc)
        card.desc = data.desc
      if (data.needExp)
        card.needExp = data.needExp
      if (data.discount)
        card.discount = data.discount
      if (data.pointsRatio)
        card.pointsRatio = data.pointsRatio
      if (data.styles)
        card.styles = data.styles || MEMBER_CARD_DEFAULT_STYLES
      if (data.isFreeShipping)
        card.isFreeShipping = data.isFreeShipping

      if (data.plans && data.plans.length > 0) {
        const plans: IMemberCardPlan[] = []

        for (const plan of data.plans) {
          const cardPlan = new MemberCardPlan()

          if (plan.id)
            cardPlan.id = plan.id

          cardPlan.card = card
          cardPlan.type = plan.type || MemberCardPlanType.TIMES
          cardPlan.price = plan.price || 0
          cardPlan.duration = plan.duration || 0

          plans.push(cardPlan)
        }

        const removed = card.plans.filter(
          cardPlan => plans.map(p => p.id).includes(cardPlan.id) === false,
        ).map(cardPlan => cardPlan.id)

        if (removed.length > 0) {
          await this.planRepo.delete(removed)
        }

        card.plans = plans
      }

      delete card.updatedTime

      await this.repository.save(card)
    }
    catch (e) {
      throw new FailedException('更新会员卡', e.message, e.status)
    }
  }

  /**
   * 更新会员卡启用状态
   *
   * @param id 会员卡 ID
   * @param status 启用状态
   * @throws {FailedException} 更新会员卡状态失败
   * @throws {NotFoundException} 会员卡不存在
   */
  async updateStatus(id: number, status: IEnabled) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('会员卡不存在')

      await this.repository.update({ id }, { isEnabled: status })
    }
    catch (e) {
      throw new FailedException('更新会员卡状态', e.message)
    }
  }

  /**
   * 删除会员卡
   *
   * @param id 会员卡 ID
   * @throws {FailedException} 删除会员卡失败
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.existsBy({ id, type: MemberCardType.CUSTOM })

      if (founded) {
        await this.repository.delete({ id }).then(() => {
          this.planRepo.delete({ card: { id } })
        })
      }
    }
    catch (e) {
      throw new FailedException('删除会员卡', e.message)
    }
  }
}
