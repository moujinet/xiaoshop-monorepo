import type {
  IApiPaginationData,
  IResourceInfo,
  IResourceList,
  ResourceType,
} from '@xiaoshop/shared'

import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Like, Repository } from 'typeorm'

import { RESOURCE_TYPES } from '~/dicts'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { ResourceEntity } from '@/resource/resource/entity'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { objectToDict, pipeDict, toDict, toEventName } from '~/utils/transformers'

import { ResourceCreatePayload } from './dto/payload'
import { GetResourcePagesRequest } from './dto/request'
import { ResourceDeleteEvent, ResourceUploadEvent } from './events'

@Injectable()
export class ResourceAdminService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly repository: Repository<ResourceEntity>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取素材列表
   *
   * @param query 查询条件
   * @returns 素材列表
   * @throws {FailedException} 获取素材列表失败
   */
  async findPages(
    query: GetResourcePagesRequest,
  ): Promise<IApiPaginationData<IResourceList>> {
    try {
      const where: FindOptionsWhere<ResourceEntity> = {
        type: query.type,
      }

      if (query.groupId)
        where.groupId = query.groupId

      if (query.name)
        where.name = Like(`%${query.name}%`)

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repository.findAndCount({
        select: ['id', 'type', 'name', 'mimeType', 'path', 'size', 'createdTime'],
        where,
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          createdTime: 'DESC',
        },
      })

      return {
        list: pipeDict(list, [
          row => objectToDict(row, 'type', RESOURCE_TYPES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取素材列表', e.message)
    }
  }

  /**
   * 获取素材信息
   *
   * @param id 素材 ID
   * @returns 素材信息
   * @throws {FailedException} 获取素材信息失败
   * @throws {NotFoundException} 素材信息不存在
   */
  async findById(id: number): Promise<IResourceInfo> {
    try {
      const resource = await this.repository.findOne({
        select: {
          id: true,
          type: true,
          group: {
            id: true,
            name: true,
            enableCompress: true,
            enableWatermark: true,
            enableThumbnail: true,
          },
          name: true,
          mimeType: true,
          path: true,
          size: true,
        },
        where: { id },
        relations: ['group'],
      })

      if (!resource)
        throw new NotFoundException('素材信息')

      return {
        ...resource,
        type: toDict(resource.type, RESOURCE_TYPES),
      }
    }
    catch (e) {
      throw new FailedException('获取素材信息', e.message, e.status)
    }
  }

  /**
   * 上传素材
   *
   * @param type 素材类型
   * @param data 素材信息
   * @throws {FailedException} 上传素材失败
   */
  async create(type: ResourceType, data: ResourceCreatePayload) {
    try {
      const resource = new ResourceEntity()

      resource.type = type
      resource.groupId = data.groupId
      resource.name = data.name
      resource.mimeType = data.mimeType
      resource.path = data.path
      resource.size = data.size

      const created = await this.repository.save(resource)

      this.event.emit(
        toEventName(ResourceUploadEvent.name),
        new ResourceUploadEvent(created.id, created.type, created.path, created.name),
      )
    }
    catch (e) {
      throw new FailedException('上传素材', e.message)
    }
  }

  /**
   * 删除素材
   *
   * @param id 素材 ID
   * @throws {FailedException} 删除素材失败
   */
  async delete(id: number) {
    try {
      const resource = await this.repository.findOne({
        select: ['id', 'type', 'name', 'path'],
        where: { id },
      })

      if (resource) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ResourceDeleteEvent.name),
          new ResourceDeleteEvent(resource.id, resource.type, resource.path, resource.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除素材', e.message)
    }
  }
}
