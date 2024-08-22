import type {
  IApiPaginationData,
  IResource,
  IResourceListItem,
  IResourceType,
} from '@xiaoshop/shared'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Resource } from '@/resource/resource/entity'
import { ResourceGroup } from '@/resource/group/entity'
import {
  GetResourcePagesRequest,
  ResourceUploadFilePayload,
  ResourceUploadImageOptionsPayload,
  ResourceUploadVideoOptionsPayload,
} from '@/resource/resource/dto'
import {
  ResourceDeletedEvent,
  ResourceUploadedEvent,
} from '@/resource/resource/events'
import {
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly repository: Repository<Resource>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取素材列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IResourceListItem>>
   * @throws {FailedException} 获取素材列表失败
   */
  async findPages(
    query: GetResourcePagesRequest,
  ): Promise<IApiPaginationData<IResourceListItem>> {
    try {
      const entity = this.repository
        .createQueryBuilder('resource')
        .where('resource.type = :type', { type: query.type })

      if (query.groupId) {
        entity.andWhere((qb) => {
          const subQuery = qb.subQuery()
            .select('id')
            .from(ResourceGroup, 'group')
            .where('group.parentId = :groupId', { groupId: query.groupId })
            .getQuery()

          return `resource.groupId IN (${subQuery})`
        })
        entity.orWhere('resource.groupId = :groupId', { groupId: query.groupId })
      }

      if (query.name) {
        entity.andWhere('resource.name LIKE :name', {
          name: `%${query.name.trim()}%`,
        })
      }

      const page = query.page || 1
      const pagesize = query.pagesize || 10

      entity
        .orderBy('resource.createdTime', 'DESC')
        .skip((pagesize * page) - pagesize)
        .take(pagesize)

      const [result, total] = await entity.getManyAndCount()

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取素材列表', e.message)
    }
  }

  /**
   * 获取素材
   *
   * @param id 素材 ID
   * @returns Promise<IResource>
   * @throws {NotFoundException} 素材不存在
   * @throws {FailedException} 获取素材失败
   */
  async findById(id: number): Promise<IResource> {
    try {
      const resource = await this.repository.findOne({
        select: {
          group: {
            name: true,
            enableCompress: true,
            enableThumbnail: true,
            enableWatermark: true,
          },
        },
        where: { id },
        relations: ['group'],
      })

      if (!resource)
        throw new NotFoundException('素材')

      return resource
    }
    catch (e) {
      throw new FailedException('获取素材', e.message)
    }
  }

  /**
   * 创建上传素材信息
   *
   * @param type 素材类型
   * @param file 文件信息
   * @param options 素材选项
   * @throws {FailedException} 上传素材失败
   * @event ResourceUploadedEvent
   */
  async create(
    type: IResourceType,
    file: ResourceUploadFilePayload,
    options: ResourceUploadImageOptionsPayload | ResourceUploadVideoOptionsPayload,
  ) {
    try {
      const resource = new Resource()

      resource.type = type
      resource.groupId = options.groupId
      resource.name = file.name
      resource.path = file.path
      resource.mimeType = file.mimeType
      resource.size = file.size

      const created = await this.repository.save(resource)

      this.event.emit(
        toEventName(ResourceUploadedEvent.name),
        new ResourceUploadedEvent(
          created.id,
          type,
          file.name,
          file.path,
        ),
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
   * @event ResourceDeletedEvent
   */
  async delete(id: number) {
    try {
      const resource = await this.repository.findOneBy({ id })

      if (resource) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ResourceDeletedEvent.name),
          new ResourceDeletedEvent(
            resource.type,
            resource.name,
            resource.path,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除素材', e.message)
    }
  }
}
