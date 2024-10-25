import type {
  INotificationMessageRepository,
  INotificationMessageSelect,
  INotificationMessageWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotificationScene, NotificationType, YesOrNo } from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'
import { NOTIFICATION_CHANNELS } from '~/dicts/notification/notification'

import { NotificationMessageEntity } from './entity'

const defaultSelect: INotificationMessageSelect = ['id', 'isEnabled', 'name', 'desc', 'channels', 'updatedTime']
const detailSelect: INotificationMessageSelect = ['id', 'isEnabled', 'listenTo', 'type', 'scene', 'name', 'desc', 'channels', 'contents']

@Injectable()
export class NotificationMessageRepository implements INotificationMessageRepository {
  constructor(
    @InjectRepository(NotificationMessageEntity)
    private readonly repo: Repository<NotificationMessageEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: INotificationMessageWhere,
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
        scene: 'ASC',
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
    where: INotificationMessageWhere,
    select: INotificationMessageSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        scene: 'ASC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: INotificationMessageSelect = detailSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: INotificationMessageWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<NotificationMessageEntity>) {
    const message = this.repo.create(data)

    message.isEnabled = YesOrNo.YES
    message.type = data.type || NotificationType.SELLER
    message.scene = data.scene || NotificationScene.SYSTEM
    message.listenTo = data.listenTo.trim()
    message.name = data.name.trim()
    message.desc = data.desc.trim()
    message.channels = data.channels || NOTIFICATION_CHANNELS.map(channel => channel.key)
    message.contents = data.contents || NOTIFICATION_CHANNELS.map(
      channel => ({ channel: channel.key, title: channel.value, content: '' }),
    )

    return await this.repo.save(message)
  }

  /**
   * @inheritdoc
   */
  async update(
    message: NotificationMessageEntity,
    data: Partial<NotificationMessageEntity>,
  ) {
    if (data.name.trim() !== message.name)
      message.name = data.name.trim()

    if (data.desc.trim() !== message.desc)
      message.desc = data.desc.trim()

    if (data.channels !== message.channels)
      message.channels = data.channels

    if (data.contents !== message.contents)
      message.contents = data.contents

    if (data.isEnabled !== message.isEnabled)
      message.isEnabled = data.isEnabled

    return await this.repo.save(message)
  }

  /**
   * @inheritdoc
   */
  async updateStatus(id: number, isEnabled: YesOrNo) {
    await this.repo.update(id, { isEnabled })
  }

  /**
   * @inheritdoc
   */
  async destroy(id: number) {
    await this.repo.delete(id)
  }
}
