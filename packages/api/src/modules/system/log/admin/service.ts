import { UAParser } from 'ua-parser-js'
import { ClsService } from 'nestjs-cls'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { Between, FindOptionsWhere, LessThan, Like, Repository } from 'typeorm'
import {
  type IApiPaginationData,
  type ISystemLoginSignData,
  type ISystemLogList,
  type SystemLogLevel,
  SystemLogType,
} from '@xiaoshop/shared'

import { WhoisService } from '~/services/whois'
import { FailedException } from '~/common/exceptions'
import { SystemLogEntity } from '@/system/log/entity'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { objectToDict, pipeDict } from '~/utils/transformers'
import { SYSTEM_LOG_LEVELS, SYSTEM_LOG_TYPES, SYSTEM_USER_STATUSES } from '~/dicts'

import { SystemLogPayload } from './dto/payload'
import { GetSystemLogPagesRequest } from './dto/request'

@Injectable()
export class SystemLogAdminService {
  constructor(
    @InjectRepository(SystemLogEntity)
    private readonly repo: Repository<SystemLogEntity>,

    @Inject(WhoisService)
    private readonly whois: WhoisService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 获取系统日志列表
   *
   * @param query 查询条件
   * @returns 系统日志列表
   * @throws {FailedException} 获取系统日志列表失败
   */
  async findPages(query: GetSystemLogPagesRequest): Promise<IApiPaginationData<ISystemLogList>> {
    try {
      const where: FindOptionsWhere<SystemLogEntity> = {}

      if (query.type)
        where.type = query.type

      if (query.level)
        where.level = query.level

      if (query.module)
        where.module = Like(`%${query.module}%`)

      if (query.name) {
        where.user = {
          name: Like(`${query.name}%`),
        }
      }

      if (query.mobile) {
        where.user = {
          mobile: Like(`${query.mobile}%`),
        }
      }

      if (query.createdTime) {
        const [start, end] = query.createdTime.split(',')
        where.createdTime = Between(`${start} 00:00:00`, `${end} 23:59:59`)
      }

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

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
        order: {
          createdTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return {
        list: pipeDict<ISystemLogList>(list, [
          log => objectToDict(log, 'type', SYSTEM_LOG_TYPES),
          log => objectToDict(log, 'level', SYSTEM_LOG_LEVELS),
          log => objectToDict(log, 'user.status', SYSTEM_USER_STATUSES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取系统日志列表', e.message)
    }
  }

  /**
   * 获取大于指定天数的系统日志列表
   *
   * @param days 天数
   * @returns 系统日志列表
   * @throws {FailedException} 获取系统日志列表失败
   */
  async findListBeforeDays(days: number) {
    try {
      const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

      const list = await this.repo.find({
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
          createdTime: LessThan(date.toISOString()),
        },
        order: {
          createdTime: 'DESC',
        },
      })

      return pipeDict<ISystemLogList>(list, [
        log => objectToDict(log, 'type', SYSTEM_LOG_TYPES),
        log => objectToDict(log, 'level', SYSTEM_LOG_LEVELS),
        log => objectToDict(log, 'user.status', SYSTEM_USER_STATUSES),
      ])
    }
    catch (e) {
      throw new FailedException('获取系统日志列表', e.message)
    }
  }

  /**
   * 写入系统日志
   *
   * @param level 日志等级
   * @param data 日志信息
   * @throws {FailedException} 写入系统日志失败
   */
  async write(level: SystemLogLevel, data: SystemLogPayload) {
    try {
      const log = new SystemLogEntity()

      log.level = level
      log.type = data.type || SystemLogType.SYSTEM
      log.module = data.module
      log.content = data.content

      if (log.type === SystemLogType.ADMIN) {
        const user = this.cls.get<ISystemLoginSignData['user']>('USER')
        const agent = this.cls.get<string>('AGENT')
        const ua = new UAParser(agent).getResult()
        const ip = this.cls.get<string>('IP')
        const whois = await this.whois.search(ip)

        log.userId = user ? user.id : data.userId || 0
        log.device = ua.os.name ? `${ua.os.name} | ${ua.browser.name}` : '未知'
        log.ip = `${ip} (${whois.region})`
      }

      await this.repo.save(log)
    }
    catch (e) {
      throw new FailedException(`写入系统日志 - ${e.message}`)
    }
  }

  /**
   * 删除系统日志
   *
   * @param ids 系统日志 ID 列表
   * @throws {FailedException} 删除系统日志失败
   */
  async deleteByIds(ids: number[]) {
    try {
      await this.repo.remove(
        ids.map(id => ({ id } as SystemLogEntity)),
        { transaction: true, chunk: 100 },
      )
    }
    catch (e) {
      throw new FailedException('删除系统日志', e.message)
    }
  }
}
