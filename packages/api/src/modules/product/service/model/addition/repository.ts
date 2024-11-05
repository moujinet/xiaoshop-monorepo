import type {
  IProductServiceAdditionRepository,
  IProductServiceAdditionSelect,
  IProductServiceAdditionWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductServiceAdditionEntity } from './entity'

const defaultSelect: IProductServiceAdditionSelect = [
  'id',
  'name',
  'icon',
  'desc',
  'price',
  'sort',
  'updatedTime',
]

@Injectable()
export class ProductServiceAdditionRepository implements IProductServiceAdditionRepository {
  constructor(
    @InjectRepository(ProductServiceAdditionEntity)
    private readonly repo: Repository<ProductServiceAdditionEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    select: IProductServiceAdditionSelect,
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
    select: IProductServiceAdditionSelect = defaultSelect,
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
    where: IProductServiceAdditionWhere,
    select: IProductServiceAdditionSelect = defaultSelect,
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
    select: IProductServiceAdditionSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductServiceAdditionWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductServiceAdditionEntity>) {
    const service = this.newEntity()

    service.name = data.name ? data.name.trim() : ''
    service.icon = data.icon ? data.icon.trim() : ''
    service.desc = data.desc ? data.desc.trim() : ''
    service.price = data.price || 0
    service.sort = data.sort || 1

    return await this.repo.save(service)
  }

  /**
   * @inheritdoc
   */
  async update(
    service: ProductServiceAdditionEntity,
    data: Partial<ProductServiceAdditionEntity>,
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

    if (data.price !== undefined && data.price !== service.price)
      entity.price = data.price

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
  newEntity(entity?: DeepPartial<ProductServiceAdditionEntity>): ProductServiceAdditionEntity {
    return this.repo.create(entity)
  }
}
