import {
  type IApiPaginationData,
  type IStaffLog,
  type IStaffLogType,
  type IStaffLoginProfile,
  StaffLogType,
} from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { ClsService } from 'nestjs-cls'
import { UAParser } from 'ua-parser-js'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StaffLog } from '@/staff/log/entity'
import { StaffAccount } from '@/staff/account/entity'
import { GetStaffLogPagesRequest } from '@/staff/log/dto'
import { FailedException } from '~/common/exception'
import { useQueryPagination } from '~/hooks/pagination'

@Injectable()
export class StaffLogService {
  constructor(
    @InjectRepository(StaffLog)
    private readonly repository: Repository<StaffLog>,

    private readonly cls: ClsService,
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

      if (query.module)
        entity.andWhere('entity.module = :module', { module: query.module })

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
   * 写入手动操作日志
   *
   * @param module 日志模块
   * @param content 日志内容
   * @param staffId 操作员工 ID
   * @throws {FailedException} 写入员工日志失败
   */
  async write(
    module: string,
    content: string,
    staffId?: number,
  ) {
    await this.writeLog(StaffLogType.MANUAL, module, content, staffId)
  }

  /**
   * 写入定时操作日志
   *
   * @param module 日志模块
   * @param content 日志内容
   * @param staffId 操作员工 ID
   * @throws {FailedException} 写入员工日志失败
   */
  async writeCrontabLog(
    module: string,
    content: string,
    staffId?: number,
  ) {
    await this.writeLog(StaffLogType.CRONTAB, module, content, staffId)
  }

  /**
   * 写入系统操作日志
   *
   * @param module 日志模块
   * @param content 日志内容
   * @param staffId 操作员工 ID
   * @throws {FailedException} 写入员工日志失败
   */
  async writeSystemLog(
    module: string,
    content: string,
    staffId?: number,
  ) {
    await this.writeLog(StaffLogType.SYSTEM, module, content, staffId)
  }

  /**
   * 写入员工操作日志
   *
   * @param type 日志类型
   * @param module 日志模块
   * @param content 日志内容
   * @param staffId 操作员工 ID
   * @throws {FailedException} 写入员工日志失败
   */
  async writeLog(
    type: IStaffLogType,
    module: string,
    content: string,
    staffId: number,
  ) {
    try {
      const user = this.cls.get<IStaffLoginProfile>('USER')
      const ip = this.cls.get<string>('IP')
      const agent = this.cls.get<string>('AGENT')
      const ua = new UAParser(agent).getResult()

      const log = new StaffLog()
      const staff = new StaffAccount()

      staff.id = user ? user.id : staffId

      log.staff = staff
      log.type = type
      log.module = module
      log.content = content
      log.extra = {
        os: ua.os.name || 'unknown',
        ua: ua.browser.name ? `${ua.browser.name}/${ua.browser.version}` : 'unknown',
        ip,
      }

      await this.repository.save(log)
    }
    catch (e) {
      throw new FailedException('写入员工日志', e.message)
    }
  }
}
