import type {
  IResourceGroup,
  IResourceGroupDict,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ResourceGroup } from '@/resource/group/entity'
import {
  GetResourceGroupListRequest,
  ResourceGroupPayload,
} from '@/resource/group/dto'
import {
  ResourceGroupCreatedEvent,
  ResourceGroupDeletedEvent,
  ResourceGroupUpdatedEvent,
} from '@/resource/group/events'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

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
   * @param query 查询条件
   * @throws {FailedException} 获取素材分组列表失败
   * @returns Promise<IResourceGroup[]>
   * @see {@link IResourceGroup}
   */
  async findList(query: GetResourceGroupListRequest): Promise<IResourceGroup[]> {
    try {
      return await this.repository.find({
        where: {
          type: query.type,
        },
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取素材分组列表', e.message)
    }
  }

  /**
   * 获取素材分组根列表
   *
   * @param query 查询条件
   * @throws {FailedException} 获取素材分组根列表失败
   * @returns Promise<IResourceGroupDict[]>
   * @see {@link IResourceGroupDict}
   */
  async findRootList(query: GetResourceGroupListRequest): Promise<IResourceGroupDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        where: {
          type: query.type,
          parentId: 0,
        },
        order: {
          updatedTime: 'ASC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取素材分组根列表', e.message)
    }
  }

  /**
   * 获取素材分组详情
   *
   * @param id 分组 ID
   * @throws {FailedException} 获取素材分组详情失败
   * @throws {NotFoundException} 素材分组不存在
   * @returns Promise<IResourceGroup>
   * @see {@link IResourceGroup}
   */
  async findById(id: number): Promise<IResourceGroup> {
    try {
      const detail = await this.repository.findOneBy({ id })

      if (!detail)
        throw new NotFoundException('素材分组')

      return detail
    }
    catch (e) {
      throw new FailedException('获取素材分组详情', e.message, e.status)
    }
  }

  /**
   * 创建素材分组
   *
   * @param data 分组信息
   * @throws {FailedException} 创建素材分组失败
   * @throws {ExistsException} 素材分组已存在
   * @see {@link ResourceGroupPayload}
   */
  async create(data: ResourceGroupPayload) {
    try {
      const exists = await this.repository.existsBy({
        type: data.type,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`素材分组 [${data.name}] `)

      const created = await this.repository.save(data)

      this.event.emit(
        toEventName(ResourceGroupCreatedEvent.name),
        new ResourceGroupCreatedEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建素材分组', e.message, e.status)
    }
  }

  /**
   * 更新素材分组
   *
   * @param id 分组 ID
   * @param data 分组信息
   * @throws {FailedException} 创建素材分组失败
   * @throws {NotFoundException} 素材分组不存在
   * @throws {ExistsException} 素材分组已存在
   * @see {@link ResourceGroupPayload}
   */
  async update(id: number, data: ResourceGroupPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`素材分组 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        type: data.type,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`素材分组 [${data.name}] `)

      await this.repository.update({ id }, data)

      this.event.emit(
        toEventName(ResourceGroupUpdatedEvent.name),
        new ResourceGroupUpdatedEvent(id, data.name),
      )
    }
    catch (e) {
      throw new FailedException('更新素材分组', e.message, e.status)
    }
  }

  /**
   * 删除素材分组
   *
   * @param id 分组 ID
   * @throws {FailedException} 删除素材分组失败
   */
  async delete(id: number) {
    try {
      const group = await this.repository.findOneBy({ id })

      if (group) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(ResourceGroupDeletedEvent.name),
          new ResourceGroupDeletedEvent(id, group.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除素材分组', e.message)
    }
  }
}
