import type { ISystemUserRepository, ISystemUserSelect, ISystemUserWhere } from '@/system/auth/model/user/interface'

import { In, Like, Not } from 'typeorm'
import { isStrongPassword } from 'class-validator'
import { Inject, Injectable } from '@nestjs/common'
import {
  type IApiPaginationData,
  type ISystemUserDict,
  type ISystemUserInfo,
  type ISystemUserList,
  SystemUserStatus,
} from '@xiaoshop/shared'

import { comparePassword } from '~/utils/bcrypt'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { SystemUserRepo } from '@/system/auth/model/user/provider'
import { GetSystemUserPagesRequest } from '@/system/auth/dto/request'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'
import { toSystemUserInfo, toSystemUserList } from '@/system/auth/model/user/mapper'
import { CreateSystemUserPayload, UpdateSystemUserPayload } from '@/system/auth/dto/payload'
import { BadRequestException, ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

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
export class SystemUserService {
  constructor(
    @SystemUserRepo()
    private readonly repo: ISystemUserRepository,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 查询用户分页列表
   *
   * @param query 查询条件
   * @returns 用户分页列表
   * @throws {FailedException} 获取用户列表失败
   */
  async findPages(
    query: GetSystemUserPagesRequest,
  ): Promise<IApiPaginationData<ISystemUserList>> {
    try {
      const where: ISystemUserWhere = {}

      if (query.isAdmin)
        where.isAdmin = query.isAdmin

      if (query.status)
        where.status = query.status

      if (query.name)
        where.name = Like(`${query.name}%`)

      if (query.mobile)
        where.mobile = Like(`${query.mobile}%`)

      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(where, page, pagesize)
        .then(({ list, total, page, pagesize }) => ({
          list: toSystemUserList(list),
          total,
          page,
          pagesize,
        }))
    }
    catch (e) {
      throw new FailedException('获取用户列表', e.message)
    }
  }

  /**
   * 获取用户字典列表
   *
   * @returns 用户字典列表
   * @throws {FailedException} 获取用户字典列表失败
   */
  async findDictList(): Promise<ISystemUserDict[]> {
    try {
      return await this.repo.find()
        .then(
          list => toSystemUserList(list),
        )
    }
    catch (e) {
      throw new FailedException('获取用户字典列表', e.message)
    }
  }

  /**
   * 获取用户信息
   *
   * @param id 用户 ID
   * @returns 用户信息
   * @throws {FailedException} 获取用户信息失败
   * @throws {NotFoundException} 用户不存在
   */
  async findById(id: number): Promise<ISystemUserInfo> {
    try {
      const user = await this.repo.findById(id)

      if (!user)
        throw new NotFoundException('用户不存在')

      return toSystemUserInfo(user)
    }
    catch (e) {
      throw new FailedException('获取用户信息', e.message, e.status)
    }
  }

  /**
   * 获取指定 ID 的用户列表
   *
   * @param ids 用户 ID 列表
   * @param select 字段
   * @returns 用户列表
   * @throws {FailedException} 获取指定 ID 的用户列表失败
   */
  async findByIds(ids: number[], select: ISystemUserSelect) {
    try {
      return await this.repo.find(select, {
        id: In(ids),
      })
    }
    catch (e) {
      throw new FailedException('获取指定 ID 的用户列表', e.message)
    }
  }

  /**
   * 创建用户
   *
   * @param data 创建用户信息
   * @throws {FailedException} 创建用户失败
   * @throws {ExistsException} 用户名已存在
   * @throws {ExistsException} 姓名已存在
   * @throws {ExistsException} 手机号已存在
   * @throws {BadRequestException} 密码强度过低
   */
  async create(data: CreateSystemUserPayload) {
    try {
      if (await this.repo.exists({ username: data.username.trim() }))
        throw new ExistsException('用户名已存在')

      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('姓名已存在')

      if (await this.repo.exists({ mobile: data.mobile.trim() }))
        throw new ExistsException('手机号已存在')

      if (!this.validatePassword(data.password))
        throw new BadRequestException('密码强度过低')

      const user = await this.repo.create(data)

      this.event.emit(
        new SystemUserCreateEvent(user.id, user.name),
      )
    }
    catch (e) {
      throw new FailedException('创建用户', e.message, e.status)
    }
  }

  /**
   * 更新用户
   *
   * @param id 用户 ID
   * @param data 更新信息
   * @throws {FailedException} 更新用户失败
   * @throws {NotFoundException} 用户不存在
   * @throws {ExistsException} 手机号已存在
   * @throws {ExistsException} 姓名已存在
   */
  async update(id: number, data: UpdateSystemUserPayload) {
    try {
      const user = await this.repo.findById(id)

      if (!user)
        throw new NotFoundException('用户不存在')

      if (await this.repo.exists({ id: Not(id), mobile: data.mobile.trim() }))
        throw new ExistsException('手机号已存在')

      if (await this.repo.exists({ id: Not(id), name: data.name.trim() }))
        throw new ExistsException('姓名已存在')

      const updated = await this.repo.update(user, data)

      this.event.emit(
        new SystemUserUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新用户', e.message, e.status)
    }
  }

  /**
   * 重置用户密码
   *
   * @param id 用户 ID
   * @param password 用户密码
   * @throws {FailedException} 重置用户密码失败
   * @throws {NotFoundException} 用户不存在
   * @throws {BadRequestException} 密码强度过低
   * @throws {BadRequestException} 新密码不能与原密码相同
   */
  async resetPassword(id: number, password: string) {
    try {
      const user = await this.repo.findById(
        id,
        ['id', 'status', 'name', 'password'],
      )

      if (!user || user.status !== SystemUserStatus.NORMAL)
        throw new NotFoundException('用户不存在')

      if (!this.validatePassword(password))
        throw new BadRequestException('密码强度过低')

      if (await comparePassword(password, user.password))
        throw new BadRequestException('新密码不能与原密码相同')

      await this.repo.updatePassword(id, password)

      this.event.emit(
        new SystemUserResetPasswordEvent(user.id, user.name),
      )
    }
    catch (e) {
      throw new FailedException('重置用户密码', e.message, e.status)
    }
  }

  /**
   * 禁用用户
   *
   * @param id 用户 ID
   * @throws {FailedException} 禁用用户失败
   * @throws {NotFoundException} 用户不存在
   */
  async block(id: number) {
    try {
      const user = await this.repo.findById(
        id,
        ['id', 'name', 'status'],
      )

      if (!user)
        throw new NotFoundException('用户不存在')

      if (user.status === SystemUserStatus.NORMAL) {
        await this.repo.updateStatus(id, SystemUserStatus.BLOCKED)

        this.event.emit(
          new SystemUserBlockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('禁用用户', e.message, e.status)
    }
  }

  /**
   * 恢复禁用用户
   *
   * @param id 用户 ID
   * @throws {FailedException} 恢复禁用用户失败
   * @throws {NotFoundException} 用户不存在
   */
  async unblock(id: number) {
    try {
      const user = await this.repo.findById(
        id,
        ['id', 'name', 'status'],
      )

      if (!user)
        throw new NotFoundException('用户不存在')

      if (user.status === SystemUserStatus.BLOCKED) {
        await this.repo.updateStatus(id, SystemUserStatus.NORMAL)

        this.event.emit(
          new SystemUserUnblockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('恢复禁用用户', e.message, e.status)
    }
  }

  /**
   * 解锁用户
   *
   * @param id 用户 ID
   * @throws {FailedException} 解锁用户失败
   * @throws {NotFoundException} 用户不存在
   */
  async unlock(id: number) {
    try {
      const user = await this.repo.findById(
        id,
        ['id', 'name', 'status'],
      )

      if (!user)
        throw new NotFoundException('用户不存在')

      if (user.status === SystemUserStatus.LOCKED) {
        await this.repo.updateStatus(id, SystemUserStatus.NORMAL)

        this.event.emit(
          new SystemUserAdminUnlockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('解锁用户', e.message, e.status)
    }
  }

  /**
   * 删除用户
   *
   * @param id 用户 ID
   * @throws {FailedException} 删除用户失败
   */
  async delete(id: number) {
    try {
      const user = await this.repo.findById(id, ['id', 'name'])

      if (user) {
        await this.repo.destroy(id)

        this.event.emit(
          new SystemUserDeleteEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除用户', e.message)
    }
  }

  /**
   * 验证密码
   *
   * @param password 登录密码
   */
  private async validatePassword(password: string): Promise<boolean> {
    const options = await this.setting.find('system.auth.security.*')

    return isStrongPassword(password, {
      minLength: options['system.auth.security.passwordLength'],
      minNumbers: options['system.auth.security.passwordStrength'].includes('number') ? 1 : undefined,
      minLowercase: options['system.auth.security.passwordStrength'].includes('lower') ? 1 : undefined,
      minUppercase: options['system.auth.security.passwordStrength'].includes('upper') ? 1 : undefined,
    })
  }
}
