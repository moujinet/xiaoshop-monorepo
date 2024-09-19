import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindOptionsWhere, LessThan, Like, Repository } from 'typeorm'
import {
  type IApiPaginationData,
  type ISystemMessageLogInfo,
  type ISystemMessageLogList,
  SYSTEM_MESSAGE_CHANNELS,
  SYSTEM_MESSAGE_SCENES,
  SYSTEM_MESSAGE_SEND_STATUSES,
  SYSTEM_MESSAGE_TYPES,
} from '@xiaoshop/shared'

import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { objectToDict, pipeDict, toDict } from '~/utils/transformers'
import { FailedException, NotFoundException } from '~/common/exceptions'

import { SystemMessageLog } from './entity'
import { GetSystemMessageLogPagesRequest, SystemMessageLogPayload } from './dto'

@Injectable()
export class SystemMessageLogService {
  constructor(
    @InjectRepository(SystemMessageLog)
    private readonly repository: Repository<SystemMessageLog>,
  ) {}

  /**
   * 获取消息日志列表
   *
   * @param query 查询条件
   * @returns 消息日志列表
   * @throws {FailedException} 获取消息日志列表失败
   */
  async findPages(
    query: GetSystemMessageLogPagesRequest,
  ): Promise<IApiPaginationData<ISystemMessageLogList>> {
    try {
      const where: FindOptionsWhere<SystemMessageLog> = {}

      if (query.type)
        where.type = query.type

      if (query.scene)
        where.scene = query.scene

      if (query.channel)
        where.channel = query.channel

      if (query.templateId)
        where.templateId = query.templateId

      if (query.receiver)
        where.receiver = Like(`%${query.receiver}%`)

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

      const [list, total] = await this.repository.findAndCount({
        select: {
          id: true,
          type: true,
          scene: true,
          channel: true,
          template: { id: true, name: true },
          receiver: true,
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
        result: pipeDict<ISystemMessageLogList>(list, [
          row => objectToDict(row, 'type', SYSTEM_MESSAGE_TYPES),
          row => objectToDict(row, 'scene', SYSTEM_MESSAGE_SCENES),
          row => objectToDict(row, 'channel', SYSTEM_MESSAGE_CHANNELS),
          row => objectToDict(row, 'status', SYSTEM_MESSAGE_SEND_STATUSES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取消息日志列表', e.message)
    }
  }

  /**
   * 获取消息日志信息
   *
   * @param id 消息日志 ID
   * @returns 消息日志信息
   * @throws {NotFoundException} 消息日志不存在
   * @throws {FailedException} 获取消息日志信息失败
   */
  async findById(id: number): Promise<ISystemMessageLogInfo> {
    try {
      const log = await this.repository.findOne({
        select: {
          template: { id: true, name: true },
        },
        relations: ['template'],
        where: { id },
      })

      if (!log)
        throw new NotFoundException('消息日志')

      return {
        ...log,
        type: toDict(log.type, SYSTEM_MESSAGE_TYPES),
        scene: toDict(log.scene, SYSTEM_MESSAGE_SCENES),
        channel: toDict(log.channel, SYSTEM_MESSAGE_CHANNELS),
        status: toDict(log.status, SYSTEM_MESSAGE_SEND_STATUSES),
      }
    }
    catch (e) {
      throw new FailedException('获取消息日志信息', e.message, e.status)
    }
  }

  /**
   * 写入消息日志
   *
   * @param data 消息日志信息
   * @throws {FailedException} 写入消息日志失败
   */
  async write(data: SystemMessageLogPayload) {
    try {
      const log = new SystemMessageLog()

      log.type = data.type
      log.scene = data.scene
      log.channel = data.channel
      log.templateId = data.templateId
      log.content = data.content
      log.extras = data.extras || {}
      log.receiver = data.receiver
      log.status = data.status
      log.result = data.result || ''

      await this.repository.save(log)
    }
    catch (e) {
      throw new FailedException('写入消息日志失败', e.message)
    }
  }

  /**
   * 清理消息日志
   *
   * @param days 清理天数
   * @throws {FailedException} 清理消息日志失败
   */
  async cleanupBeforeDays(days: number) {
    try {
      const date = new Date()
      date.setDate(date.getDate() - days)

      const list = await this.repository.find({
        select: ['id'],
        where: {
          sentTime: LessThan(date.toISOString()),
        },
      })

      await this.repository.remove(list, {
        chunk: 100,
        transaction: true,
      })
    }
    catch (e) {
      throw new FailedException('清理消息日志失败', e.message)
    }
  }
}
