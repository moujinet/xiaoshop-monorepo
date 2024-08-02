import type {
  IMemberPointsRule,
  IMemberPointsRuleListItem,
} from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberPointsRule } from '@/member/points/entity'
import { MemberPointsRulePayload } from '@/member/points/dto'
import { FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberPointsRuleService {
  constructor(
    @InjectRepository(MemberPointsRule)
    private readonly repository: Repository<MemberPointsRule>,
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
   * @param id 会员积分规则 ID
   * @returns Promise<IMemberPointsRule>
   * @throws {NotFoundException} 未找到会员积分规则
   * @throws {FailedException} 获取会员积分规则详情失败
   */
  async findDetail(id: number): Promise<IMemberPointsRule> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员积分规则')

      return await this.repository.findOneBy({ id })
    }
    catch (e) {
      throw new FailedException('获取会员积分规则详情', e.message, e.status)
    }
  }

  /**
   * 更新会员积分规则
   *
   * @param data 会员积分规则
   * @throws {NotFoundException} 未找到会员积分规则
   * @throws {FailedException} 更新会员积分规则失败
   */
  async update(data: MemberPointsRulePayload) {
    try {
      const rule = await this.repository.findOneBy({ key: data.key })

      if (!rule)
        throw new NotFoundException('未找到会员积分规则')

      rule.enable = data.enable

      if (data.desc)
        rule.desc = data.desc

      if (data.options)
        rule.options = data.options

      await this.repository.update({ key: data.key }, rule)
    }
    catch (e) {
      throw new FailedException('更新会员积分规则', e.message, e.status)
    }
  }
}
