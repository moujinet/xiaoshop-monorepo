import type { IMemberGroupFilterPayload } from '@/member/group/model/interface'
import type { IMemberProfileRelations, IMemberProfileRepository, IMemberProfileSelect, IMemberProfileWhere } from '@/member/account/model/profile/interface'

import { Between, In, Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { MemberGroupFilterKey, MemberGroupFilterOperator } from '@xiaoshop/shared'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { MemberProfileRepo } from '@/member/account/model/profile/provider'

import { MemberGroupUpdateEvent } from './events'

@Injectable()
export class MemberStatisticsService {
  constructor(
    @MemberProfileRepo()
    private readonly profile: IMemberProfileRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 根据筛选条件统计会员人数
   *
   * @param groupId 会员群体 ID
   * @param groupName 会员群体名称
   * @param filters 筛选条件
   * @returns 统计结果
   */
  async countMemberByFilters(
    groupId: number,
    groupName: string,
    filters: IMemberGroupFilterPayload[],
  ): Promise<number> {
    try {
      if (filters.length === 0)
        return 0

      const members = await this.findMemberListByFilters(filters)

      const memberIds = members
        .filter(m => m.groupId === groupId)
        .map(m => m.id)

      if (memberIds.length > 0) {
        await this.profile.getRepository().update(
          { id: In(memberIds) },
          { groupId },
        )

        for (const member of members) {
          if (member.groupId !== groupId) {
            this.event.emit(
              new MemberGroupUpdateEvent(
                member.id,
                member.username,
                groupId,
                groupName,
              ),
            )
          }
        }
      }

      return members.length
    }
    catch (e) {
      throw new FailedException('统计会员群体', e.message)
    }
  }

  /**
   * 根据筛选条件获取符合条件的会员
   *
   * @param filters 筛选条件
   * @param select 查询字段
   * @returns 符合条件的会员列表
   * @throws {FailedException} 获取符合条件的会员失败
   */
  async findMemberListByFilters(
    filters: IMemberGroupFilterPayload[],
    select: IMemberProfileSelect = ['id', 'username', 'groupId'],
  ) {
    try {
      const where: IMemberProfileWhere = {}
      const relations: IMemberProfileRelations = []

      for (const filter of filters) {
        const {
          key,
          operator,
          value,
        } = filter

        switch (key) {
          case MemberGroupFilterKey.SOURCE:
            where.source = operator === MemberGroupFilterOperator.IN ? In(value) : Not(In(value))
            break

          case MemberGroupFilterKey.STATUS:
            where.status = operator === MemberGroupFilterOperator.IN ? In(value) : Not(In(value))
            break

          case MemberGroupFilterKey.GENDER:
            where.gender = operator === MemberGroupFilterOperator.IN ? In(value) : Not(In(value))
            break

          case MemberGroupFilterKey.CARD:
            where.cardId = operator === MemberGroupFilterOperator.IN ? In(value) : Not(In(value))
            relations.push('card')
            break

          case MemberGroupFilterKey.CHECK_IN:
            where.checkInTimes = Between(Number(value[0]), Number(value[1]))
            break

          case MemberGroupFilterKey.CHECK_IN_DAY:
            where.checkInDays = Between(Number(value[0]), Number(value[1]))
            break

          case MemberGroupFilterKey.ORDER_COUNT:
            where.orderCount = Between(Number(value[0]), Number(value[1]))
            break

          case MemberGroupFilterKey.ORDER_AMOUNT:
            where.orderAmount = Between(Number(value[0]), Number(value[1]))
            break

          case MemberGroupFilterKey.TAG:
            where.tags = { id: operator === MemberGroupFilterOperator.IN ? In(value) : Not(In(value)) }
            relations.push('tags')
            break

          case MemberGroupFilterKey.BIRTHDAY:
            where.birthday = Between(`${value[0]}`, `${value[1]}`)
            break

          case MemberGroupFilterKey.CREATED_TIME:
            where.createdTime = Between(`${value[0]} 00:00:00`, `${value[1]} 23:59:59`)
            break

          case MemberGroupFilterKey.POINTS:
            where.account = { key: 'points', value: Between(Number(value[0]), Number(value[1])) }
            relations.push('account')
            break

          case MemberGroupFilterKey.EXP:
            where.account = { key: 'exp', value: Between(Number(value[0]), Number(value[1])) }
            !relations.includes('account') && relations.push('account')
            break
        }
      }

      return await this.profile.find(where, select, relations)
    }
    catch (e) {
      throw new FailedException('查询指定群体下的会员列表', e.message)
    }
  }
}
