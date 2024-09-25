import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  type IApiPaginationData,
  type IMemberCardUpgradeList,
  MemberCardUpgradeMethod,
} from '@xiaoshop/shared'

import { FailedException } from '~/common/exceptions'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { objectToDict, pipeDict } from '~/utils/transformers'
import { MEMBER_CARD_TYPES, MEMBER_CARD_UPGRADE_METHODS } from '~/common/dicts'

import { MemberCardUpgrade } from './entity'
import { GetMemberCardUpgradePagesRequest, MemberCardUpgradePayload } from './dto'

@Injectable()
export class MemberCardUpgradeService {
  constructor(
    @InjectRepository(MemberCardUpgrade)
    private readonly repository: Repository<MemberCardUpgrade>,
  ) {}

  /**
   * 获取会员升级记录列表
   *
   * @param query 查询条件
   * @returns 会员升级记录列表
   * @throws {FailedException} 获取会员升级记录列表失败
   */
  async findPages(
    query: GetMemberCardUpgradePagesRequest,
  ): Promise<IApiPaginationData<IMemberCardUpgradeList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repository.findAndCount({
        select: ['id', 'method', 'key', 'type', 'name', 'badgeStyle', 'reason', 'createdTime'],
        where: {
          memberId: query.memberId,
        },
        order: {
          createdTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return {
        result: pipeDict(list, [
          row => objectToDict(row, 'method', MEMBER_CARD_UPGRADE_METHODS),
          row => objectToDict(row, 'type', MEMBER_CARD_TYPES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取会员升级记录列表', e.message)
    }
  }

  /**
   * 创建会员升级记录
   *
   * @param data 会员升级信息
   * @throws {FailedException} 写入会员升级记录失败
   */
  async record(data: MemberCardUpgradePayload) {
    try {
      const upgrade = new MemberCardUpgrade()

      upgrade.memberId = data.memberId
      upgrade.cardId = data.cardId
      upgrade.cardPlanId = data.cardPlanId
      upgrade.key = data.key
      upgrade.type = data.type
      upgrade.name = data.name
      upgrade.badgeStyle = data.badgeStyle
      upgrade.method = data.method || MemberCardUpgradeMethod.UPGRADE
      upgrade.reason = data.reason || ''

      await this.repository.save(upgrade)
    }
    catch (e) {
      throw new FailedException('写入会员升级记录', e.message)
    }
  }
}
