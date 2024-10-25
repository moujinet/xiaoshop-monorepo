import type {
  IAssetGroupRepository,
  IAssetGroupSelect,
  IAssetGroupWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AssetType, YesOrNo } from '@xiaoshop/shared'

import { AssetGroupEntity } from './entity'

const defaultSelect: IAssetGroupSelect = [
  'id',
  'type',
  'parentId',
  'name',
  'sort',
  'enableCompress',
  'enableWatermark',
  'enableThumbnail',
]

@Injectable()
export class AssetGroupRepository implements IAssetGroupRepository {
  constructor(
    @InjectRepository(AssetGroupEntity)
    private readonly repo: Repository<AssetGroupEntity>,
  ) {}

  async find(where: IAssetGroupWhere, select: IAssetGroupSelect = defaultSelect) {
    return await this.repo.find({
      select,
      where,
      order: {
        parentId: 'ASC',
        sort: 'ASC',
      },
    })
  }

  async findById(
    id: number,
    select: IAssetGroupSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  async exists(where: IAssetGroupWhere) {
    return await this.repo.exists({
      where,
    })
  }

  async create(data: Partial<AssetGroupEntity>) {
    const group = this.repo.create(data)

    group.name = data.name.trim()
    group.type = data.type || AssetType.IMAGE
    group.parentId = data.parentId || 0
    group.enableCompress = data.enableCompress || YesOrNo.NO
    group.enableWatermark = data.enableWatermark || YesOrNo.NO
    group.enableThumbnail = data.enableThumbnail || YesOrNo.NO
    group.sort = data.sort || 1

    return await this.repo.save(group)
  }

  async update(group: AssetGroupEntity, data: Partial<AssetGroupEntity>) {
    if (data.name.trim() !== group.name)
      group.name = data.name.trim()

    if (data.parentId !== undefined)
      group.parentId = data.parentId

    if (data.enableCompress !== undefined)
      group.enableCompress = data.enableCompress

    if (data.enableWatermark !== undefined)
      group.enableWatermark = data.enableWatermark

    if (data.enableThumbnail !== undefined)
      group.enableThumbnail = data.enableThumbnail

    if (data.sort !== undefined)
      group.sort = data.sort

    return await this.repo.save(group)
  }

  async destroy(id: number) {
    await this.repo.delete(id)
  }
}
