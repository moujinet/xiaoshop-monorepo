import type {
  IMemberUnregisterRepository,
  IMemberUnregisterSelect,
  IMemberUnregisterWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberUnregisterStatus } from '@xiaoshop/shared'

import { utcNow } from '~/utils/formatter'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { MemberUnregisterEntity } from './entity'

const defaultSelect: IMemberUnregisterSelect = [
  'id',
  'memberId',
  'username',
  'nickname',
  'mobile',
  'status',
  'reason',
  'auditReason',
  'applyTime',
  'auditTime',
  'unregisterTime',
]

const listSelect: IMemberUnregisterSelect = [
  'id',
  'memberId',
  'username',
  'nickname',
  'mobile',
  'status',
  'reason',
  'applyTime',
]

@Injectable()
export class MemberUnregisterRepository implements IMemberUnregisterRepository {
  constructor(
    @InjectRepository(MemberUnregisterEntity)
    private readonly repo: Repository<MemberUnregisterEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: IMemberUnregisterWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: listSelect,
      where,
      skip,
      take,
      order: {
        applyTime: 'DESC',
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
    where: IMemberUnregisterWhere,
    select: IMemberUnregisterSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        applyTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IMemberUnregisterWhere,
    select: IMemberUnregisterSelect = defaultSelect,
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
    select: IMemberUnregisterSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberUnregisterWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<MemberUnregisterEntity>) {
    const entity = this.newEntity(data)

    entity.status = MemberUnregisterStatus.PENDING
    entity.username = data.username ? data.username.trim() : ''
    entity.nickname = data.nickname ? data.nickname.trim() : ''
    entity.mobile = data.mobile ? data.mobile.trim() : ''
    entity.reason = data.reason ? data.reason.trim() : ''

    return await this.repo.save(entity)
  }

  /**
   * @inheritdoc
   */
  async update(
    entity: MemberUnregisterEntity,
    data: Partial<MemberUnregisterEntity>,
  ) {
    if (data.reason && data.reason !== entity.reason)
      entity.reason = data.reason

    if (data.auditReason && data.auditReason !== entity.auditReason) {
      entity.auditReason = data.auditReason
    }

    if (data.status !== undefined && data.status !== entity.status) {
      entity.status = data.status

      if ([
        MemberUnregisterStatus.APPROVED,
        MemberUnregisterStatus.REJECTED,
      ].includes(data.status)) {
        entity.auditTime = utcNow()
      }

      if (data.status === MemberUnregisterStatus.DONE)
        entity.unregisterTime = utcNow()
    }

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
  newEntity(entity: DeepPartial<MemberUnregisterEntity>): MemberUnregisterEntity {
    return this.repo.create(entity)
  }
}
