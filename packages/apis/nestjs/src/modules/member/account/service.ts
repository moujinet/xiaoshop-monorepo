import {
  type IApiPaginationData,
  type IMemberAccountDict,
  type IMemberListItem,
  type IMemberProfile,
  IMemberStatus,
  MEMBER_ACCOUNT_KEYS,
  MEMBER_DEFAULT_PASSWORD,
  MemberAccountKey,
  MemberAccountStatus,
  MemberGender,
} from '@xiaoshop/schema'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { isStrongPassword } from 'class-validator'
import { Inject, Injectable } from '@nestjs/common'
import { Between, FindOptionsWhere, In, Like, Repository } from 'typeorm'
import { MemberCard, MemberCardBinding, MemberCardPlan } from '@/member/card/entities'
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
import { SettingsService } from '@/settings/settings.service'
import { nanoNumber } from '~/utils'

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,

    @InjectRepository(MemberAccount)
    private readonly accountRepo: Repository<MemberAccount>,

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
        where.tag = { id: query.tagId }
      if (query.cardId)
        where.binding = { card: { id: query.cardId } }

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
          tag: { id: true, name: true },
          group: { id: true, name: true },
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
        relations: ['tag', 'group', 'account'],
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
          createdTime: true,
          lastLoginTime: true,
          tag: { id: true, name: true },
          group: { id: true, name: true },
          binding: {
            id: true,
            card: { id: true, type: true, name: true },
            plan: { id: true, type: true, duration: true },
            times: true,
            dueTime: true,
          },
        },
        where: { id },
        relations: ['tag', 'group', 'binding'],
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

      return await this.accountRepo.find({
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

      if (data.tagId) {
        member.tag = new MemberTag()
        member.tag.id = data.tagId
      }

      if (data.cardId) {
        member.binding = new MemberCardBinding()
        member.binding.card = new MemberCard()
        member.binding.card.id = data.cardId

        if (data.cardPlanId) {
          member.binding.plan = new MemberCardPlan()
          member.binding.plan.id = data.cardPlanId
        }

        member.cardNo = nanoNumber(9)
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
   * 更新会员资料
   *
   * @param {number} id 会员 ID
   * @param {UpdateMemberPayload} data 会员资料
   * @throws {NotFoundException} 未找到会员
   * @throws {FailedException} 更新会员资料失败
   */
  async updateProfile(id: number, data: UpdateMemberPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员')

      const member = new Member()

      member.id = id

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

      if (data.tagId) {
        member.tag = new MemberTag()
        member.tag.id = data.tagId
      }

      if (data.cardId) {
        member.binding = new MemberCardBinding()
        member.binding.card = new MemberCard()
        member.binding.card.id = data.cardId

        if (data.cardPlanId) {
          member.binding.plan = new MemberCardPlan()
          member.binding.plan.id = data.cardPlanId
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

      if (data.tagId) {
        member.tag = new MemberTag()
        member.tag.id = data.tagId
      }

      if (data.cardId) {
        member.binding = new MemberCardBinding()
        member.binding.card = new MemberCard()
        member.binding.card.id = data.cardId

        if (data.cardPlanId) {
          member.binding.plan = new MemberCardPlan()
          member.binding.plan.id = data.cardPlanId
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

      const founded = await this.accountRepo.exists({
        where: { member: { id: memberId } },
      })

      if (!founded)
        throw new NotFoundException('未找到会员账户')

      const updateData = new MemberAccount()

      if ('status' in data)
        updateData.status = data.status
      if ('value' in data)
        updateData.value = data.value

      await this.accountRepo.update(
        {
          key: data.key,
          member: { id: memberId },
        },
        updateData,
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

      const updateData = new MemberAccount()

      if ('status' in data)
        updateData.status = data.status
      if ('value' in data)
        updateData.value = data.value

      await this.accountRepo.update(
        {
          key: data.key,
          member: { id: In(ids) },
        },
        updateData,
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
