import { Body, Controller, Delete, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { AssetResourceService } from '@/asset/domain/resource/service'
import { DeleteAssetResourceRequest, GetAssetResourcePagesRequest, GetAssetResourceRequest } from '@/asset/dto/request'

@Controller('admin/asset/resource')
export class AssetResourceAdminController {
  constructor(
    private readonly service: AssetResourceService,
  ) {}

  /**
   * Get Asset Resource Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetAssetResourcePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Asset Resource Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetAssetResourceRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Delete Asset Resource
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteAssetResourceRequest) {
    return this.service.delete(data.id)
  }
}
