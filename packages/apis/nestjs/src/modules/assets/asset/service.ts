import type {
  IApiPaginationData,
  IAsset,
  IAssetListItem,
} from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Asset } from '@/assets/asset/entity'
import { AssetGroup } from '@/assets/group/entity'
import { useQueryPagination } from '~/hooks/pagination'
import { FailedException, NotFoundException } from '~/common/exception'
import {
  GetAssetPagesRequest,
  UploadAssetFilePayload,
  UploadAssetImageOptionsPayload,
  UploadAssetVideoOptionsPayload,
} from '@/assets/asset/dto'

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly repository: Repository<Asset>,
  ) {}

  /**
   * 获取素材分页列表
   *
   * @param query GetAssetPagesRequest
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IAssetListItem>>
   * @see {@link IAssetListItem}
   */
  async findPages(query: GetAssetPagesRequest): Promise<IApiPaginationData<IAssetListItem>> {
    try {
      const entity = this.repository.createQueryBuilder('entity')

      entity.where('entity.type = :type', { type: query.type })

      if (query.name)
        entity.andWhere('entity.name LIKE :name', { name: `%${query.name}%` })

      if (query.groupId) {
        entity.andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('id')
            .from(AssetGroup, 'asset_group')
            .where('asset_group.parent_id = :groupId', { groupId: query.groupId })
            .getQuery()
          return `entity.group.id IN (${subQuery})`
        })
        entity.orWhere('entity.group.id = :groupId', { groupId: query.groupId })
      }

      entity.orderBy('entity.id', 'DESC')

      return await useQueryPagination<IAsset>(entity, query.page || 1, query.pagesize || 10)
    }
    catch (e) {
      throw new FailedException('获取素材分页列表', e.message)
    }
  }

  /**
   * 获取素材详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IAsset>
   * @see {@link IAsset}
   */
  async findDetail(id: number): Promise<IAsset> {
    try {
      const detail = await this.repository.findOne({
        select: {
          group: {
            id: true,
            name: true,
            enableCompress: true,
            enableThumbnail: true,
            enableWatermark: true,
          },
        },
        where: {
          id,
        },
        relations: ['group'],
      })

      if (!detail)
        throw new NotFoundException('素材')

      return detail
    }
    catch (e) {
      throw new FailedException('获取素材详情', e.message, e.status)
    }
  }

  /**
   * 上传素材
   *
   * @param options UploadAssetImageOptionsPayload | UploadAssetVideoOptionsPayload
   * @param file UploadAssetFilePayload
   * @throws FailedException
   * @see {@link UploadAssetImageOptionsPayload}
   * @see {@link UploadAssetVideoOptionsPayload}
   */
  async create(
    options: UploadAssetImageOptionsPayload | UploadAssetVideoOptionsPayload,
    file: UploadAssetFilePayload,
  ) {
    try {
      const group = new AssetGroup()
      group.id = Number(options.groupId)

      const newAsset = new Asset()
      newAsset.group = group
      newAsset.type = options.type
      newAsset.name = file.name
      newAsset.path = file.path
      newAsset.size = file.size

      await this.repository.save(newAsset)
    }
    catch (e) {
      const typeName = options.type === 'image'
        ? '图片'
        : options.type === 'video'
          ? '视频'
          : '图标'

      throw new FailedException(`上传${typeName}素材`, e.message, e.status)
    }
  }

  /**
   * 删除素材
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除素材', e.message)
    }
  }
}
