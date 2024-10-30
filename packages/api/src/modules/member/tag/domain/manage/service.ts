import type { IMemberTagRepository } from '@/member/tag/model/interface'
import type { IApiPaginationData, IMemberTagDict, IMemberTagInfo, IMemberTagList } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { MemberTagRepo } from '@/member/tag/model/provider'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { GetMemberTagPagesRequest } from '@/member/tag/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateMemberTagPayload, UpdateMemberTagPayload } from '@/member/tag/dto/payload'

import { MemberTagCreateEvent, MemberTagDeleteEvent, MemberTagUpdateEvent } from './events'

@Injectable()
export class MemberTagService {
  constructor(
    @MemberTagRepo()
    private readonly repo: IMemberTagRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取会员标签分页列表
   *
   * @param query 查询条件
   * @returns 会员标签分页列表
   * @throws {FailedException} 获取会员标签分页列表失败
   */
  async findPages(
    query: GetMemberTagPagesRequest,
  ): Promise<IApiPaginationData<IMemberTagList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取会员标签分页列表', e.message)
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
      return await this.repo.find(['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取会员标签字典列表', e.message)
    }
  }

  /**
   * 获取会员标签详情
   *
   * @param id 会员标签 ID
   * @returns 获取会员标签详情失败
   */
  async findById(id: number): Promise<IMemberTagInfo> {
    try {
      const manage = await this.repo.findById(id)

      if (!manage)
        throw new NotFoundException('会员标签')

      return manage
    }
    catch (e) {
      throw new FailedException('获取会员标签详情', e.message, e.code)
    }
  }

  /**
   * 创建会员标签
   *
   * @param data 创建数据
   * @throws {FailedException} 创建会员标签失败
   * @throws {ExistsException} 会员标签已存在
   */
  async create(data: CreateMemberTagPayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('会员标签')

      const tag = await this.repo.create(data)

      this.event.emit(
        new MemberTagCreateEvent(tag.id, tag.name),
      )
    }
    catch (e) {
      throw new FailedException('创建会员标签', e.message, e.code)
    }
  }

  /**
   * 更新会员标签
   *
   * @param id 会员标签 ID
   * @param data 更新数据
   * @throws {FailedException} 更新会员标签失败
   * @throws {NotFoundException} 会员标签不存在
   * @throws {ExistsException} 会员标签已存在
   */
  async update(id: number, data: UpdateMemberTagPayload) {
    try {
      const tag = await this.repo.findById(id)

      if (!tag)
        throw new NotFoundException('会员标签')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
      })) {
        throw new ExistsException('会员标签')
      }

      const updated = await this.repo.update(tag, data)

      this.event.emit(
        new MemberTagUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('创建会员标签', e.message, e.code)
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
      const tag = await this.repo.findById(id, ['id', 'name'])

      if (tag) {
        await this.repo.destroy(tag.id)

        this.event.emit(
          new MemberTagDeleteEvent(tag.id, tag.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除会员标签', e.message)
    }
  }
}
