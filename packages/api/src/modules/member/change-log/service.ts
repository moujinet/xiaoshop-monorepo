import type {
  IApiPaginationData,
  IMemberAccountChangeLogListItem,
  IMemberAccountChangeLogMemberListItem,
  IMemberAccountKeys,
  MemberAccountChangeType,
} from '@xiaoshop/shared'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { MemberAccountChangeLog } from '@/member/change-log/entity'
import {
  GetAllMemberAccountChangeLogPagesRequest,
  GetMemberAccountChangeLogPagesRequest,
} from '@/member/change-log/dto'
import { FailedException } from '~/common/exceptions'

@Injectable()
export class MemberAccountChangeLogService {
  constructor(
    @InjectRepository(MemberAccountChangeLog)
    private readonly repository: Repository<MemberAccountChangeLog>,
  ) {}

  /**
   * 获取全部会员账户变化分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberAccountChangeLogListItem>>
   * @throws {FailedException} 获取会员账户变化分页列表失败
   */
  async findPages(
    query: GetAllMemberAccountChangeLogPagesRequest,
  ): Promise<IApiPaginationData<IMemberAccountChangeLogListItem>> {
    try {
      const where: FindOptionsWhere<MemberAccountChangeLog> = {}

      if (query.type)
        where.type = query.type

      if (query.key)
        where.key = query.key

      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          type: true,
          key: true,
          member: {
            id: true,
            status: true,
            tags: { id: true, color: true, name: true },
            group: { id: true, name: true },
            card: {
              id: true,
              key: true,
              name: true,
              cardId: true,
              cardType: true,
              cardStyle: { icon: true, textColor: true, bgColor: true, bgImage: true },
              badgeStyle: { icon: true, textColor: true, bgColor: true },
              discount: true,
              pointsRatio: true,
              needExp: true,
              nextLevelExp: true,
              freeShipping: true,
              upgradeable: true,
              times: true,
              dueTime: true,
            },
            cardNo: true,
            avatar: true,
            nickname: true,
            gender: true,
            birthday: true,
            location: true,
          },
          value: true,
          reason: true,
          createdTime: true,
        },
        where,
        order: {
          createdTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员账户变化分页列表', e.message)
    }
  }

  /**
   * 获取会员账户变化分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberAccountChangeLogMemberListItem>>
   * @throws {FailedException} 获取会员账户变化分页列表失败
   */
  async findMemberPages(
    query: GetMemberAccountChangeLogPagesRequest,
  ): Promise<IApiPaginationData<IMemberAccountChangeLogMemberListItem>> {
    try {
      const where: FindOptionsWhere<MemberAccountChangeLog> = {
        memberId: query.memberId,
      }

      if (query.type)
        where.type = query.type

      if (query.key)
        where.key = query.key

      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'key', 'type', 'value', 'reason', 'createdTime'],
        where,
        order: {
          createdTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员账户变化分页列表', e.message)
    }
  }

  /**
   * 创建会员账户变化日志
   *
   * @param memberId 会员 ID
   * @param key 会员账户
   * @param type 变更类型
   * @param value 变更值
   * @param reason 变更原因
   * @throws {FailedException} 创建会员账户变化日志失败
   */
  async create(
    memberId: number,
    key: IMemberAccountKeys,
    type: MemberAccountChangeType,
    value: number,
    reason: string,
  ) {
    try {
      const log = new MemberAccountChangeLog()

      log.memberId = memberId
      log.key = key
      log.type = type
      log.value = value
      log.reason = reason

      await this.repository.save(log)
    }
    catch (e) {
      throw new FailedException('创建会员账户变化日志', e.message)
    }
  }
}
