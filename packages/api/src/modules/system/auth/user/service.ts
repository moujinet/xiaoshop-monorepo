import * as bcrypt from 'bcrypt'
import { ClsService } from 'nestjs-cls'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm'
import {
  type IApiPaginationData,
  type ISystemLoginSignData,
  type ISystemLoginToken,
  type ISystemUserInfo,
  type ISystemUserList,
  type ISystemUserLockedList,
  SystemUserStatus,
  YesOrNo,
} from '@xiaoshop/shared'

import { nowStr } from '~/utils/datetime'
import { WhoisService } from '~/services/whois'
import { SYSTEM_USER_STATUSES } from '~/common/dicts'
import { SystemRole } from '@/system/auth/role/entity'
import { SystemUser } from '@/system/auth/user/entity'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { AUTH_ADMIN_KEY } from '@/system/auth/constants'
import { objectToDict, pipeDict, toDict, toEventName } from '~/utils/transformers'
import { BadRequestException, ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import {
  CreateSystemUserPayload,
  GetSystemUserPagesRequest,
  UpdateSystemUserPayload,
} from './dto'
import {
  SystemUserAdminUnlockEvent,
  SystemUserAutoUnlockEvent,
  SystemUserBlockEvent,
  SystemUserCreateEvent,
  SystemUserDeleteEvent,
  SystemUserLockEvent,
  SystemUserLoginEvent,
  SystemUserResetPasswordEvent,
  SystemUserUnblockEvent,
  SystemUserUpdateEvent,
  SystemUserWrongPasswordEvent,
} from './events'

@Injectable()
export class SystemUserService {
  constructor(
    @InjectRepository(SystemUser)
    private readonly repository: Repository<SystemUser>,

    @Inject(JwtService)
    private readonly jwt: JwtService,

    @Inject(ClsService)
    private readonly cls: ClsService,

    @Inject(WhoisService)
    private readonly whois: WhoisService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取系统用户列表
   *
   * @param query 查询条件
   * @returns 系统用户列表
   * @throws {FailedException} 获取系统用户列表失败
   */
  async findPages(query: GetSystemUserPagesRequest): Promise<IApiPaginationData<ISystemUserList>> {
    try {
      const where: FindOptionsWhere<SystemUser> = {}

      if (query.isAdmin)
        where.isAdmin = query.isAdmin

      if (query.status)
        where.status = query.status

      if (query.name)
        where.name = Like(`${query.name}%`)

      if (query.mobile)
        where.mobile = Like(`${query.mobile}%`)

      if (query.departmentId)
        where.departmentId = query.departmentId

      if (query.positionId)
        where.positionId = query.positionId

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repository.findAndCount({
        where,
        select: {
          id: true,
          isAdmin: true,
          status: true,
          username: true,
          name: true,
          mobile: true,
          department: { id: true, name: true },
          position: { id: true, name: true },
          roles: { id: true, name: true },
          lastLoginIp: true,
          lastLoginTime: true,
          lastLockedIp: true,
          lockedTime: true,
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
        relations: ['department', 'position', 'roles'],
        order: { lastLoginTime: 'DESC' },
      })

      return {
        result: pipeDict<ISystemUserList>(list, [
          user => objectToDict(user, 'status', SYSTEM_USER_STATUSES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取系统用户列表', e.message)
    }
  }

  /**
   * 获取锁定状态的系统管理员列表
   *
   * @returns 锁定状态的系统管理员列表
   * @throws {FailedException} 获取锁定状态系统管理员列表失败
   */
  async findLockedAdminList(): Promise<ISystemUserLockedList[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'lockedTime'],
        where: {
          isAdmin: YesOrNo.YES,
          status: SystemUserStatus.LOCKED,
        },
        order: { lockedTime: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取锁定状态系统管理员列表', e.message)
    }
  }

  /**
   * 获取系统用户信息
   *
   * @param id 系统用户 ID
   * @returns 系统用户信息
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 获取系统用户信息失败
   */
  async findById(id: number): Promise<ISystemUserInfo> {
    try {
      const user = await this.repository.findOne({
        select: {
          id: true,
          isAdmin: true,
          status: true,
          username: true,
          name: true,
          mobile: true,
          department: { id: true, name: true },
          position: { id: true, name: true },
          roles: { name: true, permissions: true },
        },
        where: { id },
        relations: ['department', 'position', 'roles'],
      })

      if (!user)
        throw new NotFoundException('系统用户')

      return {
        ...user,
        status: toDict(user.status, SYSTEM_USER_STATUSES),
      } as ISystemUserInfo
    }
    catch (e) {
      throw new FailedException('获取系统用户信息', e.message)
    }
  }

  /**
   * 创建系统用户
   *
   * @param data 系统用户信息
   * @throws {ExistsException} 系统用户已存在
   * @throws {FailedException} 创建系统用户失败
   */
  async create(data: CreateSystemUserPayload) {
    try {
      const existsByUsername = await this.repository.existsBy({ username: data.username })

      if (existsByUsername)
        throw new ExistsException('系统用户')

      const existsByMobile = await this.repository.existsBy({ mobile: data.mobile })

      if (existsByMobile)
        throw new ExistsException('系统用户')

      const existsByName = await this.repository.existsBy({ name: data.name })

      if (existsByName)
        throw new ExistsException('系统用户')

      const user = new SystemUser()

      user.name = data.name.trim()
      user.username = data.username.trim()
      user.mobile = data.mobile.trim()
      user.status = SystemUserStatus.NORMAL
      user.isAdmin = data.isAdmin || YesOrNo.NO
      user.departmentId = data.departmentId || 0
      user.positionId = data.positionId || 0
      user.roles = []

      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(data.password, user.salt)

      if (data.roleIds && data.roleIds.length > 0) {
        for (const roleId of data.roleIds) {
          const role = new SystemRole()

          role.id = roleId
          user.roles.push(role)
        }
      }

      const created = await this.repository.save(user)

      this.event.emit(
        toEventName(SystemUserCreateEvent.name),
        new SystemUserCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建系统用户', e.message, e.status)
    }
  }

  /**
   * 更新系统用户
   *
   * @param id 系统用户 ID
   * @param data 系统用户信息
   * @throws {NotFoundException} 系统用户不存在
   * @throws {ExistsException} 系统用户已存在
   * @throws {FailedException} 更新系统用户失败
   */
  async update(id: number, data: UpdateSystemUserPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('系统用户')

      const existsByMobile = await this.repository.existsBy({
        id: Not(id),
        mobile: data.mobile,
      })

      if (existsByMobile)
        throw new ExistsException('系统用户')

      const existsByName = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (existsByName)
        throw new ExistsException('系统用户')

      const user = new SystemUser()

      user.id = id
      user.name = data.name.trim()
      user.mobile = data.mobile.trim()
      user.isAdmin = data.isAdmin || YesOrNo.NO
      user.departmentId = data.departmentId || 0
      user.positionId = data.positionId || 0
      user.roles = []

      if (data.roleIds && data.roleIds.length > 0) {
        for (const roleId of data.roleIds) {
          const role = new SystemRole()

          role.id = roleId
          user.roles.push(role)
        }
      }

      const updated = await this.repository.save(user)

      this.event.emit(
        toEventName(SystemUserUpdateEvent.name),
        new SystemUserUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新系统用户', e.message, e.status)
    }
  }

  /**
   * 登录系统
   *
   * @param username 登录用户名
   * @param password 登录密码
   * @returns 登录成功后的令牌
   */
  async login(username: string, password: string): Promise<ISystemLoginToken> {
    try {
      const user = await this.repository.findOne({
        select: {
          id: true,
          isAdmin: true,
          status: true,
          username: true,
          password: true,
          salt: true,
          name: true,
          mobile: true,
          department: { id: true, name: true },
          position: { id: true, name: true },
          roles: { name: true, permissions: true },
          lastLoginIp: true,
          lastLoginTime: true,
          lastLockedIp: true,
          lockedTime: true,
        },
        where: {
          status: SystemUserStatus.NORMAL,
          username,
        },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (user.password !== await bcrypt.hash(password, user.salt)) {
        this.event.emit(
          toEventName(SystemUserWrongPasswordEvent.name),
          new SystemUserWrongPasswordEvent(user.id, user.username),
        )

        throw new BadRequestException('密码错误')
      }

      const signData: ISystemLoginSignData = {
        scope: AUTH_ADMIN_KEY,
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
          status: toDict(user.status, SYSTEM_USER_STATUSES),
          username: user.username,
          name: user.name,
          mobile: user.mobile,
          department: user.department,
          position: user.position,
          roles: user.roles,
          lastLoginIp: user.lastLoginIp,
          lastLoginTime: user.lastLoginTime,
          lastLockedIp: user.lastLockedIp,
          lockedTime: user.lockedTime,
        },
      }

      const ip = this.cls.get<string>('IP')
      const whois = await this.whois.search(ip)

      user.lastLoginIp = `${ip} (${whois?.region})`
      user.lastLoginTime = nowStr()

      await this.repository.save(user)

      this.event.emit(
        toEventName(SystemUserLoginEvent.name),
        new SystemUserLoginEvent(user.id, user.username),
      )

      return {
        token: this.jwt.sign(signData),
      }
    }
    catch (e) {
      throw new FailedException('登录系统用户', e.message, e.status)
    }
  }

  /**
   * 禁用/恢复系统用户
   *
   * @param id 系统用户 ID
   * @param status 系统用户状态（禁用/恢复）
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 禁用/恢复系统用户失败
   */
  async block(id: number, status: SystemUserStatus) {
    try {
      const user = await this.repository.findOne({
        select: ['id', 'name', 'status'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (
        (user.status === SystemUserStatus.NORMAL && status === SystemUserStatus.BLOCKED)
        || (user.status === SystemUserStatus.BLOCKED && status === SystemUserStatus.NORMAL)
      ) {
        user.status = status

        await this.repository.save(user)

        if (status === SystemUserStatus.NORMAL) {
          this.event.emit(
            toEventName(SystemUserBlockEvent.name),
            new SystemUserBlockEvent(user.id, user.name),
          )
        }
        else {
          this.event.emit(
            toEventName(SystemUserUnblockEvent.name),
            new SystemUserUnblockEvent(user.id, user.name),
          )
        }
      }
    }
    catch (e) {
      throw new FailedException('禁用/恢复系统用户', e.message, e.status)
    }
  }

  /**
   * 锁定/解锁系统用户
   *
   * @param id 系统用户 ID
   * @param status 系统用户状态（锁定/解锁）
   * @param isAdmin 是否为管理员操作
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 锁定/解锁系统用户失败
   */
  async lock(id: number, status: SystemUserStatus, isAdmin = false) {
    try {
      const user = await this.repository.findOne({
        select: ['id', 'name', 'status'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (
        (user.status === SystemUserStatus.NORMAL && status === SystemUserStatus.LOCKED)
        || (user.status === SystemUserStatus.LOCKED && status === SystemUserStatus.NORMAL)
      ) {
        const ip = this.cls.get<string>('IP')
        const whois = await this.whois.search(ip)

        user.status = status
        user.lastLockedIp = status === SystemUserStatus.NORMAL ? null : `${ip} (${whois?.region})`
        user.lockedTime = status === SystemUserStatus.NORMAL ? null : nowStr()

        await this.repository.save(user)

        if (status === SystemUserStatus.NORMAL) {
          this.event.emit(
            toEventName(SystemUserLockEvent.name),
            new SystemUserLockEvent(user.id, user.name),
          )
        }
        else {
          if (isAdmin) {
            this.event.emit(
              toEventName(SystemUserAdminUnlockEvent.name),
              new SystemUserAdminUnlockEvent(user.id, user.name),
            )
          }
          else {
            this.event.emit(
              toEventName(SystemUserAutoUnlockEvent.name),
              new SystemUserAutoUnlockEvent(user.id, user.name),
            )
          }
        }
      }
    }
    catch (e) {
      throw new FailedException('锁定/解锁系统用户', e.message, e.status)
    }
  }

  /**
   * 修改密码
   *
   * @param id 系统用户 ID
   * @param oldPassword 原密码
   * @param newPassword 新密码
   * @throws {NotFoundException} 系统用户不存在
   * @throws {BadRequestException} 原密码不正确
   * @throws {FailedException} 修改密码失败
   */
  async changePassword(id: number, oldPassword: string, newPassword: string) {
    try {
      const user = await this.repository.findOne({
        select: ['id', 'password', 'salt'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (user.password !== await bcrypt.hash(oldPassword, user.salt))
        throw new BadRequestException('原密码不正确')

      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(newPassword, user.salt)

      await this.repository.save(user)
    }
    catch (e) {
      throw new FailedException('修改密码', e.message, e.status)
    }
  }

  /**
   * 重置密码
   *
   * @param id 系统用户 ID
   * @param password 登录密码
   */
  async resetPassword(id: number, password: string) {
    try {
      const user = await this.repository.findOne({
        select: ['id', 'name', 'password', 'salt'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, user.salt)

      await this.repository.save(user)

      this.event.emit(
        toEventName(SystemUserResetPasswordEvent.name),
        new SystemUserResetPasswordEvent(user.id, user.name),
      )
    }
    catch (e) {
      throw new FailedException('重置密码', e.message, e.status)
    }
  }

  /**
   * 删除系统用户
   *
   * @param id 系统用户 ID
   * @throws {FailedException} 删除系统用户失败
   */
  async delete(id: number) {
    try {
      const user = await this.repository.findOne({
        select: ['name'],
        where: { id },
      })

      if (user) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(SystemUserDeleteEvent.name),
          new SystemUserDeleteEvent(id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除系统用户', e.message)
    }
  }
}
