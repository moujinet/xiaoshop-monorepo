import {
  Enabled,
  type IApiPaginationData,
  type IMemberAccountDict,
  type IMemberGroupCondition,
  type IMemberListItem,
  type IMemberProfile,
  type IMemberStatus,
  MEMBER_ACCOUNT_KEYS,
  MEMBER_DEFAULT_PASSWORD,
  MemberAccountKey,
  MemberAccountStatus,
  MemberCardPlanType,
  MemberCardType,
  MemberGender,
  MemberGroupCondKey,
  MemberGroupCondOperator,
} from '@xiaoshop/schema'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { isStrongPassword } from 'class-validator'
import { Inject, Injectable } from '@nestjs/common'
import { Between, FindOptionsWhere, In, Like, Not, Repository } from 'typeorm'
import { MemberCardBinding } from '@/member/card/entities'
import { MemberTag } from '@/member/tag/entity'
import {
  BadRequestException,
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exception'
import {
  GetMemberPagesRequest,
  MemberPayload,
  UpdateMemberAccountPayload,
  UpdateMemberPayload,
  UpdateMemberProfilePayload,
} from '@/member/account/dto'
import {
  Member,
  MemberAccount,
} from '@/member/account/entities'
import { MemberCardService } from '@/member/card/service'
import { SettingsService } from '@/settings/settings.service'
import { nanoNumber } from '~/utils'

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,

    @InjectRepository(MemberAccount)
    private readonly memberAccountRepository: Repository<MemberAccount>,

    @Inject(MemberCardService)
    private readonly memberCardService: MemberCardService,

    @Inject(SettingsService)
    private readonly settings: SettingsService,
  ) {}

  /**
   * 获取会员分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberListItem>>
   * @throws {FailedException} 获取会员分页列表失败
   */
  async findPages(
    query: GetMemberPagesRequest,
  ): Promise<IApiPaginationData<IMemberListItem>> {
    try {
      const where: FindOptionsWhere<Member> = {}

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
        where.group = { id: query.groupId }
      if (query.tagId)
        where.tags = { id: query.tagId }
      if (query.cardId)
        where.card = { cardId: query.cardId }
      if (query.cardIds)
        where.card = { cardId: In(query.cardIds) }

      // 会员积分
      if (query.points) {
        const [min, max] = query.points.split(',').map(n => +n)

        where.account = {
          key: MemberAccountKey.POINTS,
          value: Between(min, max),
        }
      }

      // 成长值
      if (query.exp) {
        const [min, max] = query.exp.split(',').map(n => +n)

        where.account = {
          key: MemberAccountKey.EXP,
          value: Between(min, max),
        }
      }

      // 下单数量
      if (query.orders) {
        const [min, max] = query.orders.split(',').map(n => +n)

        where.account = {
          key: MemberAccountKey.ORDERS,
          value: Between(min, max),
        }
      }

      // 下单金额
      if (query.orderAmount) {
        const [min, max] = query.orderAmount.split(',').map(n => +n)

        where.account = {
          key: MemberAccountKey.ORDER_AMOUNT,
          value: Between(min, max),
        }
      }

      // 最近登录时间
      if (query.lastLoginTime) {
        const [from, to] = query.lastLoginTime.split(',')

        where.lastLoginTime = Between(from, to)
      }

      // 注册时间
      if (query.createdTime) {
        const [from, to] = query.createdTime.split(',')

        where.createdTime = Between(from, to)
      }

      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          status: true,
          source: true,
          tags: { id: true, name: true },
          group: { id: true, name: true },
          card: {
            id: true,
            cardId: true,
            cardType: true,
            styles: {
              id: true,
              key: true,
              name: true,
              styles: { icon: true, textColor: true, bgColor: true, bgImage: true },
              badge: { icon: true, textColor: true, bgColor: true },
            },
          },
          account: { key: true, name: true, value: true },
          cardNo: true,
          avatar: true,
          username: true,
          nickname: true,
          mobile: true,
          gender: true,
          location: true,
          lastLoginTime: true,
        },
        where,
        relations: ['tags', 'card', 'group', 'account'],
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
  async findProfile(id: number): Promise<IMemberProfile> {
    try {
      const profile = await this.repository.findOne({
        select: {
          id: true,
          status: true,
          source: true,
          cardNo: true,
          avatar: true,
          username: true,
          nickname: true,
          mobile: true,
          birthday: true,
          gender: true,
          location: true,
          tags: { id: true, name: true },
          group: { id: true, name: true },
          createdTime: true,
          lastLoginTime: true,
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
   * 获取会员账户列表
   *
   * @param id 会员 ID
   * @returns Promise<IMemberAccountDict[]>
   * @throws {FailedException} 获取会员账户列表失败
   * @throws {NotFoundException} 未找到会员
   */
  async findAccount(id: number): Promise<IMemberAccountDict[]> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员')

      return await this.memberAccountRepository.find({
        select: { key: true, name: true, value: true },
        where: { member: { id } },
      })
    }
    catch (e) {
      throw new FailedException('获取会员账户列表', e.message, e.status)
    }
  }

  /**
   * 创建会员资料
   *
   * @param {MemberPayload} data 会员资料
   * @throws {ExistsException} 会员已存在
   * @throws {BadRequestException} 密码强度不够
   * @throws {FailedException} 创建会员资料失败
   */
  async create(data: MemberPayload) {
    try {
      const exists = await this.repository.existsBy({ username: data.username })

      if (exists)
        throw new ExistsException('会员已存在')

      const member = new Member()

      member.username = data.username
      member.nickname = data.nickname || data.username
      member.mobile = data.mobile || ''
      member.gender = data.gender || MemberGender.UNKNOWN
      member.location = data.location || []

      // 默认头像
      const defaultAvatar = await this.settings.get('member.register.defaultAvatar', '') as string
      member.avatar = data.avatar || defaultAvatar

      // 密码处理
      if (data.password) {
        const passed = await this.validatePassword(data.password)

        if (!passed)
          throw new BadRequestException('密码强度不够')

        member.salt = await bcrypt.genSalt()
        member.password = await bcrypt.hash(data.password, member.salt)
      }
      else {
        member.salt = await bcrypt.genSalt()
        member.password = await bcrypt.hash(MEMBER_DEFAULT_PASSWORD, member.salt)
      }

      if (data.tagIds && data.tagIds.length > 0) {
        member.tags = []

        for (const tagId of data.tagIds) {
          const tag = new MemberTag()
          tag.id = tagId

          member.tags.push(tag)
        }
      }

      if (data.cardId) {
        const card = await this.createMemberCardBinding(
          data.cardId,
          data.cardPlanId,
        )

        if (card) {
          member.cardNo = nanoNumber(9)
          member.card = card
        }
      }

      member.account = []

      // 默认账户
      for (const defaults of MEMBER_ACCOUNT_KEYS) {
        const account = new MemberAccount()

        account.status = MemberAccountStatus.ENABLE
        account.key = defaults.value
        account.name = defaults.label
        account.member = member
        account.value = data.points || 0

        member.account.push(account)
      }

      await this.repository.save(member)
    }
    catch (e) {
      throw new FailedException('创建会员资料', e.message, e.status)
    }
  }

  /**
   * 创建会员卡绑定信息
   *
   * @param cardId 会员卡 ID
   * @param planId 会员有效期 ID
   * @returns Promise<MemberCardBinding>
   * @throws {FailedException} 创建会员卡绑定信息失败
   * @throws {NotFoundException} 会员卡不存在
   */
  async createMemberCardBinding(cardId: number, planId?: number): Promise<MemberCardBinding> {
    try {
      const card = await this.memberCardService.findDetail(cardId)

      const binding = new MemberCardBinding()

      binding.cardId = card.id
      binding.cardType = card.type
      binding.discount = card.discount
      binding.pointsRatio = card.pointsRatio
      binding.isFreeShipping = card.isFreeShipping
      binding.needExp = card.needExp

      if (card.type === MemberCardType.CUSTOM && planId) {
        const plan = card.plans.find(item => item.id === planId)

        if (!plan)
          throw new NotFoundException('会员卡有效期不存在')

        binding.cardPlanType = plan.type

        const today = new Date()

        if (plan.type === MemberCardPlanType.DAYS)
          binding.dueTime = today.setDate(today.getDate() + plan.duration).toString()
        else if (plan.type === MemberCardPlanType.MONTHS)
          binding.dueTime = today.setMonth(today.getMonth() + plan.duration).toString()
        else if (plan.type === MemberCardPlanType.YEARS)
          binding.dueTime = today.setFullYear(today.getFullYear() + plan.duration).toString()
      }
      else {
        const nextLevel = await this.memberCardService.findNextLevelCard(card.key)

        if (nextLevel) {
          binding.isUpgradeable = Enabled.YES
          binding.nextNeedExp = nextLevel.needExp
        }
      }

      binding.styles.id = card.id

      return binding
    }
    catch (e) {
      throw new FailedException('创建会员卡绑定信息', e.message, e.status)
    }
  }

  /**
   * 更新会员资料
   *
   * @param {number} id 会员 ID
   * @param {UpdateMemberPayload} data 会员资料
   * @throws {NotFoundException} 未找到会员
   * @throws {FailedException} 更新会员资料失败
   */
  async updateProfile(id: number, data: UpdateMemberPayload) {
    try {
      const member = await this.repository.findOneBy({ id })

      if (!member)
        throw new NotFoundException('未找到会员')

      if (data.avatar)
        member.avatar = data.avatar

      if (data.nickname)
        member.nickname = data.nickname

      if (data.mobile)
        member.mobile = data.mobile

      if (data.gender)
        member.gender = data.gender

      if (data.location)
        member.location = data.location

      if (data.tagIds && data.tagIds.length > 0) {
        member.tags = []

        for (const tagId of data.tagIds) {
          const tag = new MemberTag()
          tag.id = tagId

          member.tags.push(tag)
        }
      }

      await this.repository.save(member)
    }
    catch (e) {
      throw new FailedException('更新会员资料', e.message, e.status)
    }
  }

  /**
   * 批量更新会员资料
   *
   * @param ids 会员 IDs
   * @param data 会员资料
   * @throws {FailedException} 批量更新会员资料失败
   */
  async batchUpdateProfile(ids: number[], data: UpdateMemberProfilePayload) {
    try {
      const member = new Member()

      if (data.tagIds && data.tagIds.length > 0) {
        member.tags = []

        for (const tagId of data.tagIds) {
          const tag = new MemberTag()
          tag.id = tagId

          member.tags.push(tag)
        }
      }

      if (data.cardId) {
        const card = await this.createMemberCardBinding(
          data.cardId,
          data.cardPlanId,
        )

        if (card) {
          member.cardNo = nanoNumber(9)
          member.card = card
        }
      }

      await this.repository.update(ids, member)
    }
    catch (e) {
      throw new FailedException('更新会员资料', e.message, e.status)
    }
  }

  /**
   * 更新会员账户
   *
   * @param memberId 会员 ID
   * @param data 更新数据
   * @throws {NotFoundException} 未找到会员
   * @throws {NotFoundException} 未找到会员账户
   * @throws {BadRequestException} 更新内容为空
   * @throws {FailedException} 更新会员账户失败
   */
  async updateAccount(memberId: number, data: UpdateMemberAccountPayload) {
    try {
      if (Object.keys(data).length === 1)
        throw new BadRequestException('更新内容为空')

      const member = await this.repository.existsBy({ id: memberId })

      if (!member)
        throw new NotFoundException('未找到会员')

      const founded = await this.memberAccountRepository.exists({
        where: { member: { id: memberId } },
      })

      if (!founded)
        throw new NotFoundException('未找到会员账户')

      const account = new MemberAccount()

      if ('status' in data)
        account.status = data.status
      if ('value' in data)
        account.value = data.value

      await this.memberAccountRepository.update(
        {
          key: data.key,
          member: { id: memberId },
        },
        account,
      )
    }
    catch (e) {
      throw new FailedException('更新会员账户', e.message, e.status)
    }
  }

  /**
   * 批量更新会员账户
   *
   * @param ids 会员 IDs
   * @param data 会员账户
   * @throws {FailedException} 批量更新会员账户失败
   * @throws {BadRequestException} 更新内容为空
   */
  async batchUpdateAccount(ids: number[], data: UpdateMemberAccountPayload) {
    try {
      if (Object.keys(data).length === 1)
        throw new BadRequestException('更新内容为空')

      const account = new MemberAccount()

      if ('status' in data)
        account.status = data.status
      if ('value' in data)
        account.value = data.value

      await this.memberAccountRepository.update(
        {
          key: data.key,
          member: { id: In(ids) },
        },
        account,
      )
    }
    catch (e) {
      throw new FailedException('更新会员账户', e.message, e.status)
    }
  }

  /**
   * 更新会员状态
   *
   * @param id 会员 ID
   * @param status 会员状态
   * @throws {NotFoundException} 未找到会员
   * @throws {FailedException} 更新会员状态失败
   */
  async updateStatus(id: number, status: IMemberStatus) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员')

      await this.repository.update(id, { status })
    }
    catch (e) {
      throw new FailedException('更新会员状态', e.message, e.status)
    }
  }

  /**
   * 更新会员密码
   *
   * @param id 会员 ID
   * @param password 旧密码
   * @param newPassword 新密码
   * @throws {NotFoundException} 未找到会员
   * @throws {BadRequestException} 新密码强度不够
   * @throws {FailedException} 更新会员密码失败
   */
  async updatePassword(id: number, password: string, newPassword: string) {
    try {
      const member = await this.repository.findOne({
        select: ['salt', 'password'],
        where: { id },
      })

      if (!member)
        throw new NotFoundException('未找到会员')

      if (password === newPassword)
        throw new BadRequestException('新密码不能与旧密码相同')

      if (!await this.validatePassword(newPassword))
        throw new BadRequestException('新密码强度不够')

      const oldPass = await bcrypt.hash(password, member.salt)

      if (oldPass !== member.password)
        throw new BadRequestException('旧密码错误')

      member.password = await bcrypt.hash(newPassword, member.salt)

      await this.repository.update(id, member)
    }
    catch (e) {
      throw new FailedException('更新会员密码', e.message, e.status)
    }
  }

  /**
   * 重置会员密码
   *
   * @param id 会员 ID
   * @param password 重置密码
   * @throws {NotFoundException} 未找到会员
   * @throws {FailedException} 重置会员密码失败
   */
  async resetPassword(id: number, password?: string) {
    try {
      const member = await this.repository.findOne({
        select: ['salt', 'password'],
        where: { id },
      })

      if (!member)
        throw new NotFoundException('未找到会员')

      member.password = await bcrypt.hash(password || MEMBER_DEFAULT_PASSWORD, member.salt)

      await this.repository.update(id, member)
    }
    catch (e) {
      throw new FailedException('重置会员密码', e.message, e.status)
    }
  }

  /**
   * 统计会员群众
   *
   * @param conditions IMemberGroupCondition[]
   * @returns Promise<number>
   * @throws {FailedException} 统计会员群众失败
   */
  async countMemberByGroupConditions(conditions: IMemberGroupCondition[]): Promise<number> {
    try {
      const where: FindOptionsWhere<Member> = {}

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
            [MemberGroupCondKey.ORDER_AMOUNT]: MemberAccountKey.ORDER_AMOUNT,
            [MemberGroupCondKey.ORDER_COUNT]: MemberAccountKey.ORDERS,
            [MemberGroupCondKey.EXP]: MemberAccountKey.EXP,
            [MemberGroupCondKey.POINTS]: MemberAccountKey.POINTS,
            [MemberGroupCondKey.SIGN_IN]: MemberAccountKey.SIGN_IN,
          }

          where.account = {
            key: keyMapping[condition.key],
            value: Between(Number(condition.value[0]), Number(condition.value[1])),
          }
        }

        if (condition.key === MemberGroupCondKey.BIRTHDAY)
          where.birthday = Between(condition.value[0].toString(), condition.value[1].toString())

        if (condition.key === MemberGroupCondKey.CREATED_TIME)
          where.createdTime = Between(`${condition.value[0]} 00:00:00`, `${condition.value[1]} 23:59:59`)
      }

      return await this.repository.count({ where })
    }
    catch (e) {
      throw new FailedException('统计会员群众', e.message)
    }
  }

  /**
   * 验证会员密码
   *
   * @param password 会员密码
   * @returns boolean
   */
  async validatePassword(password: string) {
    const pwdLen = await this.settings.get('member.register.passwordLength', 6) as number
    const pwdStrong = await this.settings.get('member.register.passwordStrong', ['number', 'lower']) as string[]

    return isStrongPassword(password, {
      minLength: pwdLen,
      minLowercase: pwdStrong.includes('lower') ? 1 : 0,
      minUppercase: pwdStrong.includes('upper') ? 1 : 0,
      minNumbers: pwdStrong.includes('number') ? 1 : 0,
      minSymbols: pwdStrong.includes('symbol') ? 1 : 0,
    })
  }
}
