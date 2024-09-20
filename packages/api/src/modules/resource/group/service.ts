import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  type IResourceGroupDict,
  type IResourceGroupInfo,
  type IResourceGroupNestedList,
  ResourceType,
} from '@xiaoshop/shared'

import { RESOURCE_TYPES } from '~/common/dicts'
import { toDict, toEventName, toNestedList } from '~/utils/transformers'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { ResourceGroup } from './entity'
import { ResourceGroupPayload } from './dto'
import {
  ResourceGroupCreateEvent,
  ResourceGroupDeleteEvent,
  ResourceGroupUpdateEvent,
} from './events'

@Injectable()
export class ResourceGroupService {
  constructor(
    @InjectRepository(ResourceGroup)
    private readonly repository: Repository<ResourceGroup>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取素材分组列表
   *
   * @param type 素材分组类型
   * @returns 素材分组嵌套列表
   * @throws {FailedException} 获取素材分组列表失败
   */
  async findNestedList(type: ResourceType): Promise<IResourceGroupNestedList[]> {
    try {
      const list = await this.repository.find({
        select: ['id', 'parentId', 'name', 'isCompress', 'isThumbnail', 'isWatermark', 'updatedTime'],
        where: { type },
        order: {
          parentId: 'ASC',
          sort: 'ASC',
        },
      })

      return toNestedList<IResourceGroupNestedList>(list)
    }
    catch (e) {
      throw new FailedException('获取素材分组列表', e.message)
    }
  }

  /**
   * 获取素材分组根列表
   *
   * @param type 素材分组类型
   * @returns 素材分组根列表
   * @throws {FailedException} 获取素材分组列表失败
   */
  async findRootList(type: ResourceType): Promise<IResourceGroupDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        where: {
          type,
          parentId: 0,
        },
        order: { sort: 'ASC' },
      })
    }
    catch (e) {
      throw new FailedException('获取素材分组列表', e.message)
    }
  }

  /**
   * 获取素材分组信息
   *
   * @param id 素材分组 ID
   * @returns 素材分组信息
   * @throws {NotFoundException} 素材分组不存在
   * @throws {FailedException} 获取素材分组信息失败
   */
  async findById(id: number): Promise<IResourceGroupInfo> {
    try {
      const group = await this.repository.findOne({
        select: ['id', 'type', 'parentId', 'name', 'sort', 'isCompress', 'isWatermark', 'isThumbnail'],
        where: { id },
      })

      if (!group)
        throw new NotFoundException('素材分组')

      return {
        ...group,
        type: toDict(group.type, RESOURCE_TYPES),
      }
    }
    catch (e) {
      throw new FailedException('获取素材分组信息', e.message, e.status)
    }
  }

  /**
   * 创建素材分组
   *
   * @param data 素材分组
   * @throws {FailedException} 创建素材分组
   * @throws {ExistsException} 素材分组已存在
   */
  async create(data: ResourceGroupPayload) {
    try {
      const exists = await this.repository.existsBy({
        type: data.type || ResourceType.IMAGE,
        parentId: data.parentId || 0,
        name: data.name,
      })

      if (exists)
        throw new ExistsException('素材分组')

      const group = new ResourceGroup()

      group.type = data.type || ResourceType.IMAGE
      group.parentId = data.parentId || 0
      group.name = data.name.trim()
      group.sort = data.sort || 1
      group.isCompress = data.isCompress
      group.isWatermark = data.isWatermark
      group.isThumbnail = data.isThumbnail

      const created = await this.repository.save(group)

      this.event.emit(
        toEventName(ResourceGroupCreateEvent.name),
        new ResourceGroupCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建素材分组', e.message, e.status)
    }
  }

  /**
   * 更新素材分组
   *
   * @param id 素材分组 ID
   * @param data 素材分组
   * @throws {NotFoundException} 素材分组不存在
   * @throws {ExistsException} 素材分组已存在
   * @throws {FailedException} 更新素材分组
   */
  async update(id: number, data: ResourceGroupPayload) {
    try {
      const founded = await this.repository.findOne({
        select: ['id', 'type', 'parentId', 'name', 'sort', 'isCompress', 'isWatermark', 'isThumbnail'],
        where: { id },
      })

      if (!founded)
        throw new NotFoundException('素材分组')

      const exists = await this.repository.existsBy({
        id: Not(id),
        type: founded.type,
        parentId: data.parentId || founded.parentId,
        name: data.name,
      })

      if (exists)
        throw new ExistsException('素材分组')

      if (data.name)
        founded.name = data.name.trim()

      if (data.parentId !== undefined)
        founded.parentId = data.parentId

      if (data.sort)
        founded.sort = data.sort

      if (data.isCompress !== undefined)
        founded.isCompress = data.isCompress

      if (data.isWatermark !== undefined)
        founded.isWatermark = data.isWatermark

      if (data.isThumbnail !== undefined)
        founded.isThumbnail = data.isThumbnail

      const updated = await this.repository.save(founded)

      this.event.emit(
        toEventName(ResourceGroupUpdateEvent.name),
        new ResourceGroupUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新素材分组', e.message, e.status)
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
      const group = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (group) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(ResourceGroupDeleteEvent.name),
          new ResourceGroupDeleteEvent(group.id, group.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除素材分组', e.message)
    }
  }
}
