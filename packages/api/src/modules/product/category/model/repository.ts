import type {
  IProductCategoryRepository,
  IProductCategorySelect,
  IProductCategoryWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { ProductCategoryEntity } from './entity'

const defaultSelect: IProductCategorySelect = ['id', 'parentId', 'name', 'desc', 'image', 'sort', 'updatedTime']

@Injectable()
export class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly repo: Repository<ProductCategoryEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async find(
    where: IProductCategoryWhere,
    select: IProductCategorySelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        sort: 'ASC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductCategoryWhere,
    select: IProductCategorySelect = defaultSelect,
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
    select: IProductCategorySelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductCategoryWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductCategoryEntity>) {
    const category = this.newEntity()

    category.parentId = data.parentId || 0
    category.name = data.name ? data.name.trim() : ''
    category.desc = data.desc ? data.desc.trim() : ''
    category.image = data.image ? data.image.trim() : ''
    category.sort = data.sort ? data.sort : 1

    return await this.repo.save(category)
  }

  /**
   * @inheritdoc
   */
  async update(
    category: ProductCategoryEntity,
    data: Partial<ProductCategoryEntity>,
  ) {
    const entity = this.newEntity({ id: category.id })

    if (data.parentId !== undefined && data.parentId !== category.parentId)
      entity.parentId = data.parentId

    if (data.name && data.name !== category.name)
      entity.name = data.name.trim()

    if (data.desc && data.desc !== category.desc)
      entity.desc = data.desc.trim()

    if (data.image && data.image !== category.image)
      entity.image = data.image.trim()

    if (data.sort !== undefined && data.sort !== category.sort)
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
  newEntity(entity?: DeepPartial<ProductCategoryEntity>): ProductCategoryEntity {
    return this.repo.create(entity)
  }
}
