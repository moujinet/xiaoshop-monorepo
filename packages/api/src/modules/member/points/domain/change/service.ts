import type { IApiPaginationData, IMemberPointsChangeList } from '@xiaoshop/shared'
import type { IMemberPointsChangeRepository, IMemberPointsChangeWhere } from '@/member/points/model/change/interface'

import { Injectable } from '@nestjs/common'

import { toBetweenDate } from '~/utils/typeorm'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { FailedException } from '~/common/exceptions'
import { MemberPointsChangeRepo } from '@/member/points/model/change/provider'
import { GetMemberPointsChangePagesRequest } from '@/member/points/dto/request'

@Injectable()
export class MemberPointsChangeService {
  constructor(
    @MemberPointsChangeRepo()
    private readonly repo: IMemberPointsChangeRepository,
  ) {}

  /**
   * 获取会员积分变动分页列表
   *
   * @param query 查询条件
   * @returns 会员积分变动分页列表
   * @throws {FailedException} 获取会员积分变动分页列表失败
   */
  async findPages(
    query: GetMemberPointsChangePagesRequest,
  ): Promise<IApiPaginationData<IMemberPointsChangeList>> {
    try {
      const where: IMemberPointsChangeWhere = {}

      if (query.createdTime)
        where.createdTime = toBetweenDate(query.createdTime)

      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(where, page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取会员积分变动分页列表', e.message)
    }
  }

  /**
   * 记录会员积分变动
   *
   * @param memberId 会员 ID
   * @param points 变动积分
   * @param reason 变动原因
   * @throws {FailedException} 记录会员积分变动失败
   * @throws {ExistsException} 会员积分变动已存在
   */
  async create(memberId: number, points: number, reason: string) {
    try {
      await this.repo.create({ memberId, points, reason })
    }
    catch (e) {
      throw new FailedException('记录会员积分变动', e.message, e.code)
    }
  }
}
