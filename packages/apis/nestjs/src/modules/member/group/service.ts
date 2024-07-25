import type { IMemberTag } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberGroup } from '@/member/group/entity'
import { MemberGroupPayload } from '@/member/group/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberGroupService {
  constructor(
    @InjectRepository(MemberGroup)
    private readonly repository: Repository<MemberGroup>,
  ) {}

  /**
   * 获取会员群体列表
   *
   * @throws FailedException
   * @returns Promise<MemberGroup[]>
   * @see {@link MemberGroup}
   */
  async findList(): Promise<MemberGroup[]> {
    try {
      return await this.repository.find()
    }
    catch (e) {
      throw new FailedException('获取会员群体列表', e.message)
    }
  }

  /**
   * 获取会员群体详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IMemberTag>
   * @see {@link IMemberTag}
   */
  async findDetail(id: number): Promise<IMemberTag> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('会员群体')

      return detail
    }
    catch (e) {
      throw new FailedException('获取会员群体详情', e.message, e.status)
    }
  }

  /**
   * 创建会员群体
   *
   * @param data MemberGroupPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link MemberGroupPayload}
   */
  async create(data: MemberGroupPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`会员群体 [${data.name}] `)

      const group = new MemberGroup()

      group.name = data.name
      group.desc = data.desc
      group.conditions = data.conditions

      await this.repository.save(group)
    }
    catch (e) {
      throw new FailedException('创建会员群体', e.message, e.status)
    }
  }

  /**
   * 更新会员群体
   *
   * @param id number
   * @param data MemberGroupPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link MemberGroupPayload}
   */
  async update(id: number, data: MemberGroupPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`会员群体 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`会员群体 [${data.name}] `)

      const group = new MemberGroup()

      group.id = id
      group.name = data.name
      group.desc = data.desc
      group.conditions = data.conditions

      await this.repository.save(group)
    }
    catch (e) {
      throw new FailedException('更新会员群体', e.message, e.status)
    }
  }

  /**
   * 删除会员群体
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除会员群体', e.message)
    }
  }

  /**
   * 刷新会员群体统计数据
   */
  async refreshTotal() {}
}
