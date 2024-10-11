import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { SystemUserService } from '@/system/auth/domain/user/service'
import {
  DeleteSystemUserRequest,
  GetSystemUserInfoRequest,
  GetSystemUserPagesRequest,
} from '@/system/auth/dto/request'
import {
  CreateSystemUserPayload,
  ResetSystemUserPasswordPayload,
  UpdateSystemUserPayload,
} from '@/system/auth/dto/payload'

@Controller('admin/system/user')
export class SystemUserAdminController {
  constructor(
    private readonly service: SystemUserService,
  ) {}

  /**
   * 获取系统用户列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemUserPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取用户字典列表
   */
  @Get('list')
  @Admin()
  async list() {
    return this.service.findDictList()
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
    return this.service.block(+query.id)
  }

  /**
   * 恢复系统用户
   */
  @Put('unblock')
  @Admin()
  async unblock(@Query() query: GetSystemUserInfoRequest) {
    return this.service.unblock(+query.id)
  }

  /**
   * 恢复锁定系统用户
   */
  @Put('unlock')
  @Admin()
  async unlock(@Query() query: GetSystemUserInfoRequest) {
    return this.service.unlock(+query.id)
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
