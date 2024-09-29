import type { ISystemLoginSignData } from '@xiaoshop/shared'

import { ClsService } from 'nestjs-cls'
import { Body, Controller, Get, HttpCode, Inject, Post, Put } from '@nestjs/common'

import { Admin, Public } from '@/system/auth/decorators'

import { SystemUserSessionService } from './service'
import { ChangeSystemUserPasswordPayload, SystemUserLoginPayload } from './dto/payload'

@Controller('admin')
export class SystemUserSessionController {
  constructor(
    private readonly service: SystemUserSessionService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 系统用户登录
   */
  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() payload: SystemUserLoginPayload) {
    return this.service.login(payload.username, payload.password)
  }

  /**
   * 获取当前登录用户
   */
  @Get('profile')
  @Admin()
  async profile() {
    return this.cls.get<ISystemLoginSignData['user']>('USER')
  }

  /**
   * 当前登录用户更新密码
   */
  @Put('profile/password/update')
  @Admin()
  async changePassword(@Body() payload: ChangeSystemUserPasswordPayload) {
    const query = this.cls.get<ISystemLoginSignData['user']>('USER')

    return this.service.changePassword(
      +query.id,
      payload.password,
      payload.newPassword,
    )
  }
}
