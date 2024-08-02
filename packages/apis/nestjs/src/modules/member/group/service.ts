import type {
  IApiPaginationData,
  IMemberGroup,
  IMemberGroupConditionListItem,
  IMemberGroupDict,
  IMemberGroupListItem,
} from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exception'
import {
  GetMemberGroupPagesRequest,
  MemberGroupPayload,
} from '@/member/group/dto'
import { MemberGroup } from '@/member/group/entity'

@Injectable()
export class MemberGroupService {
  constructor(
    @InjectRepository(MemberGroup)
    private readonly repository: Repository<MemberGroup>,
  ) {}

  /**
   * 获取会员分组分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberGroupListItem>>
   * @throws {FailedException} 获取会员分组分页列表失败
   */
  async findPages(
    query: GetMemberGroupPagesRequest,
  ): Promise<IApiPaginationData<IMemberGroupListItem>> {
    try {
      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          name: true,
          desc: true,
          total: true,
          refreshTime: true,
        },
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          total: 'DESC',
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员分组分页列表', e.message)
    }
  }

  /**
   * 获取会员分组条件列表
   *
   * @returns Promise<IMemberGroupConditionListItem[]>
   * @throws {FailedException} 获取会员分组条件列表失败
   */
  async findConditionList(): Promise<IMemberGroupConditionListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          name: true,
          conditions: true,
          total: true,
          refreshTime: true,
        },
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员分组条件列表', e.message)
    }
  }

  /**
   * 获取会员分组字典列表
   *
   * @returns Promise<IMemberGroupDict[]>
   * @throws {FailedException} 获取会员分组字典失败
   */
  async findDictList(): Promise<IMemberGroupDict[]> {
    try {
      return await this.repository.find({
        select: { id: true, name: true },
        order: { updatedTime: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取会员分组字典', e.message)
    }
  }

  /**
   * 获取会员分组详情
   *
   * @param id 分组 ID
   * @returns Promise<IMemberGroup>
   * @throws {NotFoundException} 未找到会员分组
   * @throws {FailedException} 获取会员分组详情失败
   */
  async findDetail(id: number): Promise<IMemberGroup> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员分组')

      return await this.repository.findOneBy({ id })
    }
    catch (e) {
      throw new FailedException('获取会员分组详情', e.message, e.status)
    }
  }

  /**
   * 创建会员分组
   *
   * @param data 会员分组
   * @throws {ExistsException} 会员分组已存在
   * @throws {FailedException} 创建会员分组失败
   */
  async create(data: MemberGroupPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException(`会员分组「${data.name}」已存在`)

      const group = new MemberGroup()

      group.name = data.name
      group.desc = data.desc || ''
      group.conditions = data.conditions || []

      await this.repository.save(group)
    }
    catch (e) {
      throw new FailedException('创建会员分组', e.message, e.status)
    }
  }

  /**
   * 更新会员分组
   *
   * @param id 分组 ID
   * @param data 会员分组
   * @throws {NotFoundException} 未找到会员分组
   * @throws {ExistsException} 会员分组已存在
   * @throws {FailedException} 更新会员分组失败
   */
  async update(id: number, data: MemberGroupPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员分组')

      const exists = await this.repository.existsBy({ id: Not(id), name: data.name })

      if (exists)
        throw new ExistsException(`会员分组「${data.name}」已存在`)

      const group = new MemberGroup()

      group.id = id
      group.name = data.name
      group.desc = data.desc || ''
      group.conditions = data.conditions || []

      await this.repository.save(group)
    }
    catch (e) {
      throw new FailedException('更新会员分组', e.message, e.status)
    }
  }

  /**
   * 删除会员分组
   *
   * @param id 分组 ID
   * @throws {FailedException} 删除会员分组失败
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (founded)
        await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除会员分组', e.message, e.status)
    }
  }
}
