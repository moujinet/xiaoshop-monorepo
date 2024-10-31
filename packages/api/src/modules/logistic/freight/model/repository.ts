import type {
  ILogisticFreightTemplateRepository,
  ILogisticFreightTemplateSelect,
  ILogisticFreightTemplateWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { LogisticFreightCalcMode, YesOrNo } from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { LogisticFreightTemplateEntity } from './entity'

const defaultSelect: ILogisticFreightTemplateSelect = [
  'id',
  'isEnabled',
  'name',
  'desc',
  'sort',
  'calcMode',
  'rules',
  'enableFreeRules',
  'freeRules',
]

@Injectable()
export class LogisticFreightTemplateRepository implements ILogisticFreightTemplateRepository {
  constructor(
    @InjectRepository(LogisticFreightTemplateEntity)
    private readonly repo: Repository<LogisticFreightTemplateEntity>,
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
      select: [
        'id',
        'isEnabled',
        'name',
        'desc',
        'sort',
        'calcMode',
        'enableFreeRules',
        'updatedTime',
      ],
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
    where: ILogisticFreightTemplateWhere,
    select: ILogisticFreightTemplateSelect = defaultSelect,
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
    where: ILogisticFreightTemplateWhere,
    select: ILogisticFreightTemplateSelect = defaultSelect,
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
    select: ILogisticFreightTemplateSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: ILogisticFreightTemplateWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<LogisticFreightTemplateEntity>) {
    const template = this.newEntity()

    template.isEnabled = data.isEnabled ? data.isEnabled : YesOrNo.YES
    template.name = data.name ? data.name.trim() : ''
    template.desc = data.desc ? data.desc.trim() : ''
    template.sort = data.sort || 1
    template.calcMode = data.calcMode || LogisticFreightCalcMode.WEIGHT
    template.rules = data.rules || []
    template.enableFreeRules = data.enableFreeRules ? data.enableFreeRules : YesOrNo.NO
    template.freeRules = data.freeRules || []

    return await this.repo.save(template)
  }

  /**
   * @inheritdoc
   */
  async update(
    template: LogisticFreightTemplateEntity,
    data: Partial<LogisticFreightTemplateEntity>,
  ) {
    const entity = this.newEntity({ id: template.id })

    if (data.isEnabled !== undefined && data.isEnabled !== template.isEnabled)
      entity.isEnabled = data.isEnabled

    if (data.name !== undefined && data.name.trim() !== template.name)
      entity.name = data.name.trim()

    if (data.desc !== undefined && data.desc.trim() !== template.desc)
      entity.desc = data.desc.trim()

    if (data.sort !== undefined && data.sort !== template.sort)
      entity.sort = data.sort

    if (data.calcMode !== undefined && data.calcMode !== template.calcMode)
      entity.calcMode = data.calcMode

    if (data.rules !== undefined && data.rules !== template.rules)
      entity.rules = data.rules

    if (data.enableFreeRules !== undefined && data.enableFreeRules !== template.enableFreeRules)
      entity.enableFreeRules = data.enableFreeRules

    if (data.freeRules !== undefined && data.freeRules !== template.freeRules)
      entity.freeRules = data.freeRules

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
  newEntity(entity?: DeepPartial<LogisticFreightTemplateEntity>): LogisticFreightTemplateEntity {
    return this.repo.create(entity)
  }
}
