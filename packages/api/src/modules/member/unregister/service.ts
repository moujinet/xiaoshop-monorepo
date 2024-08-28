import type {
  IApiPaginationData,
  IMemberUnregister,
} from '@xiaoshop/shared'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm'
import { GetMemberUnregisterPagesRequest } from '@/member/unregister/dto'
import { MemberUnregister } from '@/member/unregister/entity'
import { FailedException } from '~/common/exceptions'

@Injectable()
export class MemberUnregisterService {
  constructor(
    @InjectRepository(MemberUnregister)
    private readonly repository: Repository<MemberUnregister>,
  ) {}

  /**
   * 获取会员注销申请分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberUnregister>>
   * @throws {FailedException} 获取会员注销申请分页列表失败
   */
  async findPages(
    query: GetMemberUnregisterPagesRequest,
  ): Promise<IApiPaginationData<IMemberUnregister>> {
    try {
      const where: FindOptionsWhere<MemberUnregister> = {}

      if (query.username)
        where.username = Like(`%${query.username}%`)
      else if (query.mobile)
        where.mobile = Like(`%${query.mobile}%`)
      else if (query.nickname)
        where.nickname = Like(`%${query.nickname}%`)

      if (query.status)
        where.status = query.status

      if (query.source)
        where.source = query.source

      if (query.createdTime) {
        const [from, to] = query.createdTime.split(',')
        where.createdTime = Between(`${from} 00:00:00`, `${to} 23:59:59`)
      }

      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        where,
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          createdTime: 'DESC',
        },
      })

      return { result, total, pagesize, page }
    }
    catch (e) {
      throw new FailedException('获取会员注销申请分页列表', e.message)
    }
  }
}
