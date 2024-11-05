import type {
  IProductServiceExtraRepository,
  IProductServiceExtraSelect,
  IProductServiceExtraWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductServiceExtraEntity } from './entity'

const defaultSelect: IProductServiceExtraSelect = [
  'id',
  'name',
  'icon',
  'desc',
  'sort',
  'updatedTime',
]

@Injectable()
export class ProductServiceExtraRepository implements IProductServiceExtraRepository {
  constructor(
    @InjectRepository(ProductServiceExtraEntity)
    private readonly repo: Repository<ProductServiceExtraEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    select: IProductServiceExtraSelect,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select,
      skip,
      take,
      order: {
        sort: 'ASC',
      },
    })

    return {
      list,
      total,
      page,
      pagesize: take,
    }
  }

  /**
   * @inheritdoc
   */
  async find(
    select: IProductServiceExtraSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      order: {
        sort: 'ASC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductServiceExtraWhere,
    select: IProductServiceExtraSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: IProductServiceExtraSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductServiceExtraWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductServiceExtraEntity>) {
    const service = this.newEntity()

    service.name = data.name ? data.name.trim() : ''
    service.icon = data.icon ? data.icon.trim() : ''
    service.desc = data.desc ? data.desc.trim() : ''
    service.sort = data.sort || 1

    return await this.repo.save(service)
  }

  /**
   * @inheritdoc
   */
  async update(
    service: ProductServiceExtraEntity,
    data: Partial<ProductServiceExtraEntity>,
  ) {
    const entity = this.newEntity({
      id: service.id,
    })

    if (data.name && data.name !== service.name)
      entity.name = data.name.trim()

    if (data.icon && data.icon !== service.icon)
      entity.icon = data.icon.trim()

    if (data.desc && data.desc !== service.desc)
      entity.desc = data.desc.trim()

    if (data.sort !== undefined && data.sort !== service.sort)
      entity.sort = data.sort

    return await this.repo.save(entity)
  }

  /**
   * @inheritdoc
   */
  async destroy(id: number) {
    await this.repo.delete(id)
  }

  /**
   * @inheritdoc
   */
  newEntity(entity?: DeepPartial<ProductServiceExtraEntity>): ProductServiceExtraEntity {
    return this.repo.create(entity)
  }
}
