import type {
  IApiPaginationData,
  IMemberGroupDict,
  IMemberGroupFilterList,
  IMemberGroupInfo,
  IMemberGroupList,
} from '@xiaoshop/shared'

import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { objectToDict, pipeDict, toEventName } from '~/utils/transformers'
import { MEMBER_GROUP_FILTER_KEYS, MEMBER_GROUP_FILTER_OPERATORS } from '~/common/dicts'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { MemberGroup } from './entity'
import { GetMemberGroupPagesRequest, MemberGroupPayload } from './dto'
import { MemberGroupCreateEvent, MemberGroupDeleteEvent, MemberGroupUpdateEvent } from './events'

@Injectable()
export class MemberGroupService {
  constructor(
    @InjectRepository(MemberGroup)
    private readonly repository: Repository<MemberGroup>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员群体列表
   *
   * @param query 查询条件
   * @returns 会员群体列表
   * @throws {FailedException} 获取会员群体列表失败
   */
  async findPages(
    query: GetMemberGroupPagesRequest,
  ): Promise<IApiPaginationData<IMemberGroupList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'desc', 'total', 'updatedTime'],
        order: {
          total: 'DESC',
          updatedTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员群体列表', e.message)
    }
  }

  /**
   * 获取会员群体字典列表
   *
   * @returns 会员群体字典列表
   * @throws {FailedException} 获取会员群体字典列表失败
   */
  async findDictList(): Promise<IMemberGroupDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          total: 'DESC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员群体字典列表', e.message)
    }
  }

  /**
   * 获取会员群体筛选条件列表
   *
   * @returns 会员群体筛选条件列表
   */
  async findFilterList(): Promise<IMemberGroupFilterList[]> {
    try {
      const groups = await this.repository.find({
        select: ['id', 'name', 'filters', 'total'],
        order: {
          total: 'DESC',
          updatedTime: 'DESC',
        },
      })

      return groups.map(group => ({
        ...group,
        filters: pipeDict(group.filters, [
          row => objectToDict(row, 'key', MEMBER_GROUP_FILTER_KEYS),
          row => objectToDict(row, 'operator', MEMBER_GROUP_FILTER_OPERATORS),
        ]),
      }))
    }
    catch (e) {
      throw new FailedException('获取会员群体筛选条件列表', e.message)
    }
  }

  /**
   * 获取会员群体信息
   *
   * @param id 会员群体 ID
   * @returns 会员群体信息
   * @throws {FailedException} 获取会员群体信息失败
   * @throws {NotFoundException} 会员群体信息不存在
   */
  async findById(id: number): Promise<IMemberGroupInfo> {
    try {
      const group = await this.repository.findOne({
        select: ['id', 'name', 'desc', 'filters'],
        where: { id },
      })

      if (!group)
        throw new NotFoundException('会员群体信息')

      return {
        ...group,
        filters: pipeDict(group.filters, [
          row => objectToDict(row, 'key', MEMBER_GROUP_FILTER_KEYS),
          row => objectToDict(row, 'operator', MEMBER_GROUP_FILTER_OPERATORS),
        ]),
      }
    }
    catch (e) {
      throw new FailedException('获取会员群体信息', e.message, e.status)
    }
  }

  /**
   * 创建会员群体
   *
   * @param data 会员群体信息
   * @throws {FailedException} 创建会员群体失败
   * @throws {ExistsException} 会员群体已存在
   */
  async create(data: MemberGroupPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name.trim() })

      if (exists)
        throw new ExistsException('会员群体')

      const group = new MemberGroup()

      group.name = data.name.trim()
      group.desc = data.desc || ''
      group.filters = data.filters || []
      group.total = 0

      const created = await this.repository.save(group)

      this.event.emit(
        toEventName(MemberGroupCreateEvent.name),
        new MemberGroupCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建会员群体', e.message, e.status)
    }
  }

  /**
   * 更新会员群体
   *
   * @param id 会员群体 ID
   * @param data 会员群体信息
   * @throws {FailedException} 更新会员群体失败
   * @throws {NotFoundException} 会员群体不存在
   * @throws {ExistsException} 会员群体已存在
   */
  async update(id: number, data: MemberGroupPayload) {
    try {
      const group = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (!group)
        throw new NotFoundException('会员群体')

      const exists = await this.repository.existsBy({
        id: Not(group.id),
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('会员群体')

      group.name = data.name.trim()
      group.desc = data.desc || ''
      group.filters = data.filters || []

      const updated = await this.repository.save(group)

      this.event.emit(
        toEventName(MemberGroupUpdateEvent.name),
        new MemberGroupUpdateEvent(updated.id, updated.name),
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
   * @param total 人数
   * @throws {FailedException} 更新会员群体人数失败
   * @throws {NotFoundException} 会员群体不存在
   */
  async updateTotal(id: number, total: number) {
    try {
      const group = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (!group)
        throw new NotFoundException('会员群体')

      group.total = total

      await this.repository.save(group)
    }
    catch (e) {
      throw new FailedException('更新会员群体人数', e.message, e.status)
    }
  }

  /**
   * 删除会员群体
   *
   * @param id 会员群体 ID
   * @throws {FailedException} 删除会员群体失败
   */
  async delete(id: number) {
    try {
      const group = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (group) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(MemberGroupDeleteEvent.name),
          new MemberGroupDeleteEvent(group.id, group.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除会员群体', e.message)
    }
  }
}
