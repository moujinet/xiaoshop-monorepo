import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { ResourceGroupService } from './service'
import { ResourceGroupPayload } from './dto/payload'
import {
  DeleteResourceGroupRequest,
  GetResourceGroupInfoRequest,
  GetResourceGroupNestedListRequest,
} from './dto/request'

@Controller('admin/resource/group')
export class ResourceGroupAdminController {
  constructor(
    private readonly service: ResourceGroupService,
  ) {}

  /**
   * 获取素材分组列表
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetResourceGroupNestedListRequest) {
    return this.service.findNestedList(+query.type)
  }

  /**
   * 获取素材分组根列表
   */
  @Get('root/list')
  @Admin()
  async rootList(@Query() query: GetResourceGroupNestedListRequest) {
    return this.service.findRootList(+query.type)
  }

  /**
   * 获取素材分组信息
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetResourceGroupInfoRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * 创建素材分组
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: ResourceGroupPayload) {
    return this.service.create(payload)
  }

  /**
   * 更新素材分组
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetResourceGroupInfoRequest,
    @Body() payload: ResourceGroupPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * 删除素材分组
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteResourceGroupRequest) {
    return this.service.delete(data.id)
  }
}
