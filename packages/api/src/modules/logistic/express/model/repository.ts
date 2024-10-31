import type {
  ILogisticExpressRepository,
  ILogisticExpressSelect,
  ILogisticExpressWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { LogisticExpressEntity } from './entity'

@Injectable()
export class LogisticExpressRepository implements ILogisticExpressRepository {
  constructor(
    @InjectRepository(LogisticExpressEntity)
    private readonly repo: Repository<LogisticExpressEntity>,
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
      select: ['id', 'name', 'desc', 'logo', 'url', 'sort', 'updatedTime'],
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
    where: ILogisticExpressWhere,
    select: ILogisticExpressSelect = ['id', 'name'],
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
    where: ILogisticExpressWhere,
    select: ILogisticExpressSelect = ['id', 'name', 'desc', 'logo', 'url', 'sort'],
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
    select: ILogisticExpressSelect = ['id', 'name', 'desc', 'logo', 'url', 'sort'],
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: ILogisticExpressWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<LogisticExpressEntity>) {
    const express = this.newEntity(data)

    express.name = express.name.trim()
    express.desc = express.desc ? express.desc.trim() : ''
    express.logo = express.logo ? express.logo.trim() : ''
    express.url = express.url ? express.url.trim() : ''
    express.sort = express.sort || 1

    return await this.repo.save(express)
  }

  /**
   * @inheritdoc
   */
  async update(
    express: LogisticExpressEntity,
    data: Partial<LogisticExpressEntity>,
  ) {
    const entity = this.newEntity({ id: express.id })

    if (data.name !== undefined && data.name.trim() !== express.name)
      entity.name = data.name.trim()

    if (data.desc !== undefined && data.desc.trim() !== express.desc)
      entity.desc = data.desc.trim()

    if (data.logo !== undefined && data.logo.trim() !== express.logo)
      entity.logo = data.logo.trim()

    if (data.url !== undefined && data.url.trim() !== express.url)
      entity.url = data.url.trim()

    if (data.sort !== undefined && data.sort !== express.sort)
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
  newEntity(entity: DeepPartial<LogisticExpressEntity>): LogisticExpressEntity {
    return this.repo.create(entity)
  }
}
