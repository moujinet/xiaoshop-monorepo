import type { IMemberCardRepository } from '@/member/card/model/Card/interface'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import {
  type IMemberCardDict,
  type IMemberCardInfo,
  type IMemberCustomCardList,
  type IMemberLevelCardList,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { MemberCardRepo } from '@/member/card/model/card/provider'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateMemberCustomCardPayload, UpdateMemberCustomCardPayload, UpdateMemberLevelPayload } from '@/member/card/dto/payload'

import { MemberCardCreateEvent, MemberCardDeleteEvent, MemberCardUpdateEvent } from './events'

@Injectable()
export class MemberCardService {
  constructor(
    @MemberCardRepo()
    private readonly repo: IMemberCardRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取会员等级列表
   *
   * @returns 会员等级列表
   * @throws {FailedException} 获取会员等级列表失败
   */
  async findLevelList(): Promise<IMemberLevelCardList[]> {
    try {
      return await this.repo.find({
        type: MemberCardType.LEVEL,
      }, [
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
      ])
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
      return await this.repo.find({
        type: MemberCardType.CUSTOM,
      }, [
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
      ])
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
      return await this.repo.find({
        isEnabled: YesOrNo.YES,
      }, ['id', 'type', 'name'])
    }
    catch (e) {
      throw new FailedException('获取会员卡字典列表', e.message)
    }
  }

  /**
   * 获取会员卡详情
   *
   * @param id 会员卡 ID
   * @returns 获取会员卡详情失败
   */
  async findById(id: number): Promise<IMemberCardInfo> {
    try {
      const Card = await this.repo.findById(id, [
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
      ])

      if (!Card)
        throw new NotFoundException('会员卡')

      return Card
    }
    catch (e) {
      throw new FailedException('获取会员卡详情', e.message, e.code)
    }
  }

  /**
   * 创建会员卡
   *
   * @param data 创建数据
   * @throws {FailedException} 创建会员卡失败
   * @throws {ExistsException} 会员卡已存在
   */
  async create(data: CreateMemberCustomCardPayload) {
    try {
      if (await this.repo.exists({
        type: MemberCardType.CUSTOM,
        name: data.name.trim(),
      })) {
        throw new ExistsException('会员卡')
      }

      const card = await this.repo.create(data)

      this.event.emit(
        new MemberCardCreateEvent(card.id, card.name),
      )
    }
    catch (e) {
      throw new FailedException('创建会员卡', e.message, e.code)
    }
  }

  /**
   * 更新会员卡
   *
   * @param id 会员卡 ID
   * @param type 会员卡类型
   * @param data 更新数据
   * @throws {FailedException} 更新会员卡失败
   * @throws {NotFoundException} 会员卡不存在
   * @throws {ExistsException} 会员卡已存在
   */
  async update(
    id: number,
    type: MemberCardType,
    data: UpdateMemberCustomCardPayload | UpdateMemberLevelPayload,
  ) {
    try {
      const card = await this.repo.findById(id)

      if (!card || card.type !== type)
        throw new NotFoundException('会员卡')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
      })) {
        throw new ExistsException('会员卡')
      }

      const updated = await this.repo.update(card, data)

      this.event.emit(
        new MemberCardUpdateEvent(updated.id, updated.type, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('创建会员卡', e.message, e.code)
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
      const card = await this.repo.findById(id, ['id', 'type', 'name'])

      if (card && card.type === MemberCardType.CUSTOM) {
        await this.repo.destroy(card.id)

        this.event.emit(
          new MemberCardDeleteEvent(card.id, card.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除会员卡', e.message)
    }
  }
}
