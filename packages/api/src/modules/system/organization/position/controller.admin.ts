import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemPositionService } from './service'
import { SystemPositionPayload } from './dto/payload'
import {
  DeleteSystemPositionRequest,
  GetSystemPositionInfoRequest,
  GetSystemPositionListRequest,
  GetSystemPositionPagesRequest,
} from './dto/request'

@Controller('admin/system/position')
export class SystemPositionAdminController {
  constructor(
    private readonly service: SystemPositionService,
  ) {}

  /**
   * 获取部门职位列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemPositionPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取部门职位字典列表
   */
  @Get('dict/list')
  @Admin()
  async dictList(@Query() query: GetSystemPositionListRequest) {
    return this.service.findDict(+query.departmentId)
  }

  /**
   * 获取部门职位信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemPositionInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 创建部门职位
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: SystemPositionPayload) {
    return this.service.create(payload)
  }

  /**
   * 更新部门职位
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetSystemPositionInfoRequest,
    @Body() payload: SystemPositionPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 删除部门职位
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteSystemPositionRequest) {
    return this.service.delete(data.id)
  }
}
