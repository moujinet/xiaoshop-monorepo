import type { IMemberLogType } from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberLog } from '@/member/log/entity'
import { MemberLogPayload } from '@/member/log/dto'
import { Member } from '@/member/account/entities/profile.entity'
import { FailedException } from '~/common/exception'

@Injectable()
export class MemberLogService {
  constructor(
    @InjectRepository(MemberLog)
    private readonly repository: Repository<MemberLog>,
  ) {}

  /**
   * 写入会员日志
   *
   * @param {IMemberLogType} type
   * @param {MemberLogPayload} data
   * @param {string} ipAddress
   */
  async writeLog(
    type: IMemberLogType,
    data: MemberLogPayload,
    ipAddress?: string,
  ) {
    try {
      const log = new MemberLog()
      const member = new Member()
      member.id = data.memberId

      log.member = member
      log.type = type
      log.source = data.source
      log.action = data.action
      log.content = data.content
      log.extra = data.extra
        ? { ...data.extra, ipAddress: ipAddress || '' }
        : { ipAddress: ipAddress || '' }

      await this.repository.save(log)
    }
    catch (e) {
      throw new FailedException('写入会员日志', e.message)
    }
  }
}
