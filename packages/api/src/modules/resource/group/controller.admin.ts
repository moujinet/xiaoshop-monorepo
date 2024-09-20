import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { ResourceGroupService } from './service'
import {
  DeleteResourceGroupInfoRequest,
  GetResourceGroupInfoRequest,
  GetResourceGroupNestedListRequest,
  ResourceGroupPayload,
} from './dto'

@Controller('admin/resource/group')
export class ResourceGroupAdminController {
  constructor(
    private readonly service: ResourceGroupService,
  ) {}

  @Get('list')
  @Admin()
  async list(@Query() query: GetResourceGroupNestedListRequest) {
    return this.service.findNestedList(+query.type)
  }

  @Get('root/list')
  @Admin()
  async rootList(@Query() query: GetResourceGroupNestedListRequest) {
    return this.service.findRootList(+query.type)
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetResourceGroupInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: ResourceGroupPayload) {
    return this.service.create(payload)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetResourceGroupInfoRequest,
    @Body() payload: ResourceGroupPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteResourceGroupInfoRequest) {
    return this.service.delete(data.id)
  }
}
