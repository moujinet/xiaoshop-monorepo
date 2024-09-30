import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { ClsService } from 'nestjs-cls'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { isStrongPassword } from 'class-validator'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  type ISystemLoginSignData,
  type ISystemLoginToken,
  type ISystemUserLockedList,
  SystemUserStatus,
  YesOrNo,
} from '@xiaoshop/shared'

import { nowStr } from '~/utils/datetime'
import { SYSTEM_USER_STATUSES } from '~/dicts'
import { WhoisService } from '~/services/whois'
import { ADMIN_KEY } from '@/system/auth/constants'
import { toDict, toEventName } from '~/utils/transformers'
import { SystemUserEntity } from '@/system/auth/user/entity'
import { SystemSettingService } from '@/system/setting/setting/service'
import { BadRequestException, FailedException } from '~/common/exceptions'

import {
  SystemUserAutoLockEvent,
  SystemUserAutoUnlockEvent,
  SystemUserLoginEvent,
  SystemUserWrongPasswordEvent,
} from './events'

@Injectable()
export class SystemUserSessionService {
  constructor(
    @InjectRepository(SystemUserEntity)
    private readonly repo: Repository<SystemUserEntity>,

    @Inject(SystemSettingService)
    private readonly setting: SystemSettingService,

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
   * 登录系统
   *
   * @param username 登录用户名
   * @param password 登录密码
   * @returns 登录成功后的令牌
   */
  async login(username: string, password: string): Promise<ISystemLoginToken> {
    try {
      const user = await this.repo.findOne({
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
        scope: ADMIN_KEY,
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

      await this.repo.save(user)

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
   * 修改密码
   *
   * @param id 系统用户 ID
   * @param oldPassword 原密码
   * @param newPassword 新密码
   * @throws {NotFoundException} 系统用户不存在
   * @throws {BadRequestException} 原密码不正确
   * @throws {BadRequestException} 新密码强度不足
   * @throws {FailedException} 修改密码失败
   */
  async changePassword(id: number, oldPassword: string, newPassword: string) {
    try {
      const user = await this.repo.findOne({
        select: ['id', 'password', 'salt'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (!this.validatePassword(newPassword))
        throw new BadRequestException('新密码强度不足')

      if (user.password !== await bcrypt.hash(oldPassword, user.salt))
        throw new BadRequestException('原密码不正确')

      user.salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(newPassword, user.salt)

      await this.repo.save(user)
    }
    catch (e) {
      throw new FailedException('修改密码', e.message, e.status)
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
      return await this.repo.find({
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
   * 锁定系统用户
   *
   * @param id 系统用户 ID
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 锁定系统用户失败
   */
  async lock(id: number) {
    try {
      const user = await this.repo.findOne({
        select: ['id', 'name', 'status'],
        where: { id },
      })

      if (!user)
        throw new NotFoundException('系统用户')

      if (user.status === SystemUserStatus.NORMAL) {
        const ip = this.cls.get<string>('IP')
        const whois = await this.whois.search(ip)

        user.status = SystemUserStatus.LOCKED
        user.lastLockedIp = `${ip} (${whois?.region})`
        user.lockedTime = nowStr()

        await this.repo.save(user)

        this.event.emit(
          toEventName(SystemUserAutoLockEvent.name),
          new SystemUserAutoLockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('锁定系统用户', e.message, e.status)
    }
  }

  /**
   * 解锁系统用户
   *
   * @param id 系统用户 ID
   * @throws {NotFoundException} 系统用户不存在
   * @throws {FailedException} 解锁系统用户失败
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
          toEventName(SystemUserAutoUnlockEvent.name),
          new SystemUserAutoUnlockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('解锁系统用户', e.message, e.status)
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
