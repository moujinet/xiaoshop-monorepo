import type {
  IMemberTagRepository,
  IMemberTagSelect,
  IMemberTagWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { MemberTagEntity } from './entity'

const defaultSelect: IMemberTagSelect = ['id', 'name', 'color', 'updatedTime']

@Injectable()
export class MemberTagRepository implements IMemberTagRepository {
  constructor(
    @InjectRepository(MemberTagEntity)
    private readonly repo: Repository<MemberTagEntity>,
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
  async find(select: IMemberTagSelect = defaultSelect) {
    return await this.repo.find({
      select,
      order: {
        updatedTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: IMemberTagSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberTagWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<MemberTagEntity>) {
    const tag = this.repo.create(data)

    return await this.repo.save(tag)
  }

  /**
   * @inheritdoc
   */
  async update(
    tag: MemberTagEntity,
    data: Partial<MemberTagEntity>,
  ) {
    if (data.name.trim() !== tag.name)
      tag.name = data.name.trim()

    if (data.color.trim() !== tag.color)
      tag.color = data.color

    return await this.repo.save(tag)
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
  newEntity(entity: DeepPartial<MemberTagEntity>): MemberTagEntity {
    return this.repo.create(entity)
  }
}
