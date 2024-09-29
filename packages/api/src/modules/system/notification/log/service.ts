import type {
  IApiPaginationData,
  ISystemNotificationLogInfo,
  ISystemNotificationLogList,
} from '@xiaoshop/shared'

import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Between, FindOptionsWhere, LessThan, Like, Repository } from 'typeorm'

import { FailedException } from '~/common/exceptions'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { objectToDict, pipeDict, toDict } from '~/utils/transformers'
import {
  SYSTEM_NOTIFICATION_CHANNELS,
  SYSTEM_NOTIFICATION_SCENES,
  SYSTEM_NOTIFICATION_SEND_STATUSES,
  SYSTEM_NOTIFICATION_TYPES,
} from '~/dicts/system/notification'

import { SystemNotificationLogEntity } from './entity'
import { SystemNotificationLogPayload } from './dto/payload'
import { GetSystemNotificationLogPagesRequest } from './dto/request'

@Injectable()
export class SystemNotificationLogService {
  constructor(
    @InjectRepository(SystemNotificationLogEntity)
    private readonly repo: Repository<SystemNotificationLogEntity>,
  ) {}

  /**
   * 获取通知发送日志列表
   *
   * @param query 查询条件
   * @returns 通知发送日志列表
   * @throws {FailedException} 获取通知发送日志列表失败
   */
  async findPages(
    query: GetSystemNotificationLogPagesRequest,
  ): Promise<IApiPaginationData<ISystemNotificationLogList>> {
    try {
      const where: FindOptionsWhere<SystemNotificationLogEntity> = {}

      if (query.type)
        where.type = query.type

      if (query.scene)
        where.scene = query.scene

      if (query.channel)
        where.channel = query.channel

      if (query.templateId)
        where.templateId = query.templateId

      if (query.sendTo)
        where.sendTo = Like(`%${query.sendTo}%`)

      if (query.status)
        where.status = query.status

      if (query.sentTime) {
        const [start, end] = query.sentTime.split(',')
        where.sentTime = Between(`${start} 00:00:00`, `${end} 23:59:59`)
      }

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repo.findAndCount({
        select: {
          id: true,
          type: true,
          scene: true,
          channel: true,
          template: { id: true, name: true },
          sendTo: true,
          status: true,
          sentTime: true,
        },
        where,
        relations: ['template'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: { sentTime: 'DESC' },
      })

      return {
        list: pipeDict<ISystemNotificationLogList>(list, [
          row => objectToDict(row, 'type', SYSTEM_NOTIFICATION_TYPES),
          row => objectToDict(row, 'scene', SYSTEM_NOTIFICATION_SCENES),
          row => objectToDict(row, 'channel', SYSTEM_NOTIFICATION_CHANNELS),
          row => objectToDict(row, 'status', SYSTEM_NOTIFICATION_SEND_STATUSES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取通知发送日志列表', e.message)
    }
  }

  /**
   * 获取通知发送日志信息
   *
   * @param id 通知日志 ID
   * @returns 通知日志信息
   * @throws {NotFoundException} 通知发送日志不存在
   * @throws {FailedException} 获取通知发送日志信息失败
   */
  async findById(id: number): Promise<ISystemNotificationLogInfo> {
    try {
      const log = await this.repo.findOne({
        select: {
          template: { id: true, name: true },
        },
        relations: ['template'],
        where: { id },
      })

      if (!log)
        throw new NotFoundException('通知发送日志')

      return {
        ...log,
        type: toDict(log.type, SYSTEM_NOTIFICATION_TYPES),
        scene: toDict(log.scene, SYSTEM_NOTIFICATION_SCENES),
        channel: toDict(log.channel, SYSTEM_NOTIFICATION_CHANNELS),
        status: toDict(log.status, SYSTEM_NOTIFICATION_SEND_STATUSES),
      }
    }
    catch (e) {
      throw new FailedException('获取通知发送日志信息', e.message, e.status)
    }
  }

  /**
   * 写入通知发送日志
   *
   * @param data 通知发送日志信息
   * @throws {FailedException} 写入通知发送日志失败
   */
  async write(data: SystemNotificationLogPayload) {
    try {
      const log = new SystemNotificationLogEntity()

      log.type = data.type
      log.scene = data.scene
      log.channel = data.channel
      log.templateId = data.templateId
      log.content = data.content
      log.extras = data.extras || {}
      log.sendTo = data.sendTo
      log.status = data.status
      log.result = data.result || ''

      await this.repo.save(log)
    }
    catch (e) {
      throw new FailedException('写入通知发送日志', e.message)
    }
  }

  /**
   * 清理通知发送日志
   *
   * @param days 清理天数
   * @throws {FailedException} 清理通知发送日志失败
   */
  async cleanupBeforeDays(days: number) {
    try {
      const date = new Date()
      date.setDate(date.getDate() - days)

      const list = await this.repo.find({
        select: ['id'],
        where: {
          sentTime: LessThan(date.toISOString()),
        },
      })

      await this.repo.remove(list, {
        chunk: 100,
        transaction: true,
      })
    }
    catch (e) {
      throw new FailedException('清理通知发送日志', e.message)
    }
  }
}
