import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  ColorName,
  type IApiPaginationData,
  type IMemberTagDict,
  type IMemberTagInfo,
  type IMemberTagList,
} from '@xiaoshop/shared'

import { toEventName } from '~/utils/transformers'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { MemberTag } from './entity'
import { GetMemberTagPagesRequest, MemberTagPayload } from './dto'
import {
  MemberTagCreateEvent,
  MemberTagDeleteEvent,
  MemberTagUpdateEvent,
} from './events'

@Injectable()
export class MemberTagService {
  constructor(
    @InjectRepository(MemberTag)
    private readonly repository: Repository<MemberTag>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员标签列表
   *
   * @param query 查询条件
   * @returns 会员标签列表
   * @throws {FailedException} 获取会员标签列表失败
   */
  async findPages(
    query: GetMemberTagPagesRequest,
  ): Promise<IApiPaginationData<IMemberTagList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'color', 'updatedTime'],
        order: { updatedTime: 'DESC' },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员标签列表', e.message)
    }
  }

  /**
   * 获取会员标签字典列表
   *
   * @returns 会员标签字典列表
   * @throws {FailedException} 获取会员标签字典列表失败
   */
  async findDictList(): Promise<IMemberTagDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: { updatedTime: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取会员标签字典列表', e.message)
    }
  }

  /**
   * 获取会员标签信息
   *
   * @param id 会员标签 ID
   * @returns 会员标签信息
   * @throws {NotFoundException} 会员标签不存在
   * @throws {FailedException} 获取会员标签信息失败
   */
  async findById(id: number): Promise<IMemberTagInfo> {
    try {
      const tag = await this.repository.findOne({
        select: ['id', 'name', 'color'],
        where: { id },
      })

      if (!tag)
        throw new NotFoundException('会员标签')

      return tag
    }
    catch (e) {
      throw new FailedException('获取会员标签信息', e.message, e.status)
    }
  }

  /**
   * 创建会员标签
   *
   * @param data 会员标签信息
   * @throws {FailedException} 创建会员标签失败
   * @throws {ExistsException} 会员标签已存在
   */
  async create(data: MemberTagPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name.trim() })

      if (exists)
        throw new ExistsException('会员标签')

      const tag = new MemberTag()

      tag.name = data.name.trim()
      tag.color = data.color || ColorName.GRAY

      const created = await this.repository.save(tag)

      this.event.emit(
        toEventName(MemberTagCreateEvent.name),
        new MemberTagCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建会员标签', e.message, e.status)
    }
  }

  /**
   * 更新会员标签
   *
   * @param id 会员标签 ID
   * @param data 会员标签信息
   * @throws {FailedException} 更新会员标签失败
   * @throws {ExistsException} 会员标签已存在
   * @throws {NotFoundException} 会员标签不存在
   */
  async update(id: number, data: MemberTagPayload) {
    try {
      const tag = await this.repository.findOne({
        select: ['id', 'name', 'color'],
        where: { id },
      })

      if (!tag)
        throw new NotFoundException('会员标签')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('会员标签')

      tag.name = data.name.trim()
      tag.color = data.color || ColorName.GRAY

      const updated = await this.repository.save(tag)

      this.event.emit(
        toEventName(MemberTagUpdateEvent.name),
        new MemberTagUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新会员标签', e.message, e.status)
    }
  }

  /**
   * 删除会员标签
   *
   * @param id 会员标签 ID
   * @throws {FailedException} 删除会员标签失败
   */
  async delete(id: number) {
    try {
      const tag = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (tag) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(MemberTagDeleteEvent.name),
          new MemberTagDeleteEvent(tag.id, tag.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除会员标签', e.message)
    }
  }
}
