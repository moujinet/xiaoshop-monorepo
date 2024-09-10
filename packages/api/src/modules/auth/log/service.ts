import {
  AuthLogType,
  type IApiPaginationData,
  type IAuthLog,
  type IAuthUserInfo,
} from '@xiaoshop/shared'
import { UAParser } from 'ua-parser-js'
import { ClsService } from 'nestjs-cls'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm'
import { AuthLog } from '@/auth/log/entity'
import { GetAuthLogPagesRequest } from '@/auth/log/dto'
import { FailedException } from '~/common/exceptions'
import { WhoisService } from '~/services/whois'

@Injectable()
export class AuthLogService {
  constructor(
    @InjectRepository(AuthLog)
    private readonly repository: Repository<AuthLog>,

    @Inject(ClsService)
    private readonly cls: ClsService,

    @Inject(WhoisService)
    private readonly whois: WhoisService,
  ) {}

  /**
   * 获取员工日志分页列表
   *
   * @param query 查询条件
   * @throws {FailedException} 获取员工日志分页列表失败
   * @returns Promise<IApiPaginationData<IAuthLog>>
   * @see {@link IAuthLog}
   */
  async findPages(query: GetAuthLogPagesRequest): Promise<IApiPaginationData<IAuthLog>> {
    try {
      const where: FindOptionsWhere<AuthLog> = {}

      if (query.type)
        where.type = query.type

      if (query.module)
        where.module = Like(`%${query.module}%`)

      if (query.name)
        where.user = { name: Like(`%${query.name}%`) }
      else if (query.mobile)
        where.user = { mobile: query.mobile }
      else if (query.username)
        where.user = { username: query.username }

      if (query.createdTime) {
        const [start, end] = query.createdTime.split(',')
        where.createdTime = Between(start, end)
      }

      const page = query.page || 1
      const pagesize = query.pagesize || 10
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          type: true,
          user: { id: true, name: true, status: true, isAdmin: true },
          module: true,
          content: true,
          device: true,
          ip: true,
          createdTime: true,
        },
        where,
        relations: ['user'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: { createdTime: 'DESC' },
      })

      return { result, total, page, pagesize }
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
   * @param userId 操作员工 ID
   * @throws {FailedException} 写入员工日志失败
   */
  async write(
    module: string,
    content: string,
    userId?: number,
  ) {
    await this.writeLog(AuthLogType.USER, module, content, userId)
  }

  /**
   * 写入系统操作日志
   *
   * @param module 日志模块
   * @param content 日志内容
   * @throws {FailedException} 写入员工日志失败
   */
  async writeSystemLog(
    module: string,
    content: string,
  ) {
    await this.writeLog(AuthLogType.SYSTEM, module, content)
  }

  /**
   * 写入员工操作日志
   *
   * @param type 日志类型
   * @param module 日志模块
   * @param content 日志内容
   * @param userId 操作员工 ID
   * @throws {FailedException} 写入员工日志失败
   */
  async writeLog(
    type: AuthLogType,
    module: string,
    content: string,
    userId: number = 0,
  ) {
    try {
      const user = this.cls.get<IAuthUserInfo>('USER')
      const ip = this.cls.get<string>('IP')
      const agent = this.cls.get<string>('AGENT')
      const ua = new UAParser(agent).getResult()
      const whois = await this.whois.search(ip)

      const log = new AuthLog()

      log.type = type
      log.module = module
      log.content = content

      if (type === AuthLogType.USER) {
        log.userId = user ? user.id : userId
        log.device = ua.os.name ? `${ua.os.name} | ${ua.browser.name}` : '未知'
        log.ip = `${ip} (${whois.region})`
      }

      await this.repository.save(log)
    }
    catch (e) {
      throw new FailedException(`写入员工日志: ${e.message}`, e.message)
    }
  }
}
