import { type IApiPaginationData, type IMemberLogout, MemberLogoutStatusEnum } from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MemberLogout } from '@/member/logout/entity'
import { MEMBER_EVENT_LOGOUT } from '@/member/constants'
import { MemberLogoutEvent } from '@/member/logout/events'
import { GetMemberLogoutPagesRequest, MemberLogoutPayload } from '@/member/logout/dto'
import { SettingsService } from '@/settings/settings.service'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { useQueryPagination } from '~/hooks/pagination'

@Injectable()
export class MemberLogoutService {
  constructor(
    @InjectRepository(MemberLogout)
    private readonly repository: Repository<MemberLogout>,

    @Inject(SettingsService)
    private readonly settings: SettingsService,

    private emitter: EventEmitter2,
  ) {}

  /**
   * 获取会员注销申请列表
   *
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IMemberLogout[]>>
   * @see {@link IMemberLogout}
   */
  async findPages(query: GetMemberLogoutPagesRequest): Promise<IApiPaginationData<IMemberLogout>> {
    try {
      const entity = this.repository.createQueryBuilder('entity')

      if (query.status)
        entity.andWhere('entity.status = :status', { status: query.status })

      if (query.source)
        entity.andWhere('entity.source = :source', { source: query.source })

      if (query.username)
        entity.andWhere('entity.username LIKE :username', { username: `%${query.username}%` })

      if (query.nickname)
        entity.andWhere('entity.nickname LIKE :nickname', { nickname: `%${query.nickname}%` })

      if (query.mobile)
        entity.andWhere('entity.mobile = :mobile', { mobile: query.mobile })

      entity.orderBy('entity.createdTime', 'DESC')

      return await useQueryPagination<IMemberLogout>(entity, query.page || 1, query.pagesize || 10)
    }
    catch (e) {
      throw new FailedException('获取会员注销申请列表', e.message)
    }
  }

  /**
   * 获取会员注销申请详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IMemberLogout>
   * @see {@link IMemberLogout}
   */
  async findDetail(id: number): Promise<IMemberLogout> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('会员注销申请')

      return detail
    }
    catch (e) {
      throw new FailedException('获取会员注销申请详情', e.message, e.status)
    }
  }

  /**
   * 创建会员注销申请
   *
   * @param data MemberLogoutPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link MemberLogoutPayload}
   */
  async create(data: MemberLogoutPayload) {
    try {
      const enabled = await this.settings.get('member.logout.enable', true)

      if (!enabled)
        throw new FailedException('会员注销功能已关闭')

      const exists = await this.repository.existsBy({
        memberId: data.memberId,
      })

      if (exists)
        throw new ExistsException(`会员注销申请 [${data.username}] `)

      const apply = new MemberLogout()

      apply.memberId = data.memberId
      apply.status = MemberLogoutStatusEnum.PENDING
      apply.source = data.source
      apply.username = data.username
      apply.nickname = data.nickname
      apply.mobile = data.mobile
      apply.reason = data.reason

      await this.repository.save(apply)
    }
    catch (e) {
      throw new FailedException('创建会员注销申请', e.message, e.status)
    }
  }

  /**
   * 会员注销申请审批
   *
   * @param {number} id
   */
  async approve(id: number) {
    try {
      const enableAudit = await this.settings.get('member.logout.audit.enable', true)

      if (!enableAudit)
        throw new FailedException('会员注销审核功能已关闭')

      const apply = await this.findDetail(id)

      if (!apply)
        throw new NotFoundException('会员注销申请')

      if (apply.status === MemberLogoutStatusEnum.PENDING) {
        await this.repository.update(id, { status: MemberLogoutStatusEnum.LOGOUT })

        const event = new MemberLogoutEvent()

        event.memberId = apply.memberId
        event.username = apply.username
        event.nickname = apply.nickname
        event.mobile = apply.mobile
        event.reason = apply.reason

        this.emitter.emit(MEMBER_EVENT_LOGOUT, event)
      }
    }
    catch (e) {
      throw new FailedException('会员注销申请审批', e.message, e.status)
    }
  }

  /**
   * 注销会员
   *
   * @param memberId number
   */
  // async logoutMember(memberId: number) {
  //   // TODO
  // }
}
