import type { IApiPaginationData, IStaffLog, IStaffLogType } from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StaffLog } from '@/staffs/log/entity'
import { Account } from '@/staffs/account/entity'
import { GetStaffLogPagesRequest, StaffLogPayload } from '@/staffs/log/dto'
import { FailedException } from '~/common/exception'
import { useQueryPagination } from '~/hooks/pagination'

@Injectable()
export class StaffLogService {
  constructor(
    @InjectRepository(StaffLog)
    private readonly repository: Repository<StaffLog>,
  ) {}

  /**
   * 获取员工日志分页列表
   *
   * @param query GetStaffLogPagesRequest
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IStaffLog>>
   * @see {@link IStaffLog}
   */
  async findPages(query: GetStaffLogPagesRequest): Promise<IApiPaginationData<IStaffLog>> {
    try {
      const entity = this.repository.createQueryBuilder('entity')

      entity.leftJoin('entity.staff', 'staff')
      entity.addSelect([
        'staff.id',
        'staff.name',
        'staff.username',
        'staff.mobile',
      ])

      if (query.type)
        entity.andWhere('entity.type = :type', { type: query.type })

      if (query.name)
        entity.andWhere('staff.name LIKE :name', { name: `%${query.name}%` })

      if (query.username)
        entity.andWhere('staff.username LIKE :username', { username: `%${query.username}%` })

      if (query.mobile)
        entity.andWhere('staff.mobile LIKE :mobile', { mobile: `%${query.mobile}%` })

      if (query.time) {
        const [start, end] = query.time.includes(',')
          ? query.time.split(',')
          : [query.time, query.time]

        entity.andWhere('entity.createdTime BETWEEN :start AND :end', {
          start: `${start} 00:00:00`,
          end: `${end} 23:59:59`,
        })
      }

      entity.orderBy('entity.createdTime', 'DESC')

      return await useQueryPagination<IStaffLog>(entity, query.page || 1, query.pagesize || 10)
    }
    catch (e) {
      throw new FailedException('获取员工日志列表', e.message)
    }
  }

  /**
   * 创建员工日志
   *
   * @param type IStaffLogType
   * @param data StaffLogPayload
   * @throws FailedException
   * @see {@link StaffLogPayload}
   */
  async create(type: IStaffLogType, data: StaffLogPayload) {
    try {
      const log = new StaffLog()
      const staff = new Account()
      staff.id = data.staff.id

      log.staff = staff
      log.type = type
      log.action = data.action
      log.content = data.content
      log.extra = data.extra

      await this.repository.save(log)
    }
    catch (e) {
      throw new FailedException('创建员工日志', e.message)
    }
  }
}
