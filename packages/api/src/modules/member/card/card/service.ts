import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  type IMemberCardDict,
  type IMemberCardInfo,
  type IMemberCustomCardList,
  type IMemberLevelCardList,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'

import { MEMBER_CARD_PLAN_TYPES } from '~/common/dicts'
import { objectToDict, pipeDict, toEventName } from '~/utils/transformers'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { DEFAULT_MEMBER_BADGE_STYLE, DEFAULT_MEMBER_CARD_STYLE } from '@/member/constants'

import { MemberCard } from './entity'
import { MemberCardPayload } from './dto'
import { MemberCardBindingService } from '../binding/service'
import {
  MemberCardCreateEvent,
  MemberCardDeleteEvent,
  MemberCardStatusUpdateEvent,
  MemberCardUpdateEvent,
} from './events'

@Injectable()
export class MemberCardService {
  constructor(
    @InjectRepository(MemberCard)
    private readonly repository: Repository<MemberCard>,

    @Inject(MemberCardBindingService)
    private readonly binding: MemberCardBindingService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 检查会员卡是否存在
   *
   * @param id 会员卡 ID
   * @returns 是否存在会员卡
   */
  async exists(id: number): Promise<boolean> {
    return await this.repository.existsBy({ id })
  }

  /**
   * 获取会员等级列表
   *
   * @returns 会员等级列表
   * @throws {FailedException} 获取会员等级列表失败
   */
  async findLevelCardList(): Promise<IMemberLevelCardList[]> {
    try {
      return await this.repository.find({
        select: [
          'id',
          'isEnabled',
          'key',
          'name',
          'desc',
          'badgeStyle',
          'needExp',
          'discount',
          'pointsRatio',
          'isFreeShipping',
          'total',
          'updatedTime',
        ],
        where: {
          type: MemberCardType.LEVEL,
        },
        order: {
          key: 'ASC',
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
   * @returns 自定义会员卡列表
   * @throws {FailedException} 获取自定义会员卡列表失败
   */
  async findCustomCardList(): Promise<IMemberCustomCardList[]> {
    try {
      const list = await this.repository.find({
        select: [
          'id',
          'isEnabled',
          'key',
          'name',
          'desc',
          'badgeStyle',
          'needExp',
          'discount',
          'pointsRatio',
          'isFreeShipping',
          'plans',
          'total',
          'updatedTime',
        ],
        where: {
          type: MemberCardType.CUSTOM,
        },
        order: {
          key: 'ASC',
        },
      })

      return list.map(card => ({
        ...card,
        plans: pipeDict(card.plans, [
          plan => objectToDict(plan, 'type', MEMBER_CARD_PLAN_TYPES),
        ]),
      }))
    }
    catch (e) {
      throw new FailedException('获取自定义会员卡列表', e.message)
    }
  }

  /**
   * 获取会员卡字典列表
   *
   * @returns 会员卡字典列表
   * @throws {FailedException} 获取会员卡字典列表失败
   */
  async findDictList(): Promise<IMemberCardDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'type', 'name'],
        where: {
          isEnabled: YesOrNo.YES,
        },
        order: {
          type: 'ASC',
          key: 'ASC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员卡字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取会员卡信息
   *
   * @param id 会员卡 ID
   * @returns 会员卡信息
   * @throws {FailedException} 获取会员卡信息失败
   * @throws {NotFoundException} 会员卡不存在
   */
  async findById(id: number): Promise<IMemberCardInfo> {
    try {
      const card = await this.repository.findOne({
        select: [
          'id',
          'isEnabled',
          'type',
          'key',
          'name',
          'desc',
          'cardStyle',
          'badgeStyle',
          'needExp',
          'discount',
          'pointsRatio',
          'isFreeShipping',
          'plans',
        ],
        where: {
          id,
        },
      })

      if (!card)
        throw new NotFoundException('会员卡')

      return {
        ...card,
        plans: pipeDict(card.plans, [
          plan => objectToDict(plan, 'type', MEMBER_CARD_PLAN_TYPES),
        ]),
      }
    }
    catch (e) {
      throw new FailedException('获取会员卡信息', e.message, e.status)
    }
  }

  /**
   * 创建自定义会员卡
   *
   * @param data 会员卡信息
   * @throws {FailedException} 创建会员卡失败
   * @throws {ExistsException} 会员卡已存在
   */
  async create(data: MemberCardPayload) {
    try {
      const exists = await this.repository.existsBy({
        type: MemberCardType.CUSTOM,
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('会员卡')

      const count = await this.repository.countBy({
        type: MemberCardType.CUSTOM,
      })

      const card = new MemberCard()

      card.key = `svip${count + 1}`
      card.type = MemberCardType.CUSTOM
      card.name = data.name.trim()
      card.desc = data.desc || ''
      card.cardStyle = data.cardStyle || DEFAULT_MEMBER_CARD_STYLE
      card.badgeStyle = data.badgeStyle || DEFAULT_MEMBER_BADGE_STYLE
      card.needExp = data.needExp || 0
      card.discount = data.discount || 100
      card.pointsRatio = data.pointsRatio || 1
      card.isFreeShipping = data.isFreeShipping || YesOrNo.NO
      card.plans = data.plans || []
      card.isEnabled = data.isEnabled || YesOrNo.YES

      const created = await this.repository.save(card)

      this.event.emit(
        toEventName(MemberCardCreateEvent.name),
        new MemberCardCreateEvent(created.id, created.name),
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
   * @param data 会员卡信息
   * @throws {FailedException} 更新会员卡失败
   * @throws {NotFoundException} 会员卡不存在
   * @throws {ExistsException} 无法停用已被绑定的会员卡
   * @throws {ExistsException} 会员卡已存在
   */
  async update(id: number, data: MemberCardPayload) {
    try {
      const card = await this.repository.findOne({
        where: {
          id,
        },
      })

      if (!card)
        throw new NotFoundException('会员卡')

      const exists = await this.repository.existsBy({
        id: Not(id),
        type: card.type,
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('会员卡')

      card.name = data.name.trim()

      if (data.desc !== undefined)
        card.desc = data.desc

      if (data.cardStyle !== undefined)
        card.cardStyle = data.cardStyle

      if (data.badgeStyle !== undefined)
        card.badgeStyle = data.badgeStyle

      if (data.needExp !== undefined)
        card.needExp = data.needExp

      if (data.discount !== undefined)
        card.discount = data.discount

      if (data.pointsRatio !== undefined)
        card.pointsRatio = data.pointsRatio

      if (data.isFreeShipping !== undefined)
        card.isFreeShipping = data.isFreeShipping

      if (data.plans !== undefined)
        card.plans = data.plans

      if (data.isEnabled !== undefined)
        card.isEnabled = data.isEnabled

      if (card.isEnabled === YesOrNo.NO && await this.binding.exists(card.id))
        throw new ExistsException('无法停用已被绑定的会员卡')

      const updated = await this.repository.save(card)

      this.event.emit(
        toEventName(MemberCardUpdateEvent.name),
        new MemberCardUpdateEvent(updated.id, card.type, updated.name),
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
   * @param isEnabled 启用状态
   * @throws {FailedException} 更新会员卡状态失败
   * @throws {ExistsException} 无法停用已被绑定的会员卡
   * @throws {NotFoundException} 会员卡不存在
   */
  async updateStatus(id: number, isEnabled: YesOrNo) {
    try {
      const card = await this.repository.findOne({
        select: ['id', 'type', 'name'],
        where: {
          id,
        },
      })

      if (!card)
        throw new NotFoundException('会员卡')

      card.isEnabled = isEnabled

      if (card.isEnabled === YesOrNo.NO && await this.binding.exists(card.id))
        throw new ExistsException('无法停用已被绑定的会员卡')

      await this.repository.save(card)

      this.event.emit(
        toEventName(MemberCardStatusUpdateEvent.name),
        new MemberCardStatusUpdateEvent(card.id, card.type, card.name, isEnabled),
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
   * @throws {NotFoundException} 会员卡不存在
   * @throws {FailedException} 删除会员卡失败
   * @throws {ExistsException} 无法删除已被绑定的会员卡
   */
  async delete(id: number) {
    try {
      const card = await this.repository.findOne({
        select: ['id', 'type', 'name'],
        where: { id },
      })

      if (!card)
        throw new NotFoundException('会员卡')

      if (await this.binding.exists(card.id))
        throw new ExistsException('无法删除已被绑定的会员卡')

      await this.repository.delete(id)

      this.event.emit(
        toEventName(MemberCardDeleteEvent.name),
        new MemberCardDeleteEvent(card.id, card.type, card.name),
      )
    }
    catch (e) {
      throw new FailedException('删除会员卡', e.message)
    }
  }
}
