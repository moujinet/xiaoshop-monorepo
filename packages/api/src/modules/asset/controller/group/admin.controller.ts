import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { AssetGroupService } from '@/asset/domain/group/service'
import { CreateAssetGroupPayload, UpdateAssetGroupPayload } from '@/asset/dto/payload'
import { DeleteAssetGroupRequest, GetAssetGroupListRequest, GetAssetGroupRequest } from '@/asset/dto/request'

@Controller('admin/asset/group')
export class AssetGroupAdminController {
  constructor(
    private readonly service: AssetGroupService,
  ) {}

  /**
   * Get Asset Group Nested List
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetAssetGroupListRequest) {
    return this.service.findNestedList(query.type)
  }

  /**
   * Get Asset Group Root List
   */
  @Get('root/list')
  @Admin()
  async rootList(@Query() query: GetAssetGroupListRequest) {
    return this.service.findRootList(query.type)
  }

  /**
   * Get Asset Group Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetAssetGroupRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Asset Group
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateAssetGroupPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Asset Group
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetAssetGroupRequest,
    @Body() payload: UpdateAssetGroupPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Asset Group
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteAssetGroupRequest) {
    return this.service.delete(data.id)
  }
}
