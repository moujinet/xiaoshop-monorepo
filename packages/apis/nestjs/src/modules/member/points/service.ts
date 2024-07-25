import type { IEnabled, IMemberPointsRule } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberPointsRule } from '@/member/points/entity'
import { MemberPointsRulePayload } from '@/member/points/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberPointsRuleService {
  constructor(
    @InjectRepository(MemberPointsRule)
    private readonly repository: Repository<MemberPointsRule>,
  ) {}

  /**
   * 获取积分规则列表
   *
   * @throws FailedException
   * @returns Promise<IMemberPointsRule[]>
   * @see {@link IMemberPointsRule}
   */
  async findList(): Promise<IMemberPointsRule[]> {
    try {
      return await this.repository.find()
    }
    catch (e) {
      throw new FailedException('获取积分规则列表', e.message)
    }
  }

  /**
   * 获取积分规则详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IMemberPointsRule>
   * @see {@link IMemberPointsRule}
   */
  async findDetail(id: number): Promise<IMemberPointsRule> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('积分规则')

      return detail
    }
    catch (e) {
      throw new FailedException('获取积分规则详情', e.message, e.status)
    }
  }

  /**
   * 创建积分规则
   *
   * @param data MemberPointsRulePayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link MemberPointsRulePayload}
   */
  async create(data: MemberPointsRulePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`积分规则 [${data.name}] `)

      const rule = new MemberPointsRule()

      rule.status = data.status
      rule.key = data.key
      rule.name = data.name
      rule.desc = data.desc
      rule.icon = data.icon
      rule.options = data.options

      await this.repository.save(rule)
    }
    catch (e) {
      throw new FailedException('创建积分规则', e.message, e.status)
    }
  }

  /**
   * 更新积分规则
   *
   * @param id number
   * @param data MemberPointsRulePayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link MemberPointsRulePayload}
   */
  async update(id: number, data: MemberPointsRulePayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`积分规则 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`积分规则 [${data.name}] `)

      const rule = new MemberPointsRule()

      rule.id = id
      rule.status = data.status
      rule.key = data.key
      rule.name = data.name
      rule.desc = data.desc
      rule.icon = data.icon
      rule.options = data.options

      await this.repository.save(rule)
    }
    catch (e) {
      throw new FailedException('更新积分规则', e.message, e.status)
    }
  }

  /**
   * 更新积分规则状态
   *
   * @param {number} id
   * @param {IEnabled} status
   */
  async updateStatus(id: number, status: IEnabled) {
    try {
      await this.repository.update({ id }, { status })
    }
    catch (e) {
      throw new FailedException('更新积分规则状态', e.message)
    }
  }

  /**
   * 删除积分规则
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除积分规则', e.message)
    }
  }
}
