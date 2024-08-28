import type {
  IApiPaginationData,
  IMemberGroup,
  IMemberGroupConditionListItem,
  IMemberGroupDict,
  IMemberGroupListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import {
  GetMemberGroupPagesRequest,
  MemberGroupPayload,
} from '@/member/group/dto'
import {
  MemberGroupCreatedEvent,
  MemberGroupDeletedEvent,
  MemberGroupRefreshTotalEvent,
  MemberGroupUpdatedEvent,
} from '@/member/group/events'
import { MemberGroup } from '@/member/group/entity'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class MemberGroupService {
  constructor(
    @InjectRepository(MemberGroup)
    private readonly repository: Repository<MemberGroup>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员群体分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberGroupListItem>>
   * @throws {FailedException} 获取会员群体分页列表失败
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
          updatedTime: true,
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
      throw new FailedException('获取会员群体分页列表', e.message)
    }
  }

  /**
   * 获取会员群体条件列表
   *
   * @returns Promise<IMemberGroupConditionListItem[]>
   * @throws {FailedException} 获取会员群体条件列表失败
   */
  async findConditionList(): Promise<IMemberGroupConditionListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          name: true,
          conditions: true,
          total: true,
        },
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员群体条件列表', e.message)
    }
  }

  /**
   * 获取会员群体字典列表
   *
   * @returns Promise<IMemberGroupDict[]>
   * @throws {FailedException} 获取会员群体字典失败
   */
  async findDictList(): Promise<IMemberGroupDict[]> {
    try {
      return await this.repository.find({
        select: { id: true, name: true },
        order: { updatedTime: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取会员群体字典', e.message)
    }
  }

  /**
   * 获取会员群体详情
   *
   * @param id 分组 ID
   * @returns Promise<IMemberGroup>
   * @throws {NotFoundException} 未找到会员群体
   * @throws {FailedException} 获取会员群体详情失败
   */
  async findById(id: number): Promise<IMemberGroup> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员群体')

      return await this.repository.findOneBy({ id })
    }
    catch (e) {
      throw new FailedException('获取会员群体详情', e.message, e.status)
    }
  }

  /**
   * 创建会员群体
   *
   * @param data 会员群体
   * @throws {ExistsException} 会员群体已存在
   * @throws {FailedException} 创建会员群体失败
   * @event MemberGroupCreatedEvent
   */
  async create(data: MemberGroupPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException(`会员群体「${data.name}」已存在`)

      const group = new MemberGroup()

      group.name = data.name
      group.desc = data.desc || ''
      group.conditions = data.conditions || []

      const created = await this.repository.save(group)

      this.event.emit(
        toEventName(MemberGroupCreatedEvent.name),
        new MemberGroupCreatedEvent(created.id, created.name, created.conditions),
      )
    }
    catch (e) {
      throw new FailedException('创建会员群体', e.message, e.status)
    }
  }

  /**
   * 更新会员群体
   *
   * @param id 分组 ID
   * @param data 会员群体
   * @throws {NotFoundException} 未找到会员群体
   * @throws {ExistsException} 会员群体已存在
   * @throws {FailedException} 更新会员群体失败
   * @event MemberGroupUpdatedEvent
   */
  async update(id: number, data: MemberGroupPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员群体')

      const exists = await this.repository.existsBy({ id: Not(id), name: data.name })

      if (exists)
        throw new ExistsException(`会员群体「${data.name}」已存在`)

      const group = new MemberGroup()

      group.id = id
      group.name = data.name
      group.desc = data.desc || ''
      group.conditions = data.conditions || []

      await this.repository.save(group)

      this.event.emit(
        toEventName(MemberGroupUpdatedEvent.name),
        new MemberGroupUpdatedEvent(id, group.name, group.conditions),
      )
    }
    catch (e) {
      throw new FailedException('更新会员群体', e.message, e.status)
    }
  }

  /**
   * 更新会员群体人数
   *
   * @param id 会员群体 ID
   * @param total 会员数量
   * @throws {FailedException} 更新会员群体失败
   * @throws {NotFoundException} 未找到会员群体
   * @event MemberGroupRefreshTotalEvent
   */
  async updateTotal(id: number, total: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员群体')

      await this.repository.update({ id }, { total, refreshTime: (new Date()).toISOString() })

      this.event.emit(
        toEventName(MemberGroupRefreshTotalEvent.name),
        new MemberGroupRefreshTotalEvent(id, founded.name, founded.conditions, total),
      )
    }
    catch (e) {
      throw new FailedException('更新会员群体', e.message, e.status)
    }
  }

  /**
   * 删除会员群体
   *
   * @param id 分组 ID
   * @throws {FailedException} 删除会员群体失败
   * @event MemberGroupDeletedEvent
   */
  async delete(id: number) {
    try {
      const group = await this.repository.findOneBy({ id })

      if (group) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(MemberGroupDeletedEvent.name),
          new MemberGroupDeletedEvent(id, group.name, group.conditions),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除会员群体', e.message, e.status)
    }
  }
}
