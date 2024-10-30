import type { IMemberPointsRuleRepository } from '@/member/points/model/rule/interface'

import { Inject, Injectable } from '@nestjs/common'
import { type IMemberPointsRule, type IMemberPointsRuleKey, YesOrNo } from '@xiaoshop/shared'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { MemberPointsRuleRepo } from '@/member/points/model/rule/provider'
import { UpdateMemberPointsRulePayload } from '@/member/points/dto/payload'

import { MemberPointsRuleUpdateEvent } from './events'

@Injectable()
export class MemberPointsRuleService {
  constructor(
    @MemberPointsRuleRepo()
    private readonly repo: IMemberPointsRuleRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取会员积分规则列表
   *
   * @returns 会员积分规则列表
   * @throws {FailedException} 获取会员积分规则列表失败
   */
  async findList(): Promise<IMemberPointsRule[]> {
    try {
      return await this.repo.find()
    }
    catch (e) {
      throw new FailedException('获取会员积分规则列表', e.message)
    }
  }

  /**
   * 获取会员积分规则选项
   *
   * @param key 会员积分规则标识
   * @returns 会员积分规则选项
   * @throws {FailedException} 获取会员积分规则选项失败
   * @throws {NotFoundException} 会员积分规则不存在
   */
  async findOptions(key: IMemberPointsRuleKey) {
    try {
      const rule = await this.repo.findByKey(key, ['isEnabled', 'options'])

      if (!rule)
        throw new NotFoundException('会员积分规则')

      if (rule.isEnabled === YesOrNo.NO)
        return false

      return rule.options
    }
    catch (e) {
      throw new FailedException('获取会员积分规则选项', e.message)
    }
  }

  /**
   * 更新会员积分规则
   *
   * @param key 会员积分规则标识
   * @param data 更新数据
   * @throws {FailedException} 更新会员积分规则失败
   * @throws {NotFoundException} 会员积分规则不存在
   * @throws {ExistsException} 会员积分规则已存在
   */
  async update(key: IMemberPointsRuleKey, data: UpdateMemberPointsRulePayload) {
    try {
      const rule = await this.repo.findByKey(key)

      if (!rule)
        throw new NotFoundException('会员积分规则')

      const updated = await this.repo.update(rule, data)

      this.event.emit(
        new MemberPointsRuleUpdateEvent(
          updated.key,
          updated.name,
          updated.options,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新会员积分规则', e.message, e.code)
    }
  }
}
