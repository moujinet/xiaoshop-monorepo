import { ClsService } from 'nestjs-cls'
import { ISystemLoginSignData } from '@xiaoshop/shared'
import { Body, Controller, Get, HttpCode, Inject, Post, Put } from '@nestjs/common'

import { Admin, Public } from '~/common/decorators'
import { REQUEST_ADMIN_KEY } from '~/common/constants'
import { SystemSessionService } from '@/system/auth/domain/session/service'
import {
  ChangeSystemUserPasswordPayload,
  SystemUserLoginPayload,
} from '@/system/auth/dto/payload'

@Controller('admin')
export class SystemUserSessionController {
  constructor(
    private readonly service: SystemSessionService,

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
    return this.cls.get<ISystemLoginSignData['user']>(REQUEST_ADMIN_KEY)
  }

  /**
   * 当前登录用户更新密码
   */
  @Put('password/update')
  @Admin()
  async changePassword(@Body() payload: ChangeSystemUserPasswordPayload) {
    const query = this.cls.get<ISystemLoginSignData['user']>(REQUEST_ADMIN_KEY)

    return this.service.changePassword(
      +query.id,
      payload.password,
      payload.newPassword,
    )
  }
}
