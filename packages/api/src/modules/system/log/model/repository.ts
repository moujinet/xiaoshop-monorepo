import type { ISystemLogRepository, ISystemLogWhere } from './interface'

import { Injectable } from '@nestjs/common'
import { LessThan, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { SystemLogLevel, SystemLogType } from '@xiaoshop/shared'

import { toUtcDateTime } from '~/utils/formatter'
import { toPaginationParams } from '~/utils/pagination'

import { SystemLogEntity } from './entity'

@Injectable()
export class SystemLogRepository implements ISystemLogRepository {
  constructor(
    @InjectRepository(SystemLogEntity)
    private readonly repo: Repository<SystemLogEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(where: ISystemLogWhere, page: number, pagesize: number) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: {
        id: true,
        type: true,
        level: true,
        module: true,
        user: { id: true, isAdmin: true, status: true, name: true },
        content: true,
        device: true,
        ip: true,
        createdTime: true,
      },
      where,
      skip,
      take,
      relations: ['user'],
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
  async findBeforeDays(days: number) {
    return await this.repo.find({
      select: {
        id: true,
        type: true,
        level: true,
        module: true,
        user: { id: true, isAdmin: true, status: true, name: true },
        content: true,
        device: true,
        ip: true,
        createdTime: true,
      },
      where: {
        createdTime: LessThan(toUtcDateTime().subtract(days, 'day').format()),
      },
      relations: ['user'],
      order: {
        createdTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<SystemLogEntity>) {
    const log = new SystemLogEntity()

    log.type = data.type || SystemLogType.SYSTEM
    log.level = data.level || SystemLogLevel.INFO
    log.module = data.module || ''
    log.userId = data.userId || 0
    log.content = data.content || ''
    log.device = data.device || ''
    log.ip = data.ip || ''

    await this.repo.save(log)
  }

  /**
   * @inheritdoc
   */
  async destroyByIds(ids: number[]) {
    await this.repo.remove(
      ids.map(id => ({ id } as SystemLogEntity)),
      {
        transaction: true,
        chunk: 100,
      },
    )
  }
}
