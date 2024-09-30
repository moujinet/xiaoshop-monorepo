import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemRolePayload } from './dto/payload'
import { SystemRoleAdminService } from './service'
import {
  DeleteSystemRoleRequest,
  GetSystemRoleInfoRequest,
  GetSystemRolePagesRequest,
} from './dto/request'

@Controller('admin/system/role')
export class SystemRoleAdminController {
  constructor(
    private readonly service: SystemRoleAdminService,
  ) {}

  /**
   * 获取系统角色列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemRolePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取系统角色字典列表
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * 获取系统角色信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemRoleInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 创建系统角色
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: SystemRolePayload) {
    return this.service.create(payload)
  }

  /**
   * 更新系统角色
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetSystemRoleInfoRequest,
    @Body() payload: SystemRolePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 删除系统角色
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteSystemRoleRequest) {
    return this.service.delete(data.id)
  }
}
