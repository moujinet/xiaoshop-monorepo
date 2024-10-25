import type {
  INotificationLogRepository,
  INotificationLogSelect,
  INotificationLogWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { LessThan, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  NotificationChannel,
  NotificationScene,
  NotificationSendStatus,
  NotificationType,
} from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'
import { beforeDateTime, utcNow } from '~/utils/formatter'

import { NotificationLogEntity } from './entity'

const defaultSelect: INotificationLogSelect = ['id', 'type', 'scene', 'channel', 'subscriber', 'title', 'content', 'status', 'result', 'sentTime']
const listSelect: INotificationLogSelect = ['id', 'type', 'scene', 'channel', 'subscriber', 'title', 'status', 'sentTime']

@Injectable()
export class NotificationLogRepository implements INotificationLogRepository {
  constructor(
    @InjectRepository(NotificationLogEntity)
    private readonly repo: Repository<NotificationLogEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: INotificationLogWhere,
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
        sentTime: 'DESC',
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
  async findById(
    id: number,
    select: INotificationLogSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: INotificationLogWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<NotificationLogEntity>) {
    const log = this.repo.create(data)

    log.type = data.type || NotificationType.SELLER
    log.scene = data.scene || NotificationScene.SYSTEM
    log.channel = data.channel || NotificationChannel.SYSTEM
    log.status = data.status || NotificationSendStatus.SUCCESS
    log.subscriber = data.subscriber.trim()
    log.title = data.title.trim()
    log.content = data.content.trim()
    log.result = data.result || ''

    return await this.repo.save(log)
  }

  /**
   * @inheritdoc
   */
  async cleanup(daysAgo: number) {
    return await this.repo.delete({
      sentTime: LessThan(
        beforeDateTime(`${utcNow('YYYY-MM-DD')} 23:59:59`, daysAgo, 'day').format(),
      ),
    })
  }
}
