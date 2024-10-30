import type {
  IMemberGroupInfoPayload,
  IMemberGroupRepository,
  IMemberGroupSelect,
  IMemberGroupWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { MemberGroupEntity } from './entity'

const defaultSelect: IMemberGroupSelect = ['id', 'name', 'desc', 'total', 'updatedTime']

@Injectable()
export class MemberGroupRepository implements IMemberGroupRepository {
  constructor(
    @InjectRepository(MemberGroupEntity)
    private readonly repo: Repository<MemberGroupEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(page: number, pagesize = DEFAULT_PAGESIZE) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: defaultSelect,
      skip,
      take,
      order: {
        total: 'DESC',
        updatedTime: 'DESC',
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
  async find(select: IMemberGroupSelect = defaultSelect) {
    return await this.repo.find({
      select,
      order: {
        total: 'DESC',
        updatedTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: IMemberGroupSelect = ['id', 'name', 'desc', 'filters', 'total'],
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberGroupWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: IMemberGroupInfoPayload) {
    const group = this.repo.create()

    group.name = data.name.trim()
    group.desc = data.desc || ''
    group.filters = data.filters || []
    group.total = 0

    return await this.repo.save(group)
  }

  /**
   * @inheritdoc
   */
  async update(
    group: MemberGroupEntity,
    data: Partial<IMemberGroupInfoPayload>,
  ) {
    if (data.name !== undefined && data.name.trim() !== group.name)
      group.name = data.name.trim()

    if (data.desc !== undefined && data.desc.trim() !== group.desc)
      group.desc = data.desc

    if (data.filters !== undefined)
      group.filters = data.filters || []

    if (data.total !== undefined)
      group.total = data.total

    return await this.repo.save(group)
  }

  /**
   * @inheritdoc
   */
  async destroy(id: number) {
    await this.repo.delete(id)
  }
}
