import type { IMemberUnregisterRepository, IMemberUnregisterWhere } from '@/member/unregister/model/interface'

import { Like } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import {
  type IApiPaginationData,
  type IMemberUnregisterInfo,
  type IMemberUnregisterList,
  MemberUnregisterStatus,
} from '@xiaoshop/shared'

import { toBetweenDate } from '~/utils/typeorm'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { MemberUnregisterRepo } from '@/member/unregister/model/provider'
import { AuditMemberUnregisterPayload } from '@/member/unregister/dto/payload'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'
import { GetMemberUnregisterPagesRequest } from '@/member/unregister/dto/request'
import { toMemberUnregisterInfo, toMemberUnregisterList } from '@/member/unregister/model/mapper'

import { MemberUnregisterApproveEvent, MemberUnregisterRejectEvent } from './events'

@Injectable()
export class MemberUnregisterAuditService {
  constructor(
    @MemberUnregisterRepo()
    private readonly repo: IMemberUnregisterRepository,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取会员注销信息分页列表
   *
   * @param query 查询条件
   * @returns 会员注销信息分页列表
   * @throws {FailedException} 获取会员注销信息分页列表失败
   */
  async findPages(
    query: GetMemberUnregisterPagesRequest,
  ): Promise<IApiPaginationData<IMemberUnregisterList>> {
    try {
      const where: IMemberUnregisterWhere = {}

      if (query.username)
        where.username = Like(`%${query.username}%`)

      if (query.nickname)
        where.nickname = Like(`%${query.nickname}%`)

      if (query.mobile)
        where.mobile = Like(`%${query.mobile}%`)

      if (query.status)
        where.status = query.status

      if (query.applyTime)
        where.applyTime = toBetweenDate(query.applyTime)

      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(where, page, pagesize).then(
        ({ list, total, page, pagesize }) => ({
          list: toMemberUnregisterList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取会员注销信息分页列表', e.message)
    }
  }

  /**
   * 获取会员注销信息详情
   *
   * @param id 会员注销信息 ID
   * @returns 获取会员注销信息详情失败
   */
  async findById(id: number): Promise<IMemberUnregisterInfo> {
    try {
      const entity = await this.repo.findById(id)

      if (!entity)
        throw new NotFoundException('会员注销信息')

      return toMemberUnregisterInfo(entity)
    }
    catch (e) {
      throw new FailedException('获取会员注销信息详情', e.message, e.code)
    }
  }

  /**
   * 审批会员注销信息
   *
   * @param id 会员注销信息 ID
   * @param data 审批数据
   * @throws {FailedException} 审批会员注销信息失败
   * @throws {NotFoundException} 会员注销信息不存在
   */
  async audit(id: number, data: AuditMemberUnregisterPayload) {
    try {
      if (!this.isEnableAudit())
        return

      const entity = await this.repo.findById(id)

      if (!entity)
        throw new NotFoundException('会员注销信息')

      const updated = await this.repo.update(entity, data)

      const EventClass = data.status === MemberUnregisterStatus.APPROVED
        ? MemberUnregisterApproveEvent
        : MemberUnregisterRejectEvent

      this.event.emit(
        new EventClass(
          updated.id,
          updated.memberId,
          updated.username,
          updated.auditReason,
        ),
      )
    }
    catch (e) {
      throw new FailedException('审批会员注销信息', e.message, e.code)
    }
  }

  /**
   * 是否开启审核
   *
   * @returns 是否开启审核
   */
  async isEnableAudit(): Promise<boolean> {
    const options = await this.setting.find('member.unregister.*')

    return options['member.unregister.enable']
      && options['member.unregister.audit.enable']
  }
}
