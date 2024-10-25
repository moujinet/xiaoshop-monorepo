import type { INotificationMessageSendJob } from '@/notification/message/domain/subscribe/interface'
import type {
  INotificationInboxRepository,
  INotificationInboxSelect,
  INotificationInboxWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { In, LessThan, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { NotificationScene, NotificationStatus, NotificationType } from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'
import { beforeDateTime, utcNow } from '~/utils/formatter'

import { NotificationInboxEntity } from './entity'

const defaultSelect: INotificationInboxSelect = [
  'id',
  'scene',
  'status',
  'title',
  'content',
  'extras',
  'sentTime',
]

@Injectable()
export class NotificationInboxRepository implements INotificationInboxRepository {
  constructor(
    @InjectRepository(NotificationInboxEntity)
    private readonly repo: Repository<NotificationInboxEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: INotificationInboxWhere,
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
  async find(
    where: INotificationInboxWhere,
    select: INotificationInboxSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        sentTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    subscriberId: number,
    type: NotificationType,
    select: INotificationInboxSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id, subscriberId, type },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: INotificationInboxWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: INotificationMessageSendJob) {
    const notification = this.repo.create(data)

    notification.subscriberId = data.subscriberId
    notification.type = data.type || NotificationType.SELLER
    notification.scene = data.scene || NotificationScene.SYSTEM
    notification.status = NotificationStatus.UNREAD
    notification.title = data.title.trim()
    notification.content = data.content.trim()
    notification.extras = data.extras || {}

    return await this.repo.save(notification)
  }

  /**
   * @inheritdoc
   */
  async markAsRead(ids: number[], subscriberId: number, type: NotificationType) {
    await this.repo.update({
      id: In(ids),
      subscriberId,
      type,
    }, {
      status: NotificationStatus.READ,
    })
  }

  /**
   * @inheritdoc
   */
  async destroy(ids: number[], subscriberId: number, type: NotificationType) {
    await this.repo.delete({
      id: In(ids),
      subscriberId,
      type,
    })
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
