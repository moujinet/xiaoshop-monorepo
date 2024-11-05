import type {
  IProductGroupRepository,
  IProductGroupSelect,
  IProductGroupWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductGroupEntity } from './entity'

const defaultSelect: IProductGroupSelect = ['id', 'name', 'desc', 'sort', 'updatedTime']

@Injectable()
export class ProductGroupRepository implements IProductGroupRepository {
  constructor(
    @InjectRepository(ProductGroupEntity)
    private readonly repo: Repository<ProductGroupEntity>,
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
    select: IProductGroupSelect = defaultSelect,
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
    where: IProductGroupWhere,
    select: IProductGroupSelect = defaultSelect,
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
    select: IProductGroupSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductGroupWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductGroupEntity>) {
    const group = this.newEntity()

    group.name = data.name ? data.name.trim() : ''
    group.desc = data.desc ? data.desc.trim() : ''
    group.sort = data.sort ? data.sort : 1

    return await this.repo.save(group)
  }

  /**
   * @inheritdoc
   */
  async update(
    group: ProductGroupEntity,
    data: Partial<ProductGroupEntity>,
  ) {
    const entity = this.newEntity({ id: group.id })

    if (data.name && data.name !== group.name)
      entity.name = data.name.trim()

    if (data.desc && data.desc !== group.desc)
      entity.desc = data.desc.trim()

    if (data.sort && data.sort !== group.sort)
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
  newEntity(entity?: DeepPartial<ProductGroupEntity>): ProductGroupEntity {
    return this.repo.create(entity)
  }
}
