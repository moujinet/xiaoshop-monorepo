import {
  type IApiPaginationData,
  type IMemberAccountKeys,
  type IMemberAccountListItem,
  IMemberAccountNotificationInfo,
  type IMemberAccountValues,
  type IMemberGroupCondition,
  type IMemberProfile,
  MEMBER_DEFAULT_PASSWORD,
  MemberAccountChangeType,
  MemberGender,
  MemberGroupCondKey,
  MemberGroupCondOperator,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/shared'
import * as bcrypt from 'bcrypt'
import { Between, FindOptionsWhere, In, Like, Not, Repository } from 'typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isStrongPassword } from 'class-validator'
import { MemberTag } from '@/member/tag/entity'
import { SettingsService } from '@/settings/service'
import { MemberAccount } from '@/member/account/entity'
import { MemberBindingService } from '@/member/binding/service'
import {
  MemberAccountChangedEvent,
  MemberCreatedEvent,
  MemberPasswordResetEvent,
  MemberStatusChangedEvent,
  MemberTagsChangedEvent,
} from '@/member/account/events'
import {
  GetMemberAccountPagesRequest,
  MemberAccountPayload,
} from '@/member/account/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class MemberAccountService {
  constructor(
    @InjectRepository(MemberAccount)
    private readonly repository: Repository<MemberAccount>,

    @Inject(MemberBindingService)
    private readonly memberBinding: MemberBindingService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取会员分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberAccountListItem>>
   * @throws {FailedException} 获取会员分页列表失败
   */
  async findPages(
    query: GetMemberAccountPagesRequest,
  ): Promise<IApiPaginationData<IMemberAccountListItem>> {
    try {
      const where: FindOptionsWhere<MemberAccount> = {}

      if (query.source)
        where.source = query.source
      if (query.status)
        where.status = query.status
      if (query.username)
        where.username = query.username
      if (query.nickname)
        where.nickname = query.nickname
      if (query.cardNo)
        where.cardNo = Like(`%${query.cardNo}%`)
      if (query.mobile)
        where.mobile = Like(`%${query.mobile}%`)
      if (query.gender)
        where.gender = query.gender
      if (query.groupId)
        where.groupId = query.groupId
      if (query.tagId)
        where.tags = { id: query.tagId }
      if (query.cardId)
        where.card = { cardId: query.cardId }

      // 会员积分
      if (query.points) {
        const [min, max] = query.points.split(',').map(n => +n)
        where.points = Between(min, max)
      }

      // 成长值
      if (query.exp) {
        const [min, max] = query.exp.split(',').map(n => +n)
        where.exp = Between(min, max)
      }

      // 下单数量
      if (query.orders) {
        const [min, max] = query.orders.split(',').map(n => +n)
        where.orders = Between(min, max)
      }

      // 下单金额
      if (query.orderAmount) {
        const [min, max] = query.orderAmount.split(',').map(n => +n)
        where.orderAmount = Between(min, max)
      }

      // 最近登录时间
      if (query.lastLoginTime) {
        const [from, to] = query.lastLoginTime.split(',')
        where.lastLoginTime = Between(`${from} 00:00:00`, `${to} 23:59:59`)
      }

      // 注册时间
      if (query.createdTime) {
        const [from, to] = query.createdTime.split(',')
        where.createdTime = Between(`${from} 00:00:00`, `${to} 23:59:59`)
      }

      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          status: true,
          source: true,
          tags: { id: true, name: true, color: true },
          group: { id: true, name: true },
          card: {
            id: true,
            key: true,
            name: true,
            cardId: true,
            cardType: true,
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
          points: true,
          orders: true,
          orderAmount: true,
          lastLoginTime: true,
        },
        where,
        relations: ['tags', 'group', 'card'],
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          lastLoginTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员分页列表', e.message)
    }
  }

  /**
   * 获取会员资料
   *
   * @param id 会员 ID
   * @returns Promise<IMemberProfile>
   * @throws {NotFoundException} 未找到会员
   * @throws {FailedException} 获取会员资料失败
   */
  async findById(id: number): Promise<IMemberProfile> {
    try {
      const profile = await this.repository.findOne({
        select: {
          id: true,
          status: true,
          source: true,
          tags: { id: true, name: true, color: true },
          group: { id: true, name: true },
          card: {
            id: true,
            key: true,
            name: true,
            cardId: true,
            cardType: true,
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
          username: true,
          nickname: true,
          mobile: true,
          birthday: true,
          gender: true,
          location: true,
          exp: true,
          points: true,
          balance: true,
          orders: true,
          orderAmount: true,
          redPacket: true,
          coupon: true,
          createdTime: true,
          lastLoginTime: true,
          lastOrderTime: true,
          lastSignInTime: true,
        },
        where: { id },
        relations: ['tags', 'group', 'card'],
      })

      if (!profile)
        throw new NotFoundException('会员不存在')

      return profile
    }
    catch (e) {
      throw new FailedException('获取会员资料', e.message)
    }
  }

  /**
   * 获取会员联系信息
   *
   * @param id 会员 ID
   * @returns Promise<IMemberAccountNotificationInfo>
   * @throws {NotFoundException} 未找到会员
   */
  async findInfoById(id: number): Promise<IMemberAccountNotificationInfo> {
    try {
      const profile = await this.repository.findOne({
        select: ['nickname', 'mobile'],
        where: {
          id,
        },
      })

      if (!profile)
        throw new NotFoundException('会员不存在')

      return profile
    }
    catch (e) {
      throw new FailedException('获取会员昵称', e.message, e.status)
    }
  }

  /**
   * 获取会员账户信息
   *
   * @param id 会员 ID
   * @returns Promise<IMemberAccountValues>
   * @throws {NotFoundException} 未找到会员
   * @throws {FailedException} 获取会员账户信息失败
   */
  async findAccount(id: number): Promise<IMemberAccountValues> {
    try {
      const account = await this.repository.findOne({
        select: ['exp', 'points', 'balance', 'orders', 'orderAmount', 'redPacket', 'coupon', 'signInTimes', 'loginTimes'],
        where: {
          id,
        },
      })

      if (!account)
        throw new NotFoundException('会员不存在')

      return account
    }
    catch (e) {
      throw new FailedException('获取会员账户信息', e.message, e.status)
    }
  }

  /**
   * 创建会员
   *
   * @param data 创建会员资料
   * @throws {ExistsException} 会员已存在
   * @throws {FailedException} 密码强度不够
   * @throws {FailedException} 创建会员失败
   * @event MemberCreatedEvent
   */
  async createMember(data: MemberAccountPayload) {
    try {
      const exists = await this.repository.existsBy({
        username: data.username,
      }) || await this.repository.existsBy({
        mobile: data.mobile,
      })

      if (exists)
        throw new ExistsException('会员已存在')

      const member = new MemberAccount()

      member.source = MemberSource.MANUAL
      member.status = MemberStatus.NORMAL
      member.username = data.username
      member.nickname = data.nickname || data.username
      member.mobile = data.mobile || ''
      member.gender = data.gender || MemberGender.UNKNOWN
      member.location = data.location || []

      // 默认头像
      const defaultAvatar = await this.settings.findValueByKey('member.register.defaultAvatar') as string
      member.avatar = data.avatar || defaultAvatar

      // 默认账户
      member.points = data.points || 0

      // 会员标签
      if (data.tagIds && data.tagIds.length > 0) {
        member.tags = []

        for (const tagId of data.tagIds) {
          const tag = new MemberTag()
          tag.id = tagId

          member.tags.push(tag)
        }
      }

      // 密码处理
      member.salt = await bcrypt.genSalt()
      if (data.password) {
        const valid = await this.validateMemberPassword(data.password)

        if (!valid)
          throw new FailedException('密码强度不够')

        member.password = await bcrypt.hash(data.password, member.salt)
      }
      else {
        member.password = await bcrypt.hash(MEMBER_DEFAULT_PASSWORD, member.salt)
      }

      const created = await this.repository.save(member)

      this.event.emit(
        toEventName(MemberCreatedEvent.name),
        new MemberCreatedEvent(created.id, created.nickname),
      )

      // 绑定会员卡
      const binding = await this.memberBinding.bindMemberCard(
        created.id,
        data.cardId || 0,
        data.cardPlanId || 0,
      )

      if (binding) {
        await this.repository.update(created.id, {
          cardNo: binding.id.toString().padStart(8, '0'),
          cardId: binding.id,
        })
      }
    }
    catch (e) {
      throw new FailedException('创建会员', e.message, e.status)
    }
  }

  /**
   * 增加指定会员账户
   *
   * @param memberIds 会员 ID 数组
   * @param key 账户键
   * @param value 增加值
   * @param reason 增加原因
   * @param isSystem 是否为系统操作
   * @throws {FailedException} 更新会员账户失败
   * @event MemberAccountChangedEvent
   */
  async incrementMemberAccountByKey(
    memberIds: number[],
    key: IMemberAccountKeys,
    value: number,
    reason: string = '',
    isSystem = false,
  ) {
    try {
      await this.repository.increment({ id: In(memberIds) }, key, value)

      Promise.all(
        memberIds.map(async (memberId) => {
          const founded = await this.repository.findOneBy({ id: memberId })

          if (!founded)
            return

          return this.event.emit(
            toEventName(MemberAccountChangedEvent.name),
            new MemberAccountChangedEvent(
              memberId,
              founded.nickname,
              MemberAccountChangeType.ADD,
              key,
              value,
              reason,
              isSystem,
            ),
          )
        }),
      )
    }
    catch (e) {
      throw new FailedException('更新会员账户', e.message, e.status)
    }
  }

  /**
   * 减少指定会员账户
   *
   * @param memberIds 会员 ID 数组
   * @param key 账户键
   * @param value 减少值
   * @param reason 减少原因
   * @param isSystem 是否为系统操作
   * @throws {FailedException} 更新会员账户失败
   * @event MemberAccountChangedEvent
   */
  async decrementMemberAccountByKey(
    memberIds: number[],
    key: IMemberAccountKeys,
    value: number,
    reason: string = '',
    isSystem = false,
  ) {
    try {
      await this.repository.decrement({ id: In(memberIds) }, key, value)

      Promise.all(
        memberIds.map(async (memberId) => {
          const founded = await this.repository.findOneBy({ id: memberId })

          if (!founded)
            return

          return this.event.emit(
            toEventName(MemberAccountChangedEvent.name),
            new MemberAccountChangedEvent(
              memberId,
              founded.nickname,
              MemberAccountChangeType.SUB,
              key,
              value,
              reason,
              isSystem,
            ),
          )
        }),
      )
    }
    catch (e) {
      throw new FailedException('更新会员账户', e.message, e.status)
    }
  }

  /**
   * 更新指定会员账户
   *
   * @param memberIds 会员 ID 数组
   * @param key 账户键
   * @param value 更新值
   * @param reason 更新原因
   * @param isSystem 是否为系统操作
   * @throws {FailedException} 更新会员账户失败
   * @event MemberAccountChangedEvent
   */
  async updateMemberAccountByKey(
    memberIds: number[],
    key: IMemberAccountKeys,
    value: number,
    reason: string = '',
    isSystem = false,
  ) {
    try {
      await this.repository.update(memberIds, { [key]: value })

      Promise.all(
        memberIds.map(async (memberId) => {
          const founded = await this.repository.findOneBy({ id: memberId })

          if (!founded)
            return

          return this.event.emit(
            toEventName(MemberAccountChangedEvent.name),
            new MemberAccountChangedEvent(
              memberId,
              founded.nickname,
              MemberAccountChangeType.SET,
              key,
              value,
              reason,
              isSystem,
            ),
          )
        }),
      )
    }
    catch (e) {
      throw new FailedException('批量更新会员账户', e.message)
    }
  }

  /**
   * 更新会员状态
   *
   * @param id 会员 ID
   * @param status 会员状态
   * @throws {NotFoundException} 会员不存在
   * @throws {FailedException} 更新会员状态失败
   * @event MemberStatusChangedEvent
   */
  async updateMemberStatus(id: number, status: MemberStatus) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('会员不存在')

      await this.repository.update(id, { status })

      this.event.emit(
        toEventName(MemberStatusChangedEvent.name),
        new MemberStatusChangedEvent(id, founded.nickname, status),
      )
    }
    catch (e) {
      throw new FailedException('更新会员状态', e.message, e.status)
    }
  }

  /**
   * 更新会员标签
   *
   * @param id 会员 ID
   * @param tagIds 会员标签 ID 数组
   * @throws {NotFoundException} 会员不存在
   * @throws {FailedException} 更新会员标签失败
   * @event MemberTagsChangedEvent
   */
  async updateMemberTags(id: number, tagIds: number[]) {
    try {
      const member = await this.repository.findOne({
        where: { id },
        relations: ['tags'],
      })

      if (!member)
        throw new NotFoundException('会员不存在')

      member.tags = []

      for (const tagId of tagIds) {
        const tag = new MemberTag()
        tag.id = tagId

        member.tags.push(tag)
      }

      const created = await this.repository.save(member)

      this.event.emit(
        toEventName(MemberTagsChangedEvent.name),
        new MemberTagsChangedEvent(id, member.nickname, created.tags),
      )
    }
    catch (e) {
      throw new FailedException('更新会员标签', e.message, e.status)
    }
  }

  /**
   * 批量更新会员标签
   *
   * @param ids 会员 ID 数组
   * @param tagIds 会员标签 ID 数组
   * @throws {NotFoundException} 会员不存在
   * @throws {FailedException} 批量更新会员标签失败
   */
  async batchUpdateMemberTags(ids: number[], tagIds: number[]) {
    try {
      await Promise.all(
        ids.map(id => this.updateMemberTags(id, tagIds)),
      )
    }
    catch (e) {
      throw new FailedException('批量更新会员标签', e.message, e.status)
    }
  }

  /**
   * 重置会员密码
   *
   * @param id 会员 ID
   * @param password 重置会员密码
   * @throws {NotFoundException} 会员不存在
   * @throws {FailedException} 重置会员密码失败
   * @event MemberPasswordResetEvent
   */
  async resetMemberPassword(id: number, password?: string) {
    try {
      const member = await this.repository.findOne({
        select: ['nickname', 'salt', 'password'],
        where: { id },
      })

      if (!member)
        throw new NotFoundException('未找到会员')

      member.password = await bcrypt.hash(
        password || MEMBER_DEFAULT_PASSWORD,
        member.salt,
      )

      await this.repository.update(id, member)

      this.event.emit(
        toEventName(MemberPasswordResetEvent.name),
        new MemberPasswordResetEvent(
          id,
          member.nickname,
          password || MEMBER_DEFAULT_PASSWORD,
        ),
      )
    }
    catch (e) {
      throw new FailedException('重置会员密码', e.message, e.status)
    }
  }

  /**
   * 统计会员群体
   *
   * @param conditions IMemberGroupCondition[]
   * @returns Promise<number>
   * @throws {FailedException} 统计会员群体失败
   */
  async countMemberByGroupConditions(
    conditions: IMemberGroupCondition[],
  ): Promise<number> {
    try {
      const where: FindOptionsWhere<MemberAccount> = {}

      if (conditions.length === 0)
        return 0

      for (const condition of conditions) {
        if (condition.key === MemberGroupCondKey.SOURCE)
          where.source = condition.operator === MemberGroupCondOperator.IN ? In(condition.value) : Not(condition.value)

        if (condition.key === MemberGroupCondKey.STATUS)
          where.status = MemberGroupCondOperator.IN ? In(condition.value) : Not(condition.value)

        if (condition.key === MemberGroupCondKey.GENDER)
          where.gender = MemberGroupCondOperator.IN ? In(condition.value) : Not(condition.value)

        if (condition.key === MemberGroupCondKey.CARD)
          where.card = { id: MemberGroupCondOperator.IN ? In(condition.value) : Not(condition.value) }

        if (condition.key === MemberGroupCondKey.TAG)
          where.tags = { id: MemberGroupCondOperator.IN ? In(condition.value) : Not(condition.value) }

        if ([
          MemberGroupCondKey.ORDER_AMOUNT,
          MemberGroupCondKey.ORDER_COUNT,
          MemberGroupCondKey.EXP,
          MemberGroupCondKey.POINTS,
          MemberGroupCondKey.SIGN_IN,
        ].includes(condition.key as MemberGroupCondKey)) {
          const keyMapping = {
            [MemberGroupCondKey.ORDER_AMOUNT]: 'orderAmount',
            [MemberGroupCondKey.ORDER_COUNT]: 'orders',
            [MemberGroupCondKey.EXP]: 'exp',
            [MemberGroupCondKey.POINTS]: 'points',
            [MemberGroupCondKey.SIGN_IN]: 'signInTimes',
          }

          where[keyMapping[condition.key]] = Between(
            Number(condition.value[0]),
            Number(condition.value[1]),
          )
        }

        if (condition.key === MemberGroupCondKey.BIRTHDAY)
          where.birthday = Between(condition.value[0].toString(), condition.value[1].toString())

        if (condition.key === MemberGroupCondKey.CREATED_TIME)
          where.createdTime = Between(`${condition.value[0]} 00:00:00`, `${condition.value[1]} 23:59:59`)
      }

      return await this.repository.count({ where })
    }
    catch (e) {
      throw new FailedException('统计会员群体', e.message)
    }
  }

  /**
   * 验证会员密码
   *
   * @param password 会员密码
   * @returns boolean
   */
  async validateMemberPassword(password: string) {
    const pwdLen = await this.settings.findValueByKey('member.register.passwordLength') as number
    const pwdStrong = await this.settings.findValueByKey('member.register.passwordStrong') as string[]

    return isStrongPassword(password, {
      minLength: pwdLen,
      minLowercase: pwdStrong.includes('lower') ? 1 : 0,
      minUppercase: pwdStrong.includes('upper') ? 1 : 0,
      minNumbers: pwdStrong.includes('number') ? 1 : 0,
      minSymbols: pwdStrong.includes('symbol') ? 1 : 0,
    })
  }
}
