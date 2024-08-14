import type {
  IMemberPointsRule,
  IMemberPointsRuleKey,
  IMemberPointsRuleListItem,
} from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberPointsRule } from '@/member/points-rule/entity'
import { UpdateMemberPointsRuleOptionsPayload, UpdateMemberPointsRuleStatusPayload } from '@/member/points-rule/dto'
import { FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class MemberPointsRuleService {
  constructor(
    @InjectRepository(MemberPointsRule)
    private readonly repository: Repository<MemberPointsRule>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取会员积分规则列表
   *
   * @returns Promise<IMemberPointsRuleListItem[]>
   * @throws {FailedException} 获取会员积分规则失败
   */
  async findList(): Promise<IMemberPointsRuleListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          key: true,
          enable: true,
          name: true,
          desc: true,
          icon: true,
        },
        order: {
          enable: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员积分规则列表', e.message)
    }
  }

  /**
   * 获取会员积分规则详情
   *
   * @param key 会员积分规则标识
   * @returns Promise<IMemberPointsRule>
   * @throws {NotFoundException} 未找到会员积分规则
   * @throws {FailedException} 获取会员积分规则详情失败
   */
  async findDetail(key: IMemberPointsRuleKey): Promise<IMemberPointsRule> {
    try {
      const rule = await this.repository.findOneBy({ key })

      if (!rule)
        throw new NotFoundException('未找到会员积分规则')

      return rule
    }
    catch (e) {
      throw new FailedException('获取会员积分规则详情', e.message, e.status)
    }
  }

  /**
   * 更新会员积分规则状态
   *
   * @param data 会员积分规则状态
   * @throws {NotFoundException} 未找到会员积分规则
   * @throws {FailedException} 更新会员积分规则状态失败
   */
  async updateStatus(data: UpdateMemberPointsRuleStatusPayload) {
    try {
      const founded = await this.repository.existsBy({ key: data.key })

      if (!founded)
        throw new NotFoundException('未找到会员积分规则')

      await this.repository.update(
        { key: data.key },
        { enable: data.enable },
      )

      await this.log.write('会员管理', `更新会员积分规则「${data.key}」状态为「${data.enable ? '启用' : '禁用'}」`)
    }
    catch (e) {
      throw new FailedException('更新会员积分规则', e.message, e.status)
    }
  }

  /**
   * 更新会员积分规则设置
   *
   * @param data 会员积分规则设置
   * @throws {NotFoundException} 未找到会员积分规则
   * @throws {FailedException} 更新会员积分规则失败
   */
  async updateOptions(data: UpdateMemberPointsRuleOptionsPayload) {
    try {
      const founded = await this.repository.existsBy({ key: data.key })

      if (!founded)
        throw new NotFoundException('未找到会员积分规则')

      await this.repository.update(
        { key: data.key },
        { options: data.options },
      )

      await this.log.write('会员管理', `更新会员积分规则「${data.key}」设置「${JSON.stringify(data.options)}」`)
    }
    catch (e) {
      throw new FailedException('更新会员积分规则', e.message, e.status)
    }
  }
}
