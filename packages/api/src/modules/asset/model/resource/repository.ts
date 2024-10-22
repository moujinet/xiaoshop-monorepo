import type {
  IAssetResourceRepository,
  IAssetResourceSelect,
  IAssetResourceWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { AssetType } from '@xiaoshop/shared'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { AssetResourceEntity } from './entity'

@Injectable()
export class AssetResourceRepository implements IAssetResourceRepository {
  constructor(
    @InjectRepository(AssetResourceEntity)
    private readonly repo: Repository<AssetResourceEntity>,
  ) {}

  async findAndCount(
    where: IAssetResourceWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: ['id', 'type', 'name', 'mimeType', 'path', 'size', 'createdTime'],
      where,
      skip,
      take,
      order: {
        createdTime: 'DESC',
      },
    })

    return {
      list,
      total,
      page,
      pagesize: take,
    }
  }

  async findById(
    id: number,
    select?: IAssetResourceSelect,
  ) {
    return await this.repo.findOne({
      select: select || {
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
  }

  async exists(where: IAssetResourceWhere) {
    return await this.repo.exists({
      where,
    })
  }

  async create(data: Partial<AssetResourceEntity>) {
    const resource = this.repo.create(data)

    resource.type = data.type || AssetType.IMAGE
    resource.groupId = data.groupId || 0
    resource.name = data.name.trim()
    resource.mimeType = data.mimeType.trim()
    resource.path = data.path.trim()
    resource.size = data.size || 0

    return await this.repo.save(data)
  }

  async destroy(id: number) {
    await this.repo.delete(id)
  }
}
