import {
  type IApiPaginationData,
  type IMemberLogout,
  type IMemberLogoutStatus,
  MemberLogoutStatus,
} from '@xiaoshop/schema'
import { Between, FindOptionsWhere, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberLogout } from '@/member/logout/entity'
import { GetMemberLogoutPagesRequest } from '@/member/logout/dto'
import { FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class MemberLogoutService {
  constructor(
    @InjectRepository(MemberLogout)
    private readonly repository: Repository<MemberLogout>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取会员注销申请分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberLogout>>
   * @throws {FailedException} 获取会员注销申请分页列表失败
   */
  async findPages(
    query: GetMemberLogoutPagesRequest,
  ): Promise<IApiPaginationData<IMemberLogout>> {
    try {
      const where: FindOptionsWhere<IMemberLogout> = {}

      if (query.username)
        where.username = query.username
      if (query.mobile)
        where.mobile = query.mobile
      if (query.nickname)
        where.nickname = query.nickname
      if (query.status)
        where.status = query.status
      if (query.source)
        where.source = query.source

      if (query.createdTime) {
        const [from, to] = query.createdTime.split(',')
        where.createdTime = Between(`${from} 00:00:00`, `${to} 23:59:59`)
      }

      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        where,
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          createdTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员注销申请分页列表', e.message)
    }
  }

  /**
   * 获取审核通过会员注销申请列表
   *
   * @returns Promise<IMemberLogout[]>
   * @throws {FailedException} 获取会员注销申请列表失败
   */
  async findApproveList(): Promise<IMemberLogout[]> {
    try {
      return await this.repository.findBy({ status: MemberLogoutStatus.APPROVED })
    }
    catch (e) {
      throw new FailedException('获取会员注销申请列表', e.message)
    }
  }

  /**
   * 获取会员注销申请详情
   *
   * @param id 会员注销申请 ID
   * @returns Promise<IMemberLogout>
   * @throws {NotFoundException} 未找到会员注销申请
   * @throws {FailedException} 获取会员注销申请详情失败
   */
  async findDetail(id: number): Promise<IMemberLogout> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员注销申请')

      return await this.repository.findOneBy({ id })
    }
    catch (e) {
      throw new FailedException('获取会员注销申请详情', e.message, e.status)
    }
  }

  /**
   * 更新会员注销申请状态
   *
   * @param id 会员注销申请 ID
   * @param status 申请状态
   * @throws {NotFoundException} 会员注销申请不存在
   * @throws {FailedException} 更新会员注销申请状态失败
   */
  async updateStatus(id: number, status: IMemberLogoutStatus) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('会员注销申请不存在')

      await this.repository.update(id, { status })
      await this.log.write('会员管理', `更新会员注销申请「${id}」的状态为「${status === MemberLogoutStatus.APPROVED ? '审核通过' : '拒绝'}」`)
    }
    catch (e) {
      throw new FailedException('更新会员注销申请状态', e.message, e.status)
    }
  }
}
