import {
  AuthUserStatus,
  type IApiPaginationData,
  type IAuthUserInfo,
  type IAuthUserList,
  type IAuthUserLockedInfo,
  type IAuthUserLoginPayload,
  type IAuthUserToken,
  YesOrNo,
} from '@xiaoshop/shared'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm'
import {
  CreateAuthUserPayload,
  GetAuthUserPagesRequest,
  UpdateAuthUserPayload,
} from '@/auth/user/dto'
import {
  AuthUserBlockedEvent,
  AuthUserCreatedEvent,
  AuthUserDeletedEvent,
  AuthUserLockedEvent,
  AuthUserLoginEvent,
  AuthUserPasswordWrongEvent,
  AuthUserUnblockedEvent,
  AuthUserUnlockedEvent,
  AuthUserUpdatedEvent,
} from '@/auth/user/events'
import { AuthRole } from '@/auth/role/entity'
import { AuthUser } from '@/auth/user/entity'
import { AUTH_ADMIN_KEY } from '@/auth/constants'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly repository: Repository<AuthUser>,

    @Inject(JwtService)
    private readonly jwt: JwtService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取员工账号分页列表
   *
   * @param query 查询条件
   * @throws {FailedException} 获取员工账号分页列表失败
   * @returns Promise<IApiPaginationData<IAuthUserList>>
   * @see {@link IAuthUserList}
   */
  async findPages(
    query: GetAuthUserPagesRequest,
  ): Promise<IApiPaginationData<IAuthUserList>> {
    try {
      const where: FindOptionsWhere<AuthUser> = {}

      if (query.name)
        where.name = Like(`%${query.name}%`)

      if (query.mobile)
        where.mobile = Like(`%${query.mobile}%`)

      if (query.status)
        where.status = query.status

      if (query.roleId)
        where.roles = { id: query.roleId }

      if (query.departmentId)
        where.departmentId = query.departmentId

      if (query.positionId)
        where.positionId = query.positionId

      const page = query.page || 1
      const pagesize = query.pagesize || 10
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          isAdmin: true,
          status: true,
          roles: { id: true, name: true, permissions: true },
          username: true,
          name: true,
          mobile: true,
          position: { id: true, name: true },
          department: { id: true, name: true },
          lastLoginTime: true,
        },
        where,
        relations: ['roles', 'position', 'department'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          status: 'ASC',
          lastLoginTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取员工账号列表', e.message)
    }
  }

  /**
   * 获取员工账号详情
   *
   * @param id 员工账号 ID
   * @throws {FailedException} 获取员工账号详情失败
   * @throws {NotFoundException} 员工账号不存在
   * @returns Promise<IAuthUserInfo>
   * @see {@link IAuthUserInfo}
   */
  async findById(id: number): Promise<IAuthUserInfo> {
    try {
      const detail = await this.repository.findOne({
        select: {
          id: true,
          isAdmin: true,
          status: true,
          roles: { id: true, name: true, permissions: true },
          username: true,
          name: true,
          mobile: true,
          department: { id: true, name: true },
          position: { id: true, name: true },
          lastLoginTime: true,
        },
        where: { id },
        relations: ['roles', 'position', 'department'],
      })

      if (!detail)
        throw new NotFoundException('员工账号')

      return detail
    }
    catch (e) {
      throw new FailedException('获取员工账号详情', e.message, e.status)
    }
  }

  /**
   * 通过员工账号获取员工账号详情
   *
   * @param username 员工账号
   * @returns Promise<IAuthUser>
   */
  async findByUsername(username: string) {
    return await this.repository.findOne({
      select: {
        id: true,
        isAdmin: true,
        status: true,
        roles: { id: true, name: true, permissions: true },
        username: true,
        password: true,
        salt: true,
        name: true,
        mobile: true,
        department: { id: true, name: true },
        position: { id: true, name: true },
        lastLoginTime: true,
      },
      where: {
        status: AuthUserStatus.NORMAL,
        username,
      },
      relations: ['roles', 'position', 'department'],
    })
  }

  /**
   * 获取锁定状态的超级管理员列表
   *
   * @returns Promise<IAuthUserLockedInfo[]>
   */
  async findLockedAdminList(): Promise<IAuthUserLockedInfo[]> {
    return await this.repository.find({
      select: ['id', 'name', 'lockedTime'],
      where: {
        isAdmin: YesOrNo.YES,
        status: AuthUserStatus.LOCKED,
      },
      order: {
        lastLoginTime: 'DESC',
      },
    })
  }

  /**
   * 创建员工账号
   *
   * @param data 员工账号信息
   * @throws {FailedException} 创建员工账号失败
   * @throws {ExistsException} 员工姓名已存在
   * @throws {ExistsException} 员工账号已存在
   * @throws {ExistsException} 员工手机已存在
   * @event AuthUserCreatedEvent
   */
  async create(data: CreateAuthUserPayload) {
    try {
      const existsName = await this.repository.existsBy({
        name: data.name,
      })

      if (existsName)
        throw new ExistsException(`员工姓名 ${data.name} `)

      const existsUsername = await this.repository.existsBy({
        username: data.username,
      })

      if (existsUsername)
        throw new ExistsException(`员工账号 [${data.username}] `)

      const existsMobile = await this.repository.existsBy({
        mobile: data.mobile,
      })

      if (existsMobile)
        throw new ExistsException(`员工手机 [${data.mobile}] `)

      const user = new AuthUser()

      user.username = data.username
      user.name = data.name
      user.mobile = data.mobile
      user.isAdmin = data.isAdmin
      user.status = data.status
      user.roles = []

      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(data.password, user.salt)

      if (data.roleIds && data.roleIds.length > 0) {
        for (const roleId of data.roleIds) {
          const role = new AuthRole()
          role.id = roleId
          user.roles.push(role)
        }
      }

      if (data.departmentId)
        user.departmentId = data.departmentId

      if (data.positionId)
        user.positionId = data.positionId

      const created = await this.repository.save(user)

      this.event.emit(
        toEventName(AuthUserCreatedEvent.name),
        new AuthUserCreatedEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建员工账号', e.message, e.status)
    }
  }

  /**
   * 更新员工账号
   *
   * @param id 员工账号 ID
   * @param data 员工账号信息
   * @throws {NotFoundException} 员工账号不存在
   * @throws {ExistsException} 员工姓名已存在
   * @throws {ExistsException} 员工账号已存在
   * @throws {ExistsException} 员工手机已存在
   * @throws {FailedException} 更新员工账号失败
   * @event AuthUserUpdatedEvent
   */
  async update(id: number, data: UpdateAuthUserPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`员工账号 [${data.name}] `)

      const existsName = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (existsName)
        throw new ExistsException(`员工姓名 [${data.name}] `)

      const existsUsername = await this.repository.existsBy({
        id: Not(id),
        username: data.username,
      })

      if (existsUsername)
        throw new ExistsException(`员工账号 [${data.username}] `)

      const existsMobile = await this.repository.existsBy({
        id: Not(id),
        mobile: data.mobile,
      })

      if (existsMobile)
        throw new ExistsException(`员工手机 [${data.mobile}] `)

      const user = new AuthUser()

      user.id = id
      user.username = data.username
      user.name = data.name
      user.mobile = data.mobile
      user.isAdmin = data.isAdmin
      user.status = data.status
      user.roles = []

      if (data.password) {
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(data.password, user.salt)
      }

      if (data.roleIds && data.roleIds.length > 0) {
        for (const roleId of data.roleIds) {
          const role = new AuthRole()
          role.id = roleId
          user.roles.push(role)
        }
      }

      if (data.departmentId)
        user.departmentId = data.departmentId

      if (data.positionId)
        user.positionId = data.positionId

      await this.repository.save(user)

      this.event.emit(
        toEventName(AuthUserUpdatedEvent.name),
        new AuthUserUpdatedEvent(id, data.name),
      )
    }
    catch (e) {
      throw new FailedException('更新员工账号', e.message, e.status)
    }
  }

  /**
   * 员工登录
   *
   * @param username 员工账号
   * @param password 登录密码
   * @throws {FailedException} 员工账号不存在
   * @throws {FailedException} 密码错误
   * @throws {FailedException} 登录失败
   * @returns Promise<IAuthUserToken>
   * @see {@link IAuthUserToken}
   * @event AuthUserLoginEvent
   */
  async login(username: string, password: string): Promise<IAuthUserToken> {
    try {
      const user = await this.findByUsername(username)

      if (!user)
        throw new FailedException('员工账号不存在')

      if (user.password !== await bcrypt.hash(password, user.salt)) {
        this.event.emit(
          toEventName(AuthUserPasswordWrongEvent.name),
          new AuthUserPasswordWrongEvent(user.id, username),
        )

        throw new FailedException('密码错误')
      }

      const payload: IAuthUserLoginPayload = {
        scope: AUTH_ADMIN_KEY,
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
          status: user.status,
          roles: user.roles,
          username: user.username,
          name: user.name,
          mobile: user.mobile,
          department: user.department,
          position: user.position,
          lastLoginTime: user.lastLoginTime,
        },
      }

      await this.repository.update(
        user.id,
        { lastLoginTime: (new Date()).toISOString() },
      )

      this.event.emit(
        toEventName(AuthUserLoginEvent.name),
        new AuthUserLoginEvent(user.id, username),
      )

      return {
        token: this.jwt.sign(payload),
      } as IAuthUserToken
    }
    catch (e) {
      throw new FailedException('登录员工账号', e.message, e.status)
    }
  }

  /**
   * 禁用员工账号
   *
   * @param id 员工账号 ID
   * @throws {FailedException} 禁用员工账号失败
   * @throws {NotFoundException} 员工账号不存在
   * @event AuthUserBlockedEvent
   */
  async blockUser(id: number) {
    try {
      const user = await this.repository.findOneBy({ id })

      if (!user)
        throw new FailedException('员工账号不存在')

      await this.repository.update(id, { status: AuthUserStatus.BLOCKED })

      this.event.emit(
        toEventName(AuthUserBlockedEvent.name),
        new AuthUserBlockedEvent(id, user.name),
      )
    }
    catch (e) {
      throw new FailedException('禁用员工账号', e.message, e.status)
    }
  }

  /**
   * 恢复员工账号
   *
   * @param id 员工账号 ID
   * @throws {FailedException} 恢复员工账号失败
   * @throws {NotFoundException} 员工账号不存在
   * @event AuthUserUnblockedEvent
   */
  async unblockUser(id: number) {
    try {
      const user = await this.repository.findOneBy({ id })

      if (!user)
        throw new FailedException('员工账号不存在')

      await this.repository.update(id, { status: AuthUserStatus.NORMAL })

      this.event.emit(
        toEventName(AuthUserUnblockedEvent.name),
        new AuthUserUnblockedEvent(id, user.name),
      )
    }
    catch (e) {
      throw new FailedException('恢复员工账号', e.message, e.status)
    }
  }

  /**
   * 锁定员工账号
   *
   * @param id 员工账号 ID
   * @throws {FailedException} 锁定员工账号失败
   * @throws {NotFoundException} 员工账号不存在
   * @event AuthUserLockedEvent
   */
  async lockUser(id: number) {
    try {
      const user = await this.repository.findOneBy({ id })

      if (!user)
        throw new FailedException('员工账号不存在')

      await this.repository.update(
        id,
        {
          status: AuthUserStatus.LOCKED,
          lockedTime: (new Date()).toISOString(),
        },
      )

      this.event.emit(
        toEventName(AuthUserLockedEvent.name),
        new AuthUserLockedEvent(id, user.name),
      )
    }
    catch (e) {
      throw new FailedException('锁定员工账号', e.message)
    }
  }

  /**
   * 解锁员工账号
   *
   * @param id 员工账号 ID
   * @throws {FailedException} 解锁员工账号失败
   * @throws {NotFoundException} 员工账号不存在
   * @event AuthUserUnlockedEvent
   */
  async unlockUser(id: number) {
    try {
      const user = await this.repository.findOneBy({ id })

      if (!user)
        throw new FailedException('员工账号不存在')

      await this.repository.update(
        id,
        { status: AuthUserStatus.NORMAL },
      )

      this.event.emit(
        toEventName(AuthUserUnlockedEvent.name),
        new AuthUserUnlockedEvent(id, user.name),
      )
    }
    catch (e) {
      throw new FailedException('解锁员工账号', e.message)
    }
  }

  /**
   * 删除员工账号
   *
   * @param id 员工账号 ID
   * @throws {FailedException} 删除员工账号失败
   * @event AuthUserDeletedEvent
   */
  async delete(id: number) {
    try {
      const user = await this.repository.findOneBy({ id })

      if (user) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(AuthUserDeletedEvent.name),
          new AuthUserDeletedEvent(id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除员工账号', e.message)
    }
  }
}
