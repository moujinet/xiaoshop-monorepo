import type { ISystemUserRepository } from '@/system/auth/model/user/interface'

import { ClsService } from 'nestjs-cls'
import { JwtService } from '@nestjs/jwt'
import { isStrongPassword } from 'class-validator'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  type ISystemLoginSignData,
  type ISystemLoginToken,
  SystemUserStatus,
  YesOrNo,
} from '@xiaoshop/shared'

import { toDict } from '~/utils/transformer'
import { comparePassword } from '~/utils/bcrypt'
import { SYSTEM_USER_STATUSES } from '~/dicts/system'
import { WhoisService } from '~/services/whois/service'
import { toUtcDateTime, utcNow } from '~/utils/formatter'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { IS_ADMIN_KEY, REQUEST_IP_KEY } from '~/common/constants'
import { SystemUserRepo } from '@/system/auth/model/user/provider'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'
import { BadRequestException, FailedException, NotFoundException } from '~/common/exceptions'

import {
  SystemUserAutoLockEvent,
  SystemUserAutoUnlockEvent,
  SystemUserLoginEvent,
  SystemUserWrongPasswordEvent,
} from './events'

@Injectable()
export class SystemSessionService {
  private readonly logger = new Logger(SystemSessionService.name)

  constructor(
    @SystemUserRepo()
    private readonly repo: ISystemUserRepository,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(JwtService)
    private readonly jwt: JwtService,

    @Inject(ClsService)
    private readonly cls: ClsService,

    @Inject(WhoisService)
    private readonly whois: WhoisService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
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
        status: SystemUserStatus.NORMAL,
        username,
      }, {
        id: true,
        isAdmin: true,
        status: true,
        username: true,
        password: true,
        name: true,
        mobile: true,
        roles: { id: true, name: true },
        lastLoginIp: true,
        lastLoginTime: true,
        lastLockedIp: true,
        lockedTime: true,
      })

      if (!user)
        throw new NotFoundException('用户不存在')

      if (await comparePassword(password, user.password) === false) {
        this.event.emit(new SystemUserWrongPasswordEvent(user.id, user.username))

        throw new BadRequestException('密码错误')
      }

      const signData: ISystemLoginSignData = {
        scope: IS_ADMIN_KEY,
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
          status: toDict(user.status, SYSTEM_USER_STATUSES),
          username: user.username,
          name: user.name,
          mobile: user.mobile,
          roles: user.roles,
          lastLoginIp: user.lastLoginIp,
          lastLoginTime: user.lastLoginTime,
          lastLockedIp: user.lastLockedIp,
          lockedTime: user.lockedTime,
        },
      }

      const ip = this.cls.get<string>(REQUEST_IP_KEY)
      const whois = await this.whois.search(ip)

      await this.repo.updateLoginTime(
        user.id,
        `${ip} (${whois.region})`,
        utcNow(),
      )

      this.event.emit(new SystemUserLoginEvent(user.id, user.username))

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
   * @param id 用户 ID
   * @param oldPassword 原密码
   * @param newPassword 新密码
   * @throws {NotFoundException} 用户不存在
   * @throws {BadRequestException} 原密码不正确
   * @throws {BadRequestException} 新密码强度不足
   * @throws {FailedException} 修改密码失败
   */
  async changePassword(id: number, oldPassword: string, newPassword: string) {
    try {
      const user = await this.repo.findById(
        id,
        ['id', 'status', 'name', 'password'],
      )

      if (!user || user.status !== SystemUserStatus.NORMAL)
        throw new NotFoundException('用户不存在')

      if (!this.validatePassword(newPassword))
        throw new BadRequestException('密码强度过低')

      if (await comparePassword(newPassword, user.password))
        throw new BadRequestException('新密码不能与原密码相同')

      if (await comparePassword(oldPassword, user.password) === false)
        throw new BadRequestException('原密码不正确')

      await this.repo.updatePassword(id, newPassword)
    }
    catch (e) {
      throw new FailedException('修改密码', e.message, e.status)
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
      const user = await this.repo.findById(
        id,
        ['id', 'name', 'status'],
      )

      if (!user)
        throw new NotFoundException('用户不存在')

      if (user.status === SystemUserStatus.NORMAL) {
        await this.repo.updateStatus(id, SystemUserStatus.LOCKED)

        const ip = this.cls.get<string>(REQUEST_IP_KEY)
        const whois = await this.whois.search(ip)

        await this.repo.updateLockTime(
          user.id,
          `${ip} (${whois.region})`,
          utcNow(),
        )

        this.event.emit(
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
      const user = await this.repo.findById(
        id,
        ['id', 'name', 'status'],
      )

      if (!user)
        throw new NotFoundException('用户不存在')

      if (user.status === SystemUserStatus.LOCKED) {
        await this.repo.updateStatus(id, SystemUserStatus.NORMAL)

        this.event.emit(
          new SystemUserAutoUnlockEvent(user.id, user.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('解锁系统用户', e.message, e.status)
    }
  }

  /**
   * 解锁超过 60 分钟的超级管理员 (30 分钟执行一次)
   */
  @Cron(
    CronExpression.EVERY_30_MINUTES,
    { name: '@SystemSessionUnlock' },
  )
  async handleSystemSessionUnlock() {
    try {
      const users = await this.repo.find(['id', 'name', 'lockedTime'], {
        isAdmin: YesOrNo.YES,
        status: SystemUserStatus.LOCKED,
      })

      if (users.length === 0)
        return

      Promise.all(
        users.map(
          user => () => {
            if (toUtcDateTime(user.lockedTime).add(1, 'hour') >= toUtcDateTime())
              return this.unlock(user.id)
          },
        ),
      )
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
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
