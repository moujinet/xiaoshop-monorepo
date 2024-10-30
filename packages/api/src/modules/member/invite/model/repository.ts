import type {
  IMemberInviteRepository,
  IMemberInviteSelect,
  IMemberInviteWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'

import { MemberInviteEntity } from './entity'

const defaultSelect: IMemberInviteSelect = {
  id: true,
  inviteeId: true,
  invitee: {
    avatar: true,
    nickname: true,
    gender: true,
    card: {
      id: true,
      key: true,
      type: true,
      badgeStyle: { image: true, icon: true, textColor: true, bgColor: true },
      dueTime: true,
      useTimes: true,
      limitTimes: true,
    },
    orderCount: true,
    orderAmount: true,
    lastLoginTime: true,
  },
  createdTime: true,
}

@Injectable()
export class MemberInviteRepository implements IMemberInviteRepository {
  constructor(
    @InjectRepository(MemberInviteEntity)
    private readonly repo: Repository<MemberInviteEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: IMemberInviteWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: defaultSelect,
      where,
      skip,
      take,
      relations: ['invitee'],
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
  async find(
    where: IMemberInviteWhere,
    select: IMemberInviteSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      relations: ['invitee'],
      order: {
        createdTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IMemberInviteWhere,
    select: IMemberInviteSelect = defaultSelect,
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
    select: IMemberInviteSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberInviteWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<MemberInviteEntity>) {
    return await this.repo.save(data)
  }

  /**
   * @inheritdoc
   */
  newEntity(entity: DeepPartial<MemberInviteEntity>): MemberInviteEntity {
    return this.repo.create(entity)
  }
}
