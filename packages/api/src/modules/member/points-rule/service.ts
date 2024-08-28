import {
  type IMemberPointsRule,
  type IMemberPointsRuleKey,
  type IMemberPointsRuleOptions,
  type IYesOrNo,
  MEMBER_POINTS_RULE_KEYS,
} from '@xiaoshop/shared'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { SettingsService } from '@/settings/service'
import {
  MemberPointsRuleStatusUpdatedEvent,
  MemberPointsRuleUpdatedEvent,
} from '@/member/points-rule/events'
import {
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class MemberPointsRuleService {
  constructor(
    @Inject(SettingsService)
    private readonly settings: SettingsService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员积分规则列表
   *
   * @returns 会员积分规则列表
   * @throws {FailedException} 获取会员积分规则列表失败
   * @see {@link IMemberPointsRule}
   */
  async findList(): Promise<IMemberPointsRule[]> {
    try {
      const settings = await this.settings.findByKey('member.points.*')

      const list: IMemberPointsRule[] = []

      for (const { value } of MEMBER_POINTS_RULE_KEYS) {
        if (settings[`member.points.${value}`]) {
          list.push({
            key: value as IMemberPointsRuleKey,
            enable: settings[`member.points.${value}`] as IYesOrNo,
            rule: settings[`member.points.${value}.rule`],
          })
        }
      }

      return list
    }
    catch (e) {
      throw new FailedException('获取会员积分规则列表', e.message)
    }
  }

  /**
   * 获取会员积分规则
   *
   * @param key 积分规则标识
   * @returns 积分规则
   * @throws {NotFoundException} 会员积分规则不存在
   * @throws {FailedException} 获取会员积分规则失败
   * @see {@link IMemberPointsRule}
   */
  async findByKey(key: IMemberPointsRuleKey): Promise<IMemberPointsRule> {
    try {
      const settings = await this.findList()
      const rule = settings.find(item => item.key === key)

      if (!rule)
        throw new NotFoundException('会员积分规则不存在')

      return rule
    }
    catch (e) {
      throw new FailedException('获取会员积分规则', e.message)
    }
  }

  /**
   * 更新会员积分规则
   *
   * @param key 积分规则标识
   * @param options 积分规则选项
   * @throws {FailedException} 更新会员积分规则失败
   * @throws {NotFoundException} 会员积分规则不存在
   */
  async updateByKey(key: IMemberPointsRuleKey, options: IMemberPointsRuleOptions) {
    try {
      if (await this.findByKey(key)) {
        await this.settings.update([
          { key: `member.points.${key}.rule`, value: JSON.stringify(options) },
        ])

        this.event.emit(
          toEventName(MemberPointsRuleUpdatedEvent.name),
          new MemberPointsRuleUpdatedEvent(key, options),
        )
      }
    }
    catch (e) {
      throw new FailedException('更新会员积分规则', e.message, e.status)
    }
  }

  /**
   * 更新会员积分规则状态
   *
   * @param key 积分规则标识
   * @param enable 启用状态
   * @throws {FailedException} 更新会员积分规则状态失败
   * @throws {NotFoundException} 会员积分规则不存在
   */
  async updateStatus(key: IMemberPointsRuleKey, enable: IYesOrNo) {
    try {
      if (await this.findByKey(key)) {
        await this.settings.update([
          { key: `member.points.${key}`, value: enable },
        ])

        this.event.emit(
          toEventName(MemberPointsRuleStatusUpdatedEvent.name),
          new MemberPointsRuleStatusUpdatedEvent(key, enable),
        )
      }
    }
    catch (e) {
      throw new FailedException('更新会员积分规则状态', e.message, e.status)
    }
  }
}
