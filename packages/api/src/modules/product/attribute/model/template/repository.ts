import type {
  IProductAttributeTemplateRepository,
  IProductAttributeTemplateSelect,
  IProductAttributeTemplateWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { ProductAttributeTemplateEntity } from './entity'

const defaultSelect: IProductAttributeTemplateSelect = ['id', 'name', 'desc', 'options']

@Injectable()
export class ProductAttributeTemplateRepository implements IProductAttributeTemplateRepository {
  constructor(
    @InjectRepository(ProductAttributeTemplateEntity)
    private readonly repo: Repository<ProductAttributeTemplateEntity>,
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
      select: ['id', 'name', 'desc', 'updatedTime'],
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
    select: IProductAttributeTemplateSelect = ['id', 'name', 'desc', 'updatedTime'],
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
    where: IProductAttributeTemplateWhere,
    select: IProductAttributeTemplateSelect = defaultSelect,
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
    select: IProductAttributeTemplateSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IProductAttributeTemplateWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<ProductAttributeTemplateEntity>) {
    const template = this.newEntity()

    template.name = data.name ? data.name.trim() : ''
    template.desc = data.desc ? data.desc.trim() : ''
    template.options = data.options || []

    return await this.repo.save(template)
  }

  /**
   * @inheritdoc
   */
  async update(
    template: ProductAttributeTemplateEntity,
    data: Partial<ProductAttributeTemplateEntity>,
  ) {
    const entity = this.newEntity({
      id: template.id,
    })

    if (data.name && data.name !== template.name)
      entity.name = data.name.trim()

    if (data.desc && data.desc !== template.desc)
      entity.desc = data.desc.trim()

    if (data.options && data.options !== template.options)
      entity.options = data.options

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
  newEntity(entity?: DeepPartial<ProductAttributeTemplateEntity>): ProductAttributeTemplateEntity {
    return this.repo.create(entity)
  }
}
