import {
  Enabled,
  type IEnabled,
  type IMemberCard,
  type IMemberCardDict,
  type IMemberCustomCardListItem,
  type IMemberLevelListItem,
  MemberCardPlanType,
  MemberCardType,
} from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { MEMBER_CARD_DEFAULT_BADGE, MEMBER_CARD_DEFAULT_STYLES } from '@/member/constants'
import { MemberCardPayload } from '@/member/card/dto'
import { MemberCard } from '@/member/card/entity'
import { ExistsException, FailedException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class MemberCardService {
  constructor(
    @InjectRepository(MemberCard)
    private readonly repository: Repository<MemberCard>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 判断会员卡是否存在
   *
   * @param id 会员卡 ID
   * @returns Promise<IMemberCard>
   */
  async existsCard(id: number): Promise<boolean> {
    return await this.repository.existsBy({ id })
  }

  /**
   * 获取会员卡等级列表
   *
   * @returns Promise<IMemberLevelListItem[]>
   * @throws {FailedException} 获取会员卡等级列表失败
   */
  async findLevelList(): Promise<IMemberLevelListItem[]> {
    try {
      return await this.repository.find({
        select: [
          'id',
          'type',
          'isEnabled',
          'key',
          'name',
          'desc',
          'badgeStyles',
          'needExp',
          'discount',
          'pointsRatio',
          'isFreeShipping',
          'total',
        ],
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
   * @returns Promise<IMemberCustomCardListItem[]>
   * @throws {FailedException} 获取自定义会员卡列表失败
   */
  async findCustomList(): Promise<IMemberCustomCardListItem[]> {
    try {
      return await this.repository.find({
        select: [
          'id',
          'type',
          'isEnabled',
          'key',
          'name',
          'desc',
          'badgeStyles',
          'discount',
          'pointsRatio',
          'isFreeShipping',
          'plans',
          'total',
          'createdTime',
        ],
        where: { type: MemberCardType.CUSTOM },
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
        where: { isEnabled: Enabled.YES },
        order: { type: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取会员卡字典列表', e.message)
    }
  }

  /**
   * 获取下一级会员卡
   *
   * @param key string
   * @returns Promise<IMemberCard>
   * @throws {FailedException} 获取下一级会员卡失败
   */
  async findNextLevelCard(key: string): Promise<IMemberCard> {
    try {
      const nextKey = `vip${Number(key.replace('vip', '')) + 1}`

      const card = await this.repository.findOne({
        where: {
          type: MemberCardType.LEVEL,
          isEnabled: Enabled.YES,
          key: nextKey,
        },
      })

      return card
    }
    catch (e) {
      throw new FailedException('获取下一级会员卡', e.message, e.status)
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
      const card = await this.repository.findOne({
        where: { id },
      })

      if (!card)
        throw new NotFoundException('会员卡不存在')

      return card
    }
    catch (e) {
      throw new FailedException('获取会员卡详情', e.message, e.status)
    }
  }

  /**
   * 获取会员卡样式
   *
   * @param id 会员卡 ID
   * @returns Promise<Pick<IMemberCard, 'badgeStyles' | 'cardStyles'>>
   * @throws {NotFoundException} 会员卡不存在
   * @throws {FailedException} 获取会员卡样式失败
   */
  async findCardStyles(id: number): Promise<Pick<IMemberCard, 'badgeStyles' | 'cardStyles'>> {
    try {
      const card = await this.repository.findOne({
        select: ['badgeStyles', 'cardStyles'],
        where: { id },
      })

      if (!card)
        throw new NotFoundException('会员卡不存在')

      return card
    }
    catch (e) {
      throw new FailedException('获取会员卡样式', e.message, e.status)
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

      card.key = `svip${total + 1}`
      card.name = data.name
      card.desc = data.desc || ''
      card.needExp = data.needExp || 0
      card.discount = data.discount || 0
      card.pointsRatio = data.pointsRatio || 0
      card.badgeStyles = data.badgeStyles || MEMBER_CARD_DEFAULT_BADGE
      card.cardStyles = data.cardStyles || MEMBER_CARD_DEFAULT_STYLES
      card.isFreeShipping = data.isFreeShipping || Enabled.NO
      card.type = MemberCardType.CUSTOM
      card.isEnabled = Enabled.YES

      if (data.plans && data.plans.length > 0) {
        card.plans = data.plans.map((plan, index) => {
          return {
            id: plan.id || index + 1,
            type: plan.type || MemberCardPlanType.TIMES,
            duration: plan.duration || 0,
            price: plan.price || 0,
          }
        })
      }

      await this.repository.save(card)
      await this.log.write('会员管理', `创建会员卡「${data.name}」`)
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
      if (data.cardStyles)
        card.cardStyles = data.cardStyles || MEMBER_CARD_DEFAULT_STYLES
      if (data.badgeStyles)
        card.badgeStyles = data.badgeStyles || MEMBER_CARD_DEFAULT_BADGE
      if (data.isFreeShipping)
        card.isFreeShipping = data.isFreeShipping

      if (data.plans && data.plans.length > 0) {
        card.plans = data.plans.map((plan, index) => {
          return {
            id: plan.id || index + 1,
            type: plan.type || MemberCardPlanType.TIMES,
            duration: plan.duration || 0,
            price: plan.price || 0,
          }
        })
      }

      delete card.updatedTime

      await this.repository.save(card)
      await this.log.write('会员管理', `更新会员卡「${data.name}」`)
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
      const card = await this.repository.findOneBy({ id })

      if (!card)
        throw new NotFoundException('会员卡不存在')

      await this.repository.update({ id }, { isEnabled: status })
      await this.log.write('会员管理', `更新会员卡「${card.name}」状态为「${status === Enabled.YES ? '启用' : '禁用'}」`)
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
      const founded = await this.repository.findOneBy({
        id,
        type: MemberCardType.CUSTOM,
      })

      if (founded) {
        await this.repository.delete({ id })
        await this.log.write('会员管理', `删除会员卡「${founded.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除会员卡', e.message)
    }
  }
}
