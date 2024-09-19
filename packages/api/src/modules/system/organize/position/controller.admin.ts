import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemDepartmentPositionService } from './service'
import {
  DeleteSystemDepartmentPositionRequest,
  GetSystemDepartmentPositionInfoRequest,
  GetSystemDepartmentPositionListRequest,
  GetSystemDepartmentPositionPagesRequest,
  SystemDepartmentPositionPayload,
} from './dto'

@Controller('admin/system/department/position')
export class SystemDepartmentPositionAdminController {
  constructor(
    private readonly service: SystemDepartmentPositionService,
  ) {}

  /**
   * 获取部门职位列表
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetSystemDepartmentPositionPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 获取部门职位字典列表
   */
  @Get('dict/list')
  @Admin()
  async dictList(@Query() query: GetSystemDepartmentPositionListRequest) {
    return this.service.findDict(+query.departmentId)
  }

  /**
   * 获取部门职位信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemDepartmentPositionInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 创建部门职位
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: SystemDepartmentPositionPayload) {
    return this.service.create(payload)
  }

  /**
   * 更新部门职位
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetSystemDepartmentPositionInfoRequest,
    @Body() payload: SystemDepartmentPositionPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 删除部门职位
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteSystemDepartmentPositionRequest) {
    return this.service.delete(data.id)
  }
}
