import type { IAssetGroupRepository } from '@/asset/model/group/interface'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import {
  AssetType,
  type IAssetGroupDict,
  type IAssetGroupInfo,
  type IAssetGroupNestedList,
} from '@xiaoshop/shared'

import { AssetGroupRepo } from '@/asset/model/group/provider'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { toAssetGroupInfo, toAssetGroupNestedList } from '@/asset/model/group/mapper'
import { CreateAssetGroupPayload, UpdateAssetGroupPayload } from '@/asset/dto/payload'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { AssetGroupCreateEvent, AssetGroupDeleteEvent, AssetGroupUpdateEvent } from './events'

@Injectable()
export class AssetGroupService {
  constructor(
    @AssetGroupRepo()
    private readonly repo: IAssetGroupRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取素材分组嵌套列表
   *
   * @param type 素材分组类型
   * @returns 素材分组嵌套列表
   * @throws {FailedException} 获取素材分组嵌套列表失败
   */
  async findNestedList(type: AssetType): Promise<IAssetGroupNestedList[]> {
    try {
      const groups = await this.repo.find({
        type,
      })

      return toAssetGroupNestedList(groups)
    }
    catch (e) {
      throw new FailedException('获取素材分组嵌套列表', e.message)
    }
  }

  /**
   * 获取素材分组根列表
   *
   * @returns 素材分组根列表
   * @throws {FailedException} 获取素材分组根列表失败
   */
  async findRootList(type: AssetType): Promise<IAssetGroupDict[]> {
    try {
      return await this.repo.find({
        type,
        parentId: 0,
      }, ['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取素材分组根列表', e.message)
    }
  }

  /**
   * 获取素材分组详情
   *
   * @param id 素材分组 ID
   * @returns 获取素材分组详情失败
   */
  async findById(id: number): Promise<IAssetGroupInfo> {
    try {
      const group = await this.repo.findById(id)

      if (!group)
        throw new NotFoundException('素材分组')

      return toAssetGroupInfo(group)
    }
    catch (e) {
      throw new FailedException('获取素材分组详情', e.message, e.code)
    }
  }

  /**
   * 创建素材分组
   *
   * @param data 创建数据
   * @throws {FailedException} 创建素材分组失败
   * @throws {ExistsException} 素材分组已存在
   */
  async create(data: CreateAssetGroupPayload) {
    try {
      if (await this.repo.exists({
        type: data.type || AssetType.IMAGE,
        parentId: data.parentId || 0,
        name: data.name.trim(),
      })) {
        throw new ExistsException('素材分组')
      }

      const group = await this.repo.create(data)

      this.event.emit(
        new AssetGroupCreateEvent(group.id, group.name),
      )
    }
    catch (e) {
      throw new FailedException('创建素材分组', e.message, e.code)
    }
  }

  /**
   * 更新素材分组
   *
   * @param id 素材分组 ID
   * @param data 更新数据
   * @throws {FailedException} 更新素材分组失败
   * @throws {NotFoundException} 素材分组不存在
   * @throws {ExistsException} 素材分组已存在
   */
  async update(id: number, data: UpdateAssetGroupPayload) {
    try {
      const group = await this.repo.findById(id)

      if (!group)
        throw new NotFoundException('素材分组')

      if (await this.repo.exists({
        id: Not(id),
        type: group.type,
        parentId: data.parentId || group.parentId,
        name: data.name.trim(),
      })) {
        throw new ExistsException('素材分组')
      }

      const updated = await this.repo.update(group, data)

      this.event.emit(
        new AssetGroupUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('创建素材分组', e.message, e.code)
    }
  }

  /**
   * 删除素材分组
   *
   * @param id 素材分组 ID
   * @throws {FailedException} 删除素材分组失败
   */
  async delete(id: number) {
    try {
      const group = await this.repo.findById(id, ['id', 'name'])

      if (group) {
        await this.repo.destroy(group.id)

        this.event.emit(
          new AssetGroupDeleteEvent(group.id, group.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除素材分组', e.message)
    }
  }
}
