import type { ISystemLogRepository } from '@/system/log/model/interface'

import { UAParser } from 'ua-parser-js'
import { ClsService } from 'nestjs-cls'
import { Inject, Injectable } from '@nestjs/common'
import {
  type ISystemLoginSignData,
  type SystemLogLevel,
  SystemLogType,
} from '@xiaoshop/shared'

import { FailedException } from '~/common/exceptions'
import { WhoisService } from '~/services/whois/service'
import { SystemLogRepo } from '@/system/log/model/provider'
import { SystemLogEntity } from '@/system/log/model/entity'
import { CreateSystemLogPayload } from '@/system/log/dto/payload'
import {
  REQUEST_ADMIN_KEY,
  REQUEST_AGENT_KEY,
  REQUEST_IP_KEY,
} from '~/common/constants/metadata.constant'

@Injectable()
export class SystemLogStoreService {
  constructor(
    @SystemLogRepo()
    private readonly repo: ISystemLogRepository,

    @Inject(WhoisService)
    private readonly whois: WhoisService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 写入系统日志
   *
   * @param level 日志级别
   * @param data 日志内容
   * @throws {FailedException} 写入系统日志失败
   */
  async write(level: SystemLogLevel, data: CreateSystemLogPayload) {
    try {
      const log = new SystemLogEntity()

      log.level = level
      log.type = data.type || SystemLogType.SYSTEM
      log.module = data.module
      log.content = data.content

      if (log.type === SystemLogType.ADMIN) {
        const user = this.cls.get<ISystemLoginSignData['user']>(REQUEST_ADMIN_KEY)
        const agent = this.cls.get<string>(REQUEST_AGENT_KEY)
        const ip = this.cls.get<string>(REQUEST_IP_KEY)
        const ua = new UAParser(agent).getResult()
        const whois = await this.whois.search(ip)

        log.userId = user ? user.id : data.userId || 0
        log.device = ua.os.name ? `${ua.os.name} | ${ua.browser.name}` : '未知'
        log.ip = `${ip} (${whois.region})`
      }

      await this.repo.create(log)
    }
    catch (e) {
      throw new FailedException('写入系统日志', e.message)
    }
  }
}
