import type {
  INotificationSubscriberDeleteWhere,
  INotificationSubscriberRepository,
  INotificationSubscriberSelect,
  INotificationSubscriberWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotificationType } from '@xiaoshop/shared'

import { NotificationSubscriberEntity } from './entity'

const defaultSelect: INotificationSubscriberSelect = ['id', 'type', 'messageId', 'subscriberId']

@Injectable()
export class NotificationSubscriberRepository implements INotificationSubscriberRepository {
  constructor(
    @InjectRepository(NotificationSubscriberEntity)
    private readonly repo: Repository<NotificationSubscriberEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async find(
    where: INotificationSubscriberWhere,
    select: INotificationSubscriberSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        messageId: 'ASC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: INotificationSubscriberSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: INotificationSubscriberWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<NotificationSubscriberEntity>) {
    const subscriber = this.repo.create(data)

    subscriber.type = data.type || NotificationType.SELLER

    return await this.repo.save(subscriber)
  }

  /**
   * @inheritdoc
   */
  async destroy(where: INotificationSubscriberDeleteWhere) {
    await this.repo.delete(where)
  }
}
