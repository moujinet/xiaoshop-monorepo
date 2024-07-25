import type { IMemberTag } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberTag } from '@/member/tag/entity'
import { MemberTagPayload } from '@/member/tag/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberTagService {
  constructor(
    @InjectRepository(MemberTag)
    private readonly repository: Repository<MemberTag>,
  ) {}

  /**
   * 获取会员标签列表
   *
   * @throws FailedException
   * @returns Promise<IMemberTag[]>
   * @see {@link IMemberTag}
   */
  async findList(): Promise<IMemberTag[]> {
    try {
      return await this.repository.find()
    }
    catch (e) {
      throw new FailedException('获取会员标签列表', e.message)
    }
  }

  /**
   * 获取会员标签详情
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
        throw new NotFoundException('会员标签')

      return detail
    }
    catch (e) {
      throw new FailedException('获取会员标签详情', e.message, e.status)
    }
  }

  /**
   * 创建会员标签
   *
   * @param data MemberTagPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link MemberTagPayload}
   */
  async create(data: MemberTagPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`会员标签 [${data.name}] `)

      const tag = new MemberTag()
      tag.name = data.name

      await this.repository.save(tag)
    }
    catch (e) {
      throw new FailedException('创建会员标签', e.message, e.status)
    }
  }

  /**
   * 更新会员标签
   *
   * @param id number
   * @param data MemberTagPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link MemberTagPayload}
   */
  async update(id: number, data: MemberTagPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`会员标签 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`会员标签 [${data.name}] `)

      const tag = new MemberTag()
      tag.id = id
      tag.name = data.name

      await this.repository.save(tag)
    }
    catch (e) {
      throw new FailedException('更新会员标签', e.message, e.status)
    }
  }

  /**
   * 删除会员标签
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除会员标签', e.message)
    }
  }
}
