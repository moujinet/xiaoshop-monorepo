import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Inject, Injectable } from '@nestjs/common'
import { AUTH_IS_ADMIN } from './constants'
import { StaffAccountService } from '@/staffs/account/service'
import { FailedException } from '~/common/exception'

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly staff: StaffAccountService,

    @Inject()
    private readonly jwt: JwtService,
  ) {}

  /**
   * 登录员工账号
   *
   * @param username 员工账号
   * @param password 员工密码
   * @returns Promise<{ token: string }>
   * @throws {FailedException} 登录失败
   */
  async loginStaff(username: string, password: string) {
    try {
      const account = await this.staff.findByUsername(username)

      if (account.password !== await bcrypt.hash(password, account.salt))
        throw new FailedException('密码错误')

      await this.staff.updateLoginTime(account.id)

      const payload = {
        scope: AUTH_IS_ADMIN,
        user: {
          id: account.id,
          username: account.username,
          name: account.name,
          isAdmin: account.isAdmin,
          roles: account.roles.map(role => ({
            id: role.id,
            name: role.name,
            permissions: role.permissions,
          })),
          department: account.department,
          position: account.position,
        },
      }

      return {
        token: this.jwt.sign(payload),
      }
    }
    catch (e) {
      throw new FailedException('登录员工账号', e.message, e.status)
    }
  }
}
