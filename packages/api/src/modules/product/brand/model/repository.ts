import type {
  IProductBrandRepository,
  IProductBrandSelect,
  IProductBrandWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductBrandEntity } from './entity'

const defaultSelect: IProductBrandSelect = ['id', 'name', 'logo', 'desc', 'sort', 'updatedTime']

@Injectable()
export class ProductBrandRepository implements IProductBrandRepository {
  constructor(
    @InjectRepository(ProductBrandEntity)
    private readonly repo: Repository<ProductBrandEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: defaultSelect,
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
    select: IProductBrandSelect = defaultSelect,
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
    where: IProductBrandWhere,
    select: IProductBrandSelect = defaultSelect,
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
    select: IProductBrandSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductBrandWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductBrandEntity>) {
    const brand = this.newEntity()

    brand.name = data.name ? data.name.trim() : ''
    brand.logo = data.logo ? data.logo.trim() : ''
    brand.desc = data.desc ? data.desc.trim() : ''
    brand.sort = data.sort ? data.sort : 1

    return await this.repo.save(brand)
  }

  /**
   * @inheritdoc
   */
  async update(
    brand: ProductBrandEntity,
    data: Partial<ProductBrandEntity>,
  ) {
    const entity = this.newEntity({ id: brand.id })

    if (data.name && data.name !== brand.name)
      entity.name = data.name.trim()

    if (data.logo && data.logo !== brand.logo)
      entity.logo = data.logo.trim()

    if (data.desc && data.desc !== brand.desc)
      entity.desc = data.desc.trim()

    if (data.sort && data.sort !== brand.sort)
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
  newEntity(entity?: DeepPartial<ProductBrandEntity>): ProductBrandEntity {
    return this.repo.create(entity)
  }
}
