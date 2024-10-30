import type {
  IMemberPointsChangeRepository,
  IMemberPointsChangeWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { MemberPointsChangeEntity } from './entity'

@Injectable()
export class MemberPointsChangeRepository implements IMemberPointsChangeRepository {
  constructor(
    @InjectRepository(MemberPointsChangeEntity)
    private readonly repo: Repository<MemberPointsChangeEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: IMemberPointsChangeWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: ['id', 'reason', 'points', 'createdTime'],
      where,
      skip,
      take,
      order: {
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
  async create(data: Partial<MemberPointsChangeEntity>) {
    const change = this.repo.create(data)

    change.points = data.points > 0 ? data.points : 0

    return await this.repo.save(change)
  }
}
