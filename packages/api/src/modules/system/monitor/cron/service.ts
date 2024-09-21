import type {
  IApiPaginationData,
  ISystemMonitorCronList,
} from '@xiaoshop/shared'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { FailedException } from '~/common/exceptions'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'

import { SystemMonitorCron } from './entity'
import {
  GetSystemMonitorCronPagesRequest,
  SystemMonitorCronPayload,
} from './dto'

@Injectable()
export class SystemMonitorCronService {
  constructor(
    @InjectRepository(SystemMonitorCron)
    private readonly repository: Repository<SystemMonitorCron>,
  ) {}

  /**
   * 获取定时任务执行结果列表
   *
   * @param query 查询条件
   * @returns 定时任务列表
   * @throws {FailedException} 获取定时任务执行结果列表失败
   */
  async findPages(
    query: GetSystemMonitorCronPagesRequest,
  ): Promise<IApiPaginationData<ISystemMonitorCronList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'key', 'module', 'name', 'desc', 'cron', 'result', 'lastExecTime'],
        order: {
          lastExecTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return { page, pagesize, total, result }
    }
    catch (e) {
      throw new FailedException('获取系统定时任务执行结果列表', e.message)
    }
  }

  /**
   * 更新定时任务执行结果
   *
   * @param key 任务标识
   * @param data 任务结果
   * @throws {FailedException} 更新定时任务执行结果失败
   */
  async update(key: string, data: SystemMonitorCronPayload) {
    try {
      const result = await this.repository.findOne({
        where: { key },
      }) || new SystemMonitorCron()

      result.module = data.module
      result.name = data.name
      result.desc = data.desc
      result.cron = data.cron
      result.result = data.result

      await this.repository.save(result)
    }
    catch (e) {
      throw new FailedException('更新定时任务执行结果', e.message)
    }
  }
}
