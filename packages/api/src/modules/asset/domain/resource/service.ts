import type { IAssetResourceRepository, IAssetResourceWhere } from '@/asset/model/resource/interface'
import type {
  IApiPaginationData,
  IAssetResourceInfo,
  IAssetResourceList,
} from '@xiaoshop/shared'

import { Like } from 'typeorm'
import { join } from 'node:path'
import { ConfigService } from '@nestjs/config'
import { existsSync, unlinkSync } from 'node:fs'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { AssetResourcePayload } from '@/asset/dto/payload'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { GetAssetResourcePagesRequest } from '@/asset/dto/request'
import { AssetResourceRepo } from '@/asset/model/resource/provider'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { toAssetResourceInfo, toAssetResourceList } from '@/asset/model/resource/mapper'

import { AssetResourceDeleteEvent, AssetResourceUploadEvent } from './events'

@Injectable()
export class AssetResourceService {
  constructor(
    @AssetResourceRepo()
    private readonly repo: IAssetResourceRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,

    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  /**
   * 获取素材分页列表
   *
   * @param query 查询条件
   * @returns 素材分页列表
   * @throws {FailedException} 获取素材分页列表失败
   */
  async findPages(
    query: GetAssetResourcePagesRequest,
  ): Promise<IApiPaginationData<IAssetResourceList>> {
    try {
      const where: IAssetResourceWhere = {
        type: query.type,
      }

      if (query.groupId)
        where.groupId = query.groupId

      if (query.name)
        where.name = Like(`%${query.name}%`)

      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(where, page, pagesize).then(
        ({ list, total, page, pagesize }) => ({
          list: toAssetResourceList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取素材分页列表', e.message)
    }
  }

  /**
   * 获取素材详情
   *
   * @param id 素材 ID
   * @returns 获取素材详情失败
   */
  async findById(id: number): Promise<IAssetResourceInfo> {
    try {
      const resource = await this.repo.findById(id)

      if (!resource)
        throw new NotFoundException('素材')

      return toAssetResourceInfo(resource)
    }
    catch (e) {
      throw new FailedException('获取素材详情', e.message, e.status)
    }
  }

  /**
   * 创建素材
   *
   * @param data 素材信息
   * @throws {FailedException} 创建素材失败
   */
  async create(data: AssetResourcePayload) {
    try {
      const resource = await this.repo.create(data)

      this.event.emit(
        new AssetResourceUploadEvent(
          resource.id,
          resource.type,
          resource.name,
          resource.path,
        ),
      )
    }
    catch (e) {
      throw new FailedException('创建素材', e.message, e.status)
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
      const resource = await this.repo.findById(id, ['id', 'type', 'name', 'path'])

      if (resource) {
        await this.repo.destroy(resource.id)

        this.event.emit(
          new AssetResourceDeleteEvent(
            resource.id,
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

  /**
   * 删除素材文件
   *
   * @param files 文件列表
   */
  async deleteResources(files: string[]) {
    try {
      const uploadDir = this.config.get<string>('upload.dest')

      await Promise.all(
        files
          .filter(file => existsSync(join(uploadDir, file)))
          .map(file => unlinkSync(join(uploadDir, file))),
      )
    }
    catch (e) {
      throw new FailedException('删除素材', e.message)
    }
  }
}
