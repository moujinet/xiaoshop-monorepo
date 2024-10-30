import type { IApiPaginationData, IMemberInviteList } from '@xiaoshop/shared'
import type { IMemberInviteRepository, IMemberInviteWhere } from '@/member/invite/model/interface'

import { Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { FailedException } from '~/common/exceptions'
import { MemberInviteRepo } from '@/member/invite/model/provider'
import { toMemberInviteList } from '@/member/invite/model/mapper'
import { GetMemberInvitePagesRequest } from '@/member/invite/dto/request'

@Injectable()
export class MemberInviteQueryService {
  constructor(
    @MemberInviteRepo()
    private readonly repo: IMemberInviteRepository,
  ) {}

  /**
   * 获取会员邀请记录分页列表
   *
   * @param query 查询条件
   * @returns 会员邀请记录分页列表
   * @throws {FailedException} 获取会员邀请记录分页列表失败
   */
  async findPages(
    query: GetMemberInvitePagesRequest,
  ): Promise<IApiPaginationData<IMemberInviteList>> {
    try {
      const where: IMemberInviteWhere = {
        memberId: query.memberId,
      }

      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(where, page, pagesize).then(
        ({ list, total, page, pagesize }) => ({
          list: toMemberInviteList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取会员邀请记录分页列表', e.message)
    }
  }
}
