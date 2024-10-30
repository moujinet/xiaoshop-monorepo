import type { IMemberGroupRepository } from '@/member/group/model/interface'
import type { IApiPaginationData, IMemberGroupDict, IMemberGroupInfo, IMemberGroupList } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { MemberGroupRepo } from '@/member/group/model/provider'
import { GetMemberGroupPagesRequest } from '@/member/group/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateMemberGroupPayload, UpdateMemberGroupPayload } from '@/member/group/dto/payload'

import { toMemberGroupInfo } from '../../model/mapper'
import { MemberGroupCreateEvent, MemberGroupDeleteEvent, MemberGroupUpdateEvent } from './events'

@Injectable()
export class MemberGroupService {
  constructor(
    @MemberGroupRepo()
    private readonly repo: IMemberGroupRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取会员群体分页列表
   *
   * @param query 查询条件
   * @returns 会员群体分页列表
   * @throws {FailedException} 获取会员群体分页列表失败
   */
  async findPages(
    query: GetMemberGroupPagesRequest,
  ): Promise<IApiPaginationData<IMemberGroupList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取会员群体分页列表', e.message)
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
      return await this.repo.find(['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取会员群体字典列表', e.message)
    }
  }

  /**
   * 获取会员群体详情
   *
   * @param id 会员群体 ID
   * @returns 获取会员群体详情失败
   */
  async findById(id: number): Promise<IMemberGroupInfo> {
    try {
      const group = await this.repo.findById(id)

      if (!group)
        throw new NotFoundException('会员群体')

      return toMemberGroupInfo(group)
    }
    catch (e) {
      throw new FailedException('获取会员群体详情', e.message, e.code)
    }
  }

  /**
   * 创建会员群体
   *
   * @param data 创建数据
   * @throws {FailedException} 创建会员群体失败
   * @throws {ExistsException} 会员群体已存在
   */
  async create(data: CreateMemberGroupPayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('会员群体')

      const group = await this.repo.create(data)

      this.event.emit(
        new MemberGroupCreateEvent(group.id, group.name),
      )
    }
    catch (e) {
      throw new FailedException('创建会员群体', e.message, e.code)
    }
  }

  /**
   * 更新会员群体
   *
   * @param id 会员群体 ID
   * @param data 更新数据
   * @throws {FailedException} 更新会员群体失败
   * @throws {NotFoundException} 会员群体不存在
   * @throws {ExistsException} 会员群体已存在
   */
  async update(id: number, data: UpdateMemberGroupPayload) {
    try {
      const group = await this.repo.findById(id)

      if (!group)
        throw new NotFoundException('会员群体')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
      })) {
        throw new ExistsException('会员群体')
      }

      const updated = await this.repo.update(group, data)

      this.event.emit(
        new MemberGroupUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新会员群体', e.message, e.code)
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
      const group = await this.repo.findById(id, ['id', 'name'])

      if (group) {
        await this.repo.destroy(group.id)

        this.event.emit(
          new MemberGroupDeleteEvent(group.id, group.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除会员群体', e.message)
    }
  }
}
