import type {
  IProductExportRepository,
  IProductExportSelect,
  IProductExportWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductExportStatus } from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductExportEntity } from './entity'

const defaultSelect: IProductExportSelect = ['id', 'status', 'conditions', 'count', 'filePath', 'createdTime']

@Injectable()
export class ProductExportRepository implements IProductExportRepository {
  constructor(
    @InjectRepository(ProductExportEntity)
    private readonly repo: Repository<ProductExportEntity>,
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
        status: 'ASC',
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

  /**
   * @inheritdoc
   */
  async find(
    select: IProductExportSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      order: {
        status: 'ASC',
        createdTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IProductExportWhere,
    select: IProductExportSelect = defaultSelect,
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
    select: IProductExportSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductExportWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductExportEntity>) {
    const entity = this.newEntity({
      status: ProductExportStatus.PENDING,
      conditions: data.conditions,
      count: 0,
      filePath: '',
    })

    return await this.repo.save(entity)
  }

  /**
   * @inheritdoc
   */
  async update(
    entity: ProductExportEntity,
    data: Partial<ProductExportEntity>,
  ) {
    const update = this.newEntity({
      id: entity.id,
    })

    if (data.status !== undefined && data.status !== entity.status)
      update.status = data.status

    if (data.count !== undefined && data.count !== entity.count)
      update.count = data.count

    if (data.filePath && data.filePath !== entity.filePath)
      update.filePath = data.filePath

    return await this.repo.save(update)
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
  newEntity(entity?: DeepPartial<ProductExportEntity>): ProductExportEntity {
    return this.repo.create(entity)
  }
}
