import {
  type IMemberCard,
  type IMemberCardDict,
  type IMemberCustomCardListItem,
  type IMemberLevelCardListItem,
  type IYesOrNo,
  MemberCardPlanType,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { MEMBER_CARD_DEFAULT_BADGE, MEMBER_CARD_DEFAULT_STYLES } from '@/member/constants'
import { MemberCardPayload } from '@/member/card/dto'
import { toEventName } from '~/utils/transformers'
import { MemberCard } from '@/member/card/entity'
import {
  ExistsException,
  FailedException,
} from '~/common/exceptions'
import {
  MemberCardCreatedEvent,
  MemberCardDeletedEvent,
  MemberCardStatusUpdatedEvent,
  MemberCardUpdatedEvent,
} from '@/member/card/events'

@Injectable()
export class MemberCardService {
  constructor(
    @InjectRepository(MemberCard)
    private readonly repository: Repository<MemberCard>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员卡等级列表
   *
   * @returns Promise<IMemberLevelCardListItem[]>
   * @throws {FailedException} 获取会员卡等级列表失败
   */
  async findLevelList(): Promise<IMemberLevelCardListItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'type', 'enable', 'key', 'name', 'desc', 'badgeStyle', 'needExp', 'discount', 'pointsRatio', 'freeShipping', 'total'],
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
        select: ['id', 'type', 'enable', 'key', 'name', 'desc', 'badgeStyle', 'discount', 'pointsRatio', 'freeShipping', 'plans', 'total', 'updatedTime'],
        where: { type: MemberCardType.CUSTOM },
        order: {
          key: 'ASC',
          updatedTime: 'DESC',
        },
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
        where: { enable: YesOrNo.YES },
        order: {
          type: 'DESC',
          key: 'ASC',
          updatedTime: 'DESC',
        },
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
          enable: YesOrNo.YES,
          type: MemberCardType.LEVEL,
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
  async findById(id: number): Promise<IMemberCard> {
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
   * @returns Promise<Pick<IMemberCard, 'badgeStyle' | 'cardStyle'>>
   * @throws {NotFoundException} 会员卡不存在
   * @throws {FailedException} 获取会员卡样式失败
   */
  async findCardStyles(id: number): Promise<Pick<IMemberCard, 'badgeStyle' | 'cardStyle'>> {
    try {
      const card = await this.repository.findOne({
        select: ['badgeStyle', 'cardStyle'],
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
   * @throws {ExistsException} 会员卡已存在
   * @event MemberCardCreatedEvent
   */
  async create(data: MemberCardPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name, type: MemberCardType.CUSTOM })

      if (exists)
        throw new ExistsException('会员卡已存在')

      const total = await this.repository.countBy({ type: MemberCardType.CUSTOM })
      const card = new MemberCard()

      card.enable = YesOrNo.YES
      card.type = MemberCardType.CUSTOM
      card.key = `svip${total + 1}`
      card.name = data.name
      card.desc = data.desc || ''
      card.needExp = data.needExp || 0
      card.discount = data.discount || 0
      card.pointsRatio = data.pointsRatio || 0
      card.badgeStyle = data.badgeStyle || MEMBER_CARD_DEFAULT_BADGE
      card.cardStyle = data.cardStyle || MEMBER_CARD_DEFAULT_STYLES
      card.freeShipping = data.freeShipping || YesOrNo.NO

      if (data.plans && data.plans.length > 0) {
        card.plans = data.plans.map((plan, index) => {
          return {
            id: plan.id || index + 1,
            type: plan.type || MemberCardPlanType.TIMES,
            due: plan.due || 0,
            price: plan.price || 0,
          }
        })
      }

      const created = await this.repository.save(card)

      this.event.emit(
        toEventName(MemberCardCreatedEvent.name),
        new MemberCardCreatedEvent(created.id, created.name),
      )
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
   * @event MemberCardUpdatedEvent
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
      if (data.cardStyle)
        card.cardStyle = data.cardStyle
      if (data.badgeStyle)
        card.badgeStyle = data.badgeStyle
      if (data.freeShipping)
        card.freeShipping = data.freeShipping

      if (data.plans && data.plans.length > 0) {
        card.plans = data.plans.map((plan, index) => {
          return {
            id: plan.id || index + 1,
            type: plan.type,
            due: plan.due,
            price: plan.price,
          }
        })
      }

      delete card.updatedTime

      await this.repository.save(card)

      this.event.emit(
        toEventName(MemberCardUpdatedEvent.name),
        new MemberCardUpdatedEvent(card.id, card.name),
      )
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
   * @event MemberCardStatusUpdatedEvent
   */
  async updateStatus(id: number, status: IYesOrNo) {
    try {
      const card = await this.repository.findOneBy({ id })

      if (!card)
        throw new NotFoundException('会员卡不存在')

      await this.repository.update({ id }, { enable: status })

      this.event.emit(
        toEventName(MemberCardStatusUpdatedEvent.name),
        new MemberCardStatusUpdatedEvent(card.id, card.name, status),
      )
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
   * @event MemberCardDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({
        id,
        type: MemberCardType.CUSTOM,
      })

      if (founded) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(MemberCardDeletedEvent.name),
          new MemberCardDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除会员卡', e.message)
    }
  }

  /**
   * 判断会员卡是否存在
   *
   * @param id 会员卡 ID
   * @returns Promise<boolean>
   */
  async existsCard(id: number): Promise<boolean> {
    return await this.repository.existsBy({ id })
  }
}
