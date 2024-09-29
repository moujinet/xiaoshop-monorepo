import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { SystemDepartmentService } from './service'
import { SystemDepartmentPayload } from './dto/payload'
import {
  DeleteSystemDepartmentRequest,
  GetSystemDepartmentInfoRequest,
} from './dto/request'

@Controller('admin/system/department')
export class SystemDepartmentAdminController {
  constructor(
    private readonly service: SystemDepartmentService,
  ) {}

  /**
   * 获取部门列表
   */
  @Get('list')
  @Admin()
  async list() {
    return this.service.findNestedList()
  }

  /**
   * 获取部门字典列表
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findNestedDictList()
  }

  /**
   * 获取根部门列表
   */
  @Get('root/list')
  @Admin()
  async rootList() {
    return this.service.findRootList()
  }

  /**
   * 获取部门信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetSystemDepartmentInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 创建部门
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: SystemDepartmentPayload) {
    return this.service.create(payload)
  }

  /**
   * 更新部门
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetSystemDepartmentInfoRequest,
    @Body() payload: SystemDepartmentPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 删除部门
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteSystemDepartmentRequest) {
    return this.service.delete(data.id)
  }
}
