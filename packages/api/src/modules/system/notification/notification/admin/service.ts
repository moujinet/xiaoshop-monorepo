import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, In, Repository } from 'typeorm'
import {
  type IApiPaginationData,
  type ISystemNotificationInfo,
  type ISystemNotificationList,
  SystemNotificationScene,
  SystemNotificationStatus,
  SystemNotificationType,
} from '@xiaoshop/shared'

import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { objectToDict, pipeDict, toDict } from '~/utils/transformers'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { NOTIFICATION_SEND_SUCCESS } from '@/system/notification/constants'
import { SystemNotificationEntity } from '@/system/notification/notification/entity'
import {
  SYSTEM_NOTIFICATION_SCENES,
  SYSTEM_NOTIFICATION_STATUSES,
} from '~/dicts/system/notification'

import { SystemNotificationPayload } from './dto/payload'
import {
  GetSystemNotificationListRequest,
  GetSystemNotificationPagesRequest,
} from './dto/request'

@Injectable()
export class SystemNotificationAdminService {
  constructor(
    @InjectRepository(SystemNotificationEntity)
    private readonly repo: Repository<SystemNotificationEntity>,
  ) {}

  /**
   * 获取系统通知列表
   *
   * @param receiverId 接收人 ID
   * @param type 系统通知类型
   * @param query 查询条件
   * @returns 系统通知列表
   * @throws {FailedException} 获取系统通知列表失败
   */
  async findPages(
    receiverId: number,
    type: SystemNotificationType,
    query: GetSystemNotificationPagesRequest,
  ): Promise<IApiPaginationData<ISystemNotificationList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repo.findAndCount({
        select: ['id', 'scene', 'status', 'title', 'content', 'extras', 'sentTime'],
        where: {
          receiverId,
          type,
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          status: 'ASC',
          sentTime: 'DESC',
        },
      })

      return {
        list: pipeDict<ISystemNotificationList>(list, [
          row => objectToDict(row, 'scene', SYSTEM_NOTIFICATION_SCENES),
          row => objectToDict(row, 'status', SYSTEM_NOTIFICATION_STATUSES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取系统通知列表', e.message)
    }
  }

  /**
   * 获取系统通知列表
   *
   * @param receiverId 接收人 ID
   * @param type 系统通知类型
   * @param query 查询条件
   * @returns 系统通知列表
   */
  async findList(
    receiverId: number,
    type: SystemNotificationType,
    query: GetSystemNotificationListRequest,
  ): Promise<ISystemNotificationList[]> {
    try {
      const where: FindOptionsWhere<SystemNotificationEntity> = {
        receiverId,
        type,
      }

      if (query.status)
        where.status = query.status

      const list = await this.repo.find({
        select: ['id', 'scene', 'status', 'title', 'content', 'extras', 'sentTime'],
        where,
        order: { sentTime: 'DESC' },
        take: query.take || DEFAULT_PAGE_SIZE,
      })

      return pipeDict<ISystemNotificationList>(list, [
        row => objectToDict(row, 'scene', SYSTEM_NOTIFICATION_SCENES),
        row => objectToDict(row, 'status', SYSTEM_NOTIFICATION_STATUSES),
      ])
    }
    catch (e) {
      throw new FailedException('获取系统通知列表', e.message, e.status)
    }
  }

  /**
   * 读取系统通知并设置为已读
   *
   * @param id 系统通知 ID
   * @param receiverId 接收人 ID
   * @param type 系统通知类型
   * @returns 系统通知内容
   * @throws {FailedException} 获取系统通知内容失败
   * @throws {NotFoundException} 系统通知不存在
   */
  async read(
    id: number,
    receiverId: number,
    type: SystemNotificationType,
  ): Promise<ISystemNotificationInfo> {
    try {
      const notice = await this.repo.findOne({
        select: ['id', 'scene', 'status', 'title', 'content', 'extras', 'sentTime'],
        where: {
          id,
          receiverId,
          type,
        },
      })

      if (!notice)
        throw new NotFoundException('系统通知')

      if (notice.status === SystemNotificationStatus.UNREAD)
        await this.repo.update({ id }, { status: SystemNotificationStatus.READ })

      return {
        ...notice,
        scene: toDict(notice.scene, SYSTEM_NOTIFICATION_SCENES),
        status: toDict(notice.status, SYSTEM_NOTIFICATION_STATUSES),
      }
    }
    catch (e) {
      throw new FailedException('获取系统通知内容', e.message)
    }
  }

  /**
   * 设置系统通知为已读
   *
   * @param ids 系统通知 ID 列表
   * @param receiverId 接收人 ID
   * @param type 系统通知类型
   * @throws {FailedException} 设置系统通知为已读失败
   */
  async markAsRead(
    ids: number[],
    receiverId: number,
    type: SystemNotificationType,
  ) {
    try {
      await this.repo.update({
        id: In(ids),
        receiverId,
        type,
      }, {
        status: SystemNotificationStatus.READ,
      })
    }
    catch (e) {
      throw new FailedException('设置系统通知为已读', e.message)
    }
  }

  /**
   * 删除系统通知
   *
   * @param ids 系统通知 ID 列表
   * @param receiverId 接收人 ID
   * @param type 系统通知类型
   * @throws {FailedException} 删除系统通知失败
   */
  async delete(ids: number[], receiverId: number, type: SystemNotificationType) {
    try {
      await this.repo.delete({ id: In(ids), receiverId, type })
    }
    catch (e) {
      throw new FailedException('删除系统通知', e.message)
    }
  }

  /**
   * 清空系统通知
   *
   * @param receiverId 接收人 ID
   * @param type 系统通知类型
   * @throws {FailedException} 清空系统通知失败
   */
  async deleteAll(receiverId: number, type: SystemNotificationType) {
    try {
      await this.repo.delete({ receiverId, type })
    }
    catch (e) {
      throw new FailedException('清空系统通知', e.message)
    }
  }

  /**
   * 发送系统通知
   *
   * @param data 发送通知信息
   * @returns 系统通知 | 发送失败的原因
   * @throws {FailedException} 发送系统通知失败
   */
  async send(data: SystemNotificationPayload): Promise<string> {
    const {
      receiverId,
      type = SystemNotificationType.BUYER,
      scene = SystemNotificationScene.SYSTEM,
      title,
      content,
      extras,
    } = data

    const message = new SystemNotificationEntity()

    message.receiverId = receiverId
    message.type = type
    message.scene = scene
    message.title = title
    message.content = content
    message.extras = extras

    try {
      await this.repo.save(message)

      return NOTIFICATION_SEND_SUCCESS
    }
    catch (e) {
      return e.message
    }
  }
}
