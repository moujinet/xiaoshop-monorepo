import type { IMemberTagRepository } from '@/member/tag/model/interface'
import type { IMemberCardRepository } from '@/member/card/model/Card/interface'
import type { IMemberAccountRepository } from '@/member/account/model/account/interface'
import type { IMemberProfileRepository, IMemberProfileWhere } from '@/member/account/model/profile/interface'

import { Like } from 'typeorm'
import { isStrongPassword } from 'class-validator'
import { Inject, Injectable } from '@nestjs/common'
import {
  type IApiPaginationData,
  type IMemberProfileInfo,
  type IMemberProfileList,
  MemberStatus,
} from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { MemberTagRepo } from '@/member/tag/model/provider'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { toBetweenDate, toBetweenNumber } from '~/utils/typeorm'
import { CreateMemberPayload } from '@/member/account/dto/payload'
import { MemberCardRepo } from '@/member/card/model/card/provider'
import { GetMemberPagesRequest } from '@/member/account/dto/request'
import { MemberBindService } from '@/member/card/domain/bind/service'
import { MemberProfileRepo } from '@/member/account/model/profile/provider'
import { MemberAccountRepo } from '@/member/account/model/account/provider'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'
import { toMemberProfileInfo, toMemberProfileList } from '@/member/account/model/profile/mapper'
import { BadRequestException, ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { MemberBlockEvent, MemberCreateEvent, MemberPasswordResetEvent, MemberRecoverEvent } from './events'

type IPasswordStrength = 'number' | 'lower' | 'upper' | 'symbol'

@Injectable()
export class MemberService {
  constructor(
    @MemberProfileRepo()
    private readonly profile: IMemberProfileRepository,

    @MemberAccountRepo()
    private readonly account: IMemberAccountRepository,

    @MemberCardRepo()
    private readonly card: IMemberCardRepository,

    @MemberTagRepo()
    private readonly tag: IMemberTagRepository,

    @Inject(MemberBindService)
    private readonly bindCard: MemberBindService,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取会员信息分页列表
   *
   * @param query 查询条件
   * @returns 会员信息分页列表
   * @throws {FailedException} 获取会员信息分页列表失败
   */
  async findPages(
    query: GetMemberPagesRequest,
  ): Promise<IApiPaginationData<IMemberProfileList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      const where: IMemberProfileWhere = {}

      if (query.source)
        where.source = query.source

      if (query.status)
        where.status = query.status

      if (query.username)
        where.username = Like(`%${query.username}%`)

      if (query.nickname)
        where.nickname = Like(`%${query.nickname}%`)

      if (query.mobile)
        where.mobile = Like(`%${query.mobile}%`)

      if (query.gender)
        where.gender = query.gender

      if (query.groupId)
        where.groupId = query.groupId

      if (query.tagId)
        where.tags = { id: query.tagId }

      if (query.cardId)
        where.cardId = query.cardId

      if (query.points)
        where.account = { key: 'points', value: toBetweenNumber(query.points) }

      if (query.exp)
        where.account = { key: 'exp', value: toBetweenNumber(query.exp) }

      if (query.balance)
        where.account = { key: 'balance', value: toBetweenNumber(query.balance) }

      if (query.orderCount)
        where.orderCount = toBetweenNumber(query.orderCount)

      if (query.orderAmount)
        where.orderAmount = toBetweenNumber(query.orderAmount)

      if (query.checkInTimes)
        where.checkInTimes = toBetweenNumber(query.checkInTimes)

      if (query.checkInDays)
        where.checkInDays = toBetweenNumber(query.checkInDays)

      if (query.lastLoginTime)
        where.lastLoginTime = toBetweenDate(query.lastLoginTime)

      if (query.createdTime)
        where.createdTime = toBetweenDate(query.createdTime)

      return await this.profile.findAndCount(where, page, pagesize).then(
        ({ list, total, page, pagesize }) => ({
          list: toMemberProfileList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取会员信息分页列表', e.message)
    }
  }

  /**
   * 获取会员信息详情
   *
   * @param id 会员信息 ID
   * @returns 获取会员信息详情失败
   */
  async findById(id: number): Promise<IMemberProfileInfo> {
    try {
      const profile = await this.profile.findOne({ id })

      if (!profile)
        throw new NotFoundException('会员信息')

      return toMemberProfileInfo(profile)
    }
    catch (e) {
      throw new FailedException('获取会员信息详情', e.message, e.code)
    }
  }

  /**
   * 创建会员信息
   *
   * @param data 创建数据
   * @throws {FailedException} 创建会员信息失败
   * @throws {ExistsException} 会员信息已存在
   * @throws {BadRequestException} 密码强度过低
   */
  async create(data: CreateMemberPayload) {
    try {
      if (await this.profile.exists([
        { username: data.username.trim() },
        { mobile: data.mobile.trim() },
      ])) {
        throw new ExistsException('会员信息')
      }

      if (await this.validatePassword(data.password.trim()))
        throw new BadRequestException('密码强度过低')

      // 默认头像
      const defaultAvatar = await this.setting.findValue('member.defaults.avatar')

      const member = await this.profile.create({
        username: data.username,
        nickname: data.nickname,
        mobile: data.mobile,
        password: data.password,
        gender: data.gender,
        location: data.location,
        avatar: defaultAvatar,
        tags: data.tagIds
          ? data.tagIds.map((id) => {
            return this.tag.newEntity({ id })
          })
          : [],
      })

      // 默认会员等级
      const defaultCardId = await this.setting.findValue<number>('member.defaults.cardId')

      if (defaultCardId) {
        const defaultCard = await this.card.findById(defaultCardId)

        if (defaultCard) {
          const bindCard = await this.bindCard.binding(defaultCard, {
            memberId: member.id,
            cardId: defaultCardId,
          })

          if (!bindCard.id)
            throw new FailedException('设置会员等级')

          await this.profile.update(member, { cardId: bindCard.id })
        }
      }

      // 创建账户
      for (const key of ['exp', 'points', 'balance'] as const) {
        await this.account.create({
          memberId: member.id,
          key,
          value: 0,
        })
      }

      this.event.emit(
        new MemberCreateEvent(member.id, member.username),
      )
    }
    catch (e) {
      throw new FailedException('创建会员信息', e.message, e.code)
    }
  }

  /**
   * 设置会员标签
   *
   * @param ids 会员 ID 列表
   * @param tagIds 标签 ID 列表
   * @throws {FailedException} 设置会员标签失败
   */
  async updateTags(ids: number[], tagIds: number[]) {
    try {
      const tags = tagIds
        ? tagIds.map((id) => {
          return this.tag.newEntity({ id })
        })
        : []

      for (const id of ids) {
        const profile = await this.profile.findOne({ id }, ['id', 'tags'])
        await this.profile.update(profile, { tags })
      }
    }
    catch (e) {
      throw new FailedException('设置会员标签', e.message)
    }
  }

  /**
   * 更新会员状态
   *
   * @param id 会员 ID
   * @param status 会员状态
   * @throws {FailedException} 更新会员状态失败
   * @throws {NotFoundException} 会员信息不存在
   */
  async updateStatus(id: number, status: MemberStatus) {
    try {
      const profile = await this.profile.findOne({
        id,
      }, ['id', 'status', 'username'])

      if (!profile)
        throw new NotFoundException('会员信息')

      if (profile.status === status)
        return

      const isNormal = profile.status === MemberStatus.NORMAL

      await this.profile.update(profile, {
        status: isNormal ? MemberStatus.BLOCKED : MemberStatus.NORMAL,
      })

      const EventName = isNormal ? MemberBlockEvent : MemberRecoverEvent

      this.event.emit(
        new EventName(profile.id, profile.username),
      )
    }
    catch (e) {
      throw new FailedException('更新会员状态', e.message)
    }
  }

  /**
   * 重置会员密码
   *
   * @param id 会员 ID
   * @param password 重置密码
   * @throws {FailedException} 重置会员密码失败
   * @throws {NotFoundException} 会员信息不存在
   * @throws {BadRequestException} 密码强度过低
   */
  async resetPassword(id: number, password: string) {
    try {
      const profile = await this.profile.findOne({
        id,
      }, ['id', 'status', 'salt', 'username', 'password'])

      if (!profile)
        throw new NotFoundException('会员信息')

      if (profile.status !== MemberStatus.NORMAL)
        return

      if (await this.validatePassword(password.trim()))
        throw new BadRequestException('密码强度过低')

      await this.profile.update(profile, { password })

      this.event.emit(
        new MemberPasswordResetEvent(profile.id, profile.username),
      )
    }
    catch (e) {
      throw new FailedException('重置会员密码', e.message, e.code)
    }
  }

  /**
   * 验证密码强度
   *
   * @param password 密码
   * @returns 验证结果
   */
  async validatePassword(password: string): Promise<boolean> {
    try {
      const minLength = await this.setting.findValue<number>('member.security.passwordLength')
      const s = await this.setting.findValue<IPasswordStrength[]>('member.security.passwordStrength')

      return isStrongPassword(password, {
        minLength,
        minNumbers: s.includes('number') ? 1 : undefined,
        minSymbols: s.includes('symbol') ? 1 : undefined,
        minLowercase: s.includes('lower') ? 1 : undefined,
        minUppercase: s.includes('upper') ? 1 : undefined,
      })
    }
    catch (e) {
      throw new FailedException('密码验证', e.message)
    }
  }
}
