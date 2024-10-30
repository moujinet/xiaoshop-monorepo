import type { IMemberAccountRepository } from '@/member/account/model/account/interface'

import { Inject, Injectable } from '@nestjs/common'
import { MemberAccountChangeMethod, MemberAccountKey } from '@xiaoshop/shared'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { MemberAccountRepo } from '@/member/account/model/account/provider'
import { MemberPointsChangeEvent, MemberPointsSetupEvent } from '@/member/points/domain/change/events'

@Injectable()
export class MemberPointsService {
  constructor(
    @MemberAccountRepo()
    private readonly account: IMemberAccountRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 增加会员积分
   *
   * @param memberId 会员 ID
   * @param points 会员积分
   * @param reason 操作原因
   * @throws {FailedException} 增加会员积分失败
   * @throws {NotFoundException} 会员信息不存在
   */
  async increment(memberId: number, points: number, reason: string) {
    try {
      const method = MemberAccountChangeMethod.ADD

      await this.updateAccount(
        memberId,
        points,
        method,
      )

      this.event.emit(
        new MemberPointsChangeEvent(
          memberId,
          method,
          points,
          reason || '',
        ),
      )
    }
    catch (e) {
      throw new FailedException('增加会员积分', e.message, e.code)
    }
  }

  /**
   * 减少会员积分
   *
   * @param memberId 会员 ID
   * @param points 会员积分
   * @param reason 操作原因
   * @throws {FailedException} 减少会员积分失败
   * @throws {NotFoundException} 会员信息不存在
   */
  async decrement(memberId: number, points: number, reason: string) {
    try {
      const method = MemberAccountChangeMethod.SUB

      await this.updateAccount(
        memberId,
        points,
        method,
      )

      this.event.emit(
        new MemberPointsChangeEvent(
          memberId,
          method,
          points,
          reason || '',
        ),
      )
    }
    catch (e) {
      throw new FailedException('减少会员积分', e.message, e.code)
    }
  }

  /**
   * 更新会员积分
   *
   * @param memberId 会员 ID
   * @param points 会员积分
   * @param reason 操作原因
   * @throws {FailedException} 更新会员积分失败
   * @throws {NotFoundException} 会员信息不存在
   */
  async update(memberId: number, points: number, reason: string) {
    try {
      await this.updateAccount(memberId, points)

      this.event.emit(
        new MemberPointsSetupEvent(memberId, points, reason || ''),
      )
    }
    catch (e) {
      throw new FailedException('更新会员积分', e.message, e.code)
    }
  }

  /**
   * 更新会员积分账户
   *
   * @param memberId 会员 ID
   * @param points 会员积分
   * @param method 操作方式
   * @throws {FailedException} 更新会员积分失败
   * @throws {NotFoundException} 会员信息不存在
   */
  async updateAccount(memberId: number, points: number, method?: MemberAccountChangeMethod) {
    try {
      const account = await this.account.findOne({
        memberId,
        key: MemberAccountKey.POINTS,
      }, ['id', 'memberId', 'key', 'value'])

      if (!account)
        throw new NotFoundException('会员信息')

      points = method
        ? method === MemberAccountChangeMethod.ADD
          ? account.value + points
          : account.value - points
        : points

      await this.account.update(account, {
        memberId,
        key: MemberAccountKey.POINTS,
        value: points,
      })
    }
    catch (e) {
      throw new FailedException('更新会员积分账户', e.message, e.code)
    }
  }
}
