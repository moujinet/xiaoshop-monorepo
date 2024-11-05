import type {
  IProductTagRepository,
  IProductTagSelect,
  IProductTagWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { ColorName } from '@xiaoshop/shared'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductTagEntity } from './entity'

const defaultSelect: IProductTagSelect = ['id', 'name', 'color', 'updatedTime']

@Injectable()
export class ProductTagRepository implements IProductTagRepository {
  constructor(
    @InjectRepository(ProductTagEntity)
    private readonly repo: Repository<ProductTagEntity>,
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
        updatedTime: 'ASC',
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
    select: IProductTagSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      order: {
        updatedTime: 'ASC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductTagWhere,
    select: IProductTagSelect = defaultSelect,
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
    select: IProductTagSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductTagWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductTagEntity>) {
    const tag = this.newEntity()

    tag.name = data.name ? data.name.trim() : ''
    tag.color = data.color || ColorName.GRAY

    return await this.repo.save(tag)
  }

  /**
   * @inheritdoc
   */
  async update(
    tag: ProductTagEntity,
    data: Partial<ProductTagEntity>,
  ) {
    const entity = this.newEntity({ id: tag.id })

    if (data.name && data.name !== tag.name)
      entity.name = data.name.trim()

    if (data.color && data.color !== tag.color)
      entity.color = data.color

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
  newEntity(entity?: DeepPartial<ProductTagEntity>): ProductTagEntity {
    return this.repo.create(entity)
  }
}
