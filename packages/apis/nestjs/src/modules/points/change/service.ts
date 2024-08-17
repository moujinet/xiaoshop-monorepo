import {
  type IApiPaginationData,
  type IPointsChangeLogListItem,
  type IPointsChangeType,
  PointsChangeType,
} from '@xiaoshop/schema'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Repository } from 'typeorm'
import { PointsChangeLog } from '@/points/change/entity'
import { PointsChangeEvent } from '@/points/change/events'
import { MemberAccountService } from '@/member/account/service'
import { GetMemberPointsChangeLogPagesRequest } from '@/points/change/dto'
import { FailedException } from '~/common/exception'

@Injectable()
export class PointsChangeService {
  constructor(
    @InjectRepository(PointsChangeLog)
    private readonly repository: Repository<PointsChangeLog>,

    @Inject(MemberAccountService)
    private readonly memberAccountService: MemberAccountService,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 获取会员积分变更日志
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IPointsChangeLogListItem>>
   * @throws {FailedException} 获取会员积分变更日志
   */
  async findPages(
    query: GetMemberPointsChangeLogPagesRequest,
  ): Promise<IApiPaginationData<IPointsChangeLogListItem>> {
    try {
      const where: FindOptionsWhere<PointsChangeLog> = {}

      if (query.memberId)
        where.memberId = query.memberId

      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          member: {
            id: true,
            status: true,
            cardNo: true,
            gender: true,
            avatar: true,
            nickname: true,
            location: true,
            tags: { id: true, name: true },
            group: { id: true, name: true },
            card: {
              id: true,
              cardId: true,
              planId: true,
              name: true,
              type: true,
              badgeStyles: { icon: true, textColor: true, bgColor: true },
            },
          },
          type: true,
          change: true,
          reason: true,
          createdTime: true,
        },
        where,
        relations: ['member', 'member.card', 'member.group', 'member.tags'],
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          createdTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员积分变更日志', e.message)
    }
  }

  /**
   * 更新会员积分
   *
   * @param type 变化类型
   * @param memberId 会员 ID
   * @param change 积分变化
   * @param reason 变化原因
   * @param isSystem 是否是系统操作
   * @throws {NotFoundException} 未找到会员账户
   * @throws {FailedException} 获取会员账户失败
   * @throws {FailedException} 更新会员积分失败
   * @event PointsChangeEvent 会员积分变更事件
   */
  async updatePoints(
    type: IPointsChangeType,
    memberId: number,
    change: number,
    reason: string,
    isSystem: boolean = false,
  ) {
    try {
      const accounts = await this.memberAccountService.findMemberAccount(memberId)

      const points = type === PointsChangeType.ADD
        ? accounts.points + change
        : type === PointsChangeType.DEDUCT
          ? accounts.points - change
          : change

      await this.memberAccountService.updateMemberAccount(
        memberId,
        'points',
        points,
      )

      await this.repository.insert({
        memberId,
        type,
        change,
        points,
        reason,
      })

      await this.eventEmitter.emitAsync(
        PointsChangeEvent.name,
        new PointsChangeEvent(memberId, type, change, points, reason, isSystem),
      )
    }
    catch (e) {
      throw new FailedException('更新会员积分', e.message, e.status)
    }
  }

  /**
   * 增加会员积分
   *
   * @param memberId 会员 ID
   * @param change 积分变化
   * @param reason 变化原因
   *
   * @see {updatePoints}
   */
  async addPoints(memberId: number, change: number, reason: string) {
    await this.updatePoints(PointsChangeType.ADD, memberId, change, reason, true)
  }

  /**
   * 扣除会员积分
   *
   * @param memberId 会员 ID
   * @param change 积分变化
   * @param reason 变化原因
   *
   * @see {updatePoints}
   */
  async deductPoints(memberId: number, change: number, reason: string) {
    await this.updatePoints(PointsChangeType.DEDUCT, memberId, change, reason, true)
  }

  /**
   * 变更会员积分
   *
   * @param memberId 会员 ID
   * @param change 积分变化
   * @param reason 变化原因
   *
   * @see {updatePoints}
   */
  async setPoints(memberId: number, change: number, reason: string) {
    await this.updatePoints(PointsChangeType.SET, memberId, change, reason, true)
  }
}
