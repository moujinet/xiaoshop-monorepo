import type { IApiPaginationData, ISystemLogList } from '@xiaoshop/shared'
import type { ISystemLogRepository, ISystemLogWhere } from '@/system/log/model/interface'

import { Like } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { toBetweenDate } from '~/utils/typeorm'
import { FailedException } from '~/common/exceptions'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { SystemLogRepo } from '@/system/log/model/provider'
import { toSystemLogList } from '@/system/log/model/mapper'
import { GetSystemLogPagesRequest } from '@/system/log/dto/request'

@Injectable()
export class SystemLogQueryService {
  constructor(
    @SystemLogRepo()
    private readonly repo: ISystemLogRepository,
  ) {}

  /**
   * 获取系统日志分页列表
   *
   * @param query 查询条件
   * @returns 系统日志列表
   */
  async findPages(
    query: GetSystemLogPagesRequest,
  ): Promise<IApiPaginationData<ISystemLogList>> {
    try {
      const where: ISystemLogWhere = {}

      if (query.type)
        where.type = query.type

      if (query.level)
        where.level = query.level

      if (query.module)
        where.module = Like(`%${query.module}%`)

      if (query.name)
        where.user = { name: Like(`${query.name}%`) }

      if (query.mobile)
        where.user = { mobile: Like(`${query.mobile}%`) }

      if (query.createdTime)
        where.createdTime = toBetweenDate(query.createdTime)

      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(where, page, pagesize)
        .then(
          ({ list, total, page, pagesize }) => ({
            list: toSystemLogList(list),
            total,
            page,
            pagesize,
          }),
        )
    }
    catch (e) {
      throw new FailedException('获取系统日志列表', e.message)
    }
  }
}
