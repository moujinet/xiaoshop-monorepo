import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { isStrongPassword } from 'class-validator'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  type IApiPaginationData,
  type ISystemUserInfo,
  type ISystemUserList,
  SystemUserStatus,
  YesOrNo,
} from '@xiaoshop/shared'

import { SYSTEM_USER_STATUSES } from '~/dicts'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { SystemRoleEntity } from '@/system/auth/role/entity'
import { SystemUserEntity } from '@/system/auth/user/entity'
import { SystemSettingService } from '@/system/setting/domain/setting/service'
import { objectToDict, pipeDict, toDict, toEventName } from '~/utils/transformers'
import { BadRequestException, ExistsException, FailedException } from '~/common/exceptions'

import { GetSystemUserPagesRequest } from './dto/request'
import { CreateSystemUserPayload, UpdateSystemUserPayload } from './dto/payload'
import {
  SystemUserAdminUnlockEvent,
  SystemUserBlockEvent,
  SystemUserCreateEvent,
  SystemUserDeleteEvent,
  SystemUserResetPasswordEvent,
  SystemUserUnblockEvent,
  SystemUserUpdateEvent,
} from './events'

@Injectable()
export class SystemUserAdminService {
  constructor(
    @InjectRepository(SystemUserEntity)
    private readonly repo: Repository<SystemUserEntity>,

    @Inject(SystemSettingService)
    private readonly setting: SystemSettingService,

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
      const where: FindOptionsWhere<SystemUserEntity> = {}

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

      const [list, total] = await this.repo.findAndCount({
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
        where,
        skip: (page - 1) * pagesize,
        take: pagesize,
        relations: ['department', 'position', 'roles'],
        order: { lastLoginTime: 'DESC' },
      })

      return {
        list: pipeDict<ISystemUserList>(list, [
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
   * 获取系统用户信息
   *
   * @param id 系统用户 ID
   * @returns 系统用户信息
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 获取系统用户信息失败
   */
  async findById(id: number): Promise<ISystemUserInfo> {
    try {
      const user = await this.repo.findOne({
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
      }
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
   * @throws {BadRequestException} 密码强度不足
   * @throws {FailedException} 创建系统用户失败
   */
  async create(data: CreateSystemUserPayload) {
    try {
      const existsByUsername = await this.repo.existsBy({ username: data.username })

      if (existsByUsername)
        throw new ExistsException('系统用户')

      const existsByMobile = await this.repo.existsBy({ mobile: data.mobile })

      if (existsByMobile)
        throw new ExistsException('系统用户')

      const existsByName = await this.repo.existsBy({ name: data.name })

      if (existsByName)
        throw new ExistsException('系统用户')

      if (!this.validatePassword(data.password))
        throw new BadRequestException('密码强度不足')

      const user = new SystemUserEntity()

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
          const role = new SystemRoleEntity()

          role.id = roleId
          user.roles.push(role)
        }
      }

      const created = await this.repo.save(user)

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
      const founded = await this.repo.existsBy({ id })

      if (!founded)
        throw new NotFoundException('系统用户')

      const existsByMobile = await this.repo.existsBy({
        id: Not(id),
        mobile: data.mobile,
      })

      if (existsByMobile)
        throw new ExistsException('系统用户')

      const existsByName = await this.repo.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (existsByName)
        throw new ExistsException('系统用户')

      const user = new SystemUserEntity()

      user.id = id
      user.name = data.name.trim()
      user.mobile = data.mobile.trim()
      user.isAdmin = data.isAdmin || YesOrNo.NO
      user.departmentId = data.departmentId || 0
      user.positionId = data.positionId || 0
      user.roles = []

      if (data.roleIds && data.roleIds.length > 0) {
        for (const roleId of data.roleIds) {
          const role = new SystemRoleEntity()

          role.id = roleId
          user.roles.push(role)
        }
      }

      const updated = await this.repo.save(user)

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
   * 删除系统用户
   *
   * @param id 系统用户 ID
   * @throws {FailedException} 删除系统用户失败
   */
  async delete(id: number) {
    try {
      const user = await this.repo.findOne({
        select: ['name'],
        where: { id },
      })

      if (user) {
        await this.repo.delete(id)

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

  /**
   * 禁用系统用户
   *
   * @param id 系统用户 ID
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 禁用系统用户失败
   */
  async block(id: number) {
    try {
      const user = await this.repo.findOne({
        select: ['id', 'name', 'status'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (user.status === SystemUserStatus.NORMAL) {
        user.status = SystemUserStatus.BLOCKED

        await this.repo.save(user)

        this.event.emit(
          toEventName(SystemUserBlockEvent.name),
          new SystemUserBlockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('禁用系统用户', e.message, e.status)
    }
  }

  /**
   * 恢复系统用户
   *
   * @param id 系统用户 ID
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 恢复系统用户失败
   */
  async unblock(id: number) {
    try {
      const user = await this.repo.findOne({
        select: ['id', 'name', 'status'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (user.status === SystemUserStatus.BLOCKED) {
        user.status = SystemUserStatus.NORMAL

        await this.repo.save(user)

        this.event.emit(
          toEventName(SystemUserUnblockEvent.name),
          new SystemUserUnblockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('恢复系统用户', e.message, e.status)
    }
  }

  /**
   * 手动解锁系统用户
   *
   * @param id 系统用户 ID
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 手动解锁系统用户失败
   */
  async unlock(id: number) {
    try {
      const user = await this.repo.findOne({
        select: ['id', 'name', 'status'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (user.status === SystemUserStatus.LOCKED) {
        user.status = SystemUserStatus.NORMAL

        await this.repo.save(user)

        this.event.emit(
          toEventName(SystemUserAdminUnlockEvent.name),
          new SystemUserAdminUnlockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('手动解锁系统用户', e.message, e.status)
    }
  }

  /**
   * 重置密码
   *
   * @param id 系统用户 ID
   * @param password 登录密码
   * @throws {NotFoundException} 系统用户不存在
   * @throws {BadRequestException} 密码强度不足
   * @throws {FailedException} 重置密码失败
   */
  async resetPassword(id: number, password: string) {
    try {
      const user = await this.repo.findOne({
        select: ['id', 'name', 'password', 'salt'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (!this.validatePassword(password))
        throw new BadRequestException('密码强度不足')

      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, user.salt)

      await this.repo.save(user)

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
   * 验证密码
   *
   * @param password 登录密码
   */
  private async validatePassword(password: string): Promise<boolean> {
    const options = await this.setting.findByKey('system.auth.security.*')

    return isStrongPassword(password, {
      minLength: options['system.auth.security.passwordLength'],
      minNumbers: options['system.auth.security.passwordStrength'].includes('number') ? 1 : undefined,
      minLowercase: options['system.auth.security.passwordStrength'].includes('lower') ? 1 : undefined,
      minUppercase: options['system.auth.security.passwordStrength'].includes('upper') ? 1 : undefined,
    })
  }
}
