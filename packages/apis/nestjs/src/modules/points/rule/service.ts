import type {
  IEnabled,
  IPointsRule,
  IPointsRuleKey,
  IPointsRuleListItem,
  IPointsRuleOptions,
} from '@xiaoshop/schema'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Repository } from 'typeorm'
import { PointsRule } from '@/points/rule/entity'
import {
  PointsRuleOptionsUpdateEvent,
  PointsRuleStatusUpdateEvent,
} from '@/points/rule/events'
import {
  FailedException,
  NotFoundException,
} from '~/common/exception'

@Injectable()
export class PointsRuleService {
  constructor(
    @InjectRepository(PointsRule)
    private readonly repository: Repository<PointsRule>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 获取积分规则列表
   *
   * @param enabled 是否启用
   * @returns Promise<IPointsRuleListItem[]>
   * @throws {FailedException} 获取积分规则列表失败
   */
  async findList(enabled?: IEnabled): Promise<IPointsRuleListItem[]> {
    try {
      const where: FindOptionsWhere<PointsRule> = {}

      if (enabled)
        where.enable = enabled

      return await this.repository.find({
        select: ['id', 'key', 'enable', 'icon', 'name', 'desc'],
        where,
        order: {
          enable: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取积分规则列表', e.message)
    }
  }

  /**
   * 获取积分规则详情
   *
   * @param key 积分规则标识
   * @returns Promise<IPointsRule>
   * @throws {NotFoundException} 未找到积分规则
   * @throws {FailedException} 获取积分规则详情失败
   */
  async findByKey(key: IPointsRuleKey): Promise<IPointsRule> {
    try {
      const rule = await this.repository.findOneBy({ key })

      if (!rule)
        throw new NotFoundException('未找到积分规则')

      return rule
    }
    catch (e) {
      throw new FailedException('获取积分规则详情', e.message, e.status)
    }
  }

  /**
   * 更新积分规则状态
   *
   * @param key 积分规则标识
   * @param enable 积分规则启用状态
   * @throws {NotFoundException} 未找到积分规则
   * @throws {FailedException} 更新积分规则状态失败
   * @event PointsRuleStatusUpdateEvent 积分规则启用状态更新
   */
  async updateStatus(key: IPointsRuleKey, enable: IEnabled) {
    try {
      if (!await this.isExistsKey(key))
        throw new NotFoundException('未找到积分规则')

      await this.repository.update({ key }, { enable })

      this.eventEmitter.emit(
        PointsRuleStatusUpdateEvent.name,
        new PointsRuleStatusUpdateEvent(key, enable),
      )
    }
    catch (e) {
      throw new FailedException('更新积分规则状态', e.message, e.status)
    }
  }

  /**
   * 更新积分规则选项
   *
   * @param key 积分规则标识
   * @param options 积分规则选项
   * @throws {NotFoundException} 未找到积分规则
   * @throws {FailedException} 更新积分规则选项失败
   * @event PointsRuleOptionsUpdateEvent 积分规则选项更新
   */
  async updateOptions(key: IPointsRuleKey, options: IPointsRuleOptions) {
    try {
      if (!await this.isExistsKey(key))
        throw new NotFoundException('未找到积分规则')

      await this.repository.update({ key }, { options })

      this.eventEmitter.emit(
        PointsRuleOptionsUpdateEvent.name,
        new PointsRuleOptionsUpdateEvent(key, options),
      )
    }
    catch (e) {
      throw new FailedException('更新积分规则选项', e.message, e.status)
    }
  }

  /**
   * 检查积分规则是否存在
   *
   * @param key 积分规则标识
   * @returns Promise<boolean>
   */
  async isExistsKey(key: IPointsRuleKey): Promise<boolean> {
    return await this.repository.existsBy({ key })
  }
}
