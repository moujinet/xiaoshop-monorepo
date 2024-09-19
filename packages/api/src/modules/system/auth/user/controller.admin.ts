import { ClsService } from 'nestjs-cls'
import { type ISystemLoginSignData, SystemUserStatus } from '@xiaoshop/shared'
import { Body, Controller, Delete, Get, HttpCode, Inject, Post, Put, Query } from '@nestjs/common'

import { Admin, Public } from '@/system/auth/decorators'

import { SystemUserService } from './service'
import {
  ChangeSystemUserPasswordPayload,
  CreateSystemUserPayload,
  DeleteSystemUserRequest,
  GetSystemUserInfoRequest,
  GetSystemUserPagesRequest,
  ResetSystemUserPasswordPayload,
  SystemUserLogin,
  UpdateSystemUserPayload,
} from './dto'

@Controller('admin/system/user')
export class SystemUserAdminController {
  constructor(
    @Inject(SystemUserService)
    private readonly service: SystemUserService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 系统用户登录
   */
  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() payload: SystemUserLogin) {
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
  @Put('password/update')
  @Admin()
  async changePassword(
    @Body() payload: ChangeSystemUserPasswordPayload,
  ) {
    const query = this.cls.get<GetSystemUserInfoRequest>('USER')

    return this.service.changePassword(
      +query.id,
      payload.password,
      payload.newPassword,
    )
  }

  /**
   * 获取系统用户列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemUserPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取系统用户信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemUserInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 创建系统用户
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateSystemUserPayload) {
    return this.service.create(payload)
  }

  /**
   * 更新系统用户
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetSystemUserInfoRequest,
    @Body() payload: UpdateSystemUserPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 禁用系统用户
   */
  @Put('block')
  @Admin()
  async block(@Query() query: GetSystemUserInfoRequest) {
    return this.service.block(+query.id, SystemUserStatus.BLOCKED)
  }

  /**
   * 恢复系统用户
   */
  @Put('unblock')
  @Admin()
  async unblock(@Query() query: GetSystemUserInfoRequest) {
    return this.service.block(+query.id, SystemUserStatus.NORMAL)
  }

  /**
   * 恢复锁定系统用户
   */
  @Put('unlock')
  @Admin()
  async unlock(@Query() query: GetSystemUserInfoRequest) {
    return this.service.lock(+query.id, SystemUserStatus.NORMAL, true)
  }

  /**
   * 重置密码
   */
  @Put('password/reset')
  @Admin()
  async resetPassword(
    @Query() query: GetSystemUserInfoRequest,
    @Body() payload: ResetSystemUserPasswordPayload,
  ) {
    return this.service.resetPassword(+query.id, payload.password)
  }

  /**
   * 删除系统用户
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteSystemUserRequest) {
    return this.service.delete(data.id)
  }
}
