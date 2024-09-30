import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { FreightTemplatePayload } from './dto/payload'
import { LogisticFreightTemplateAdminService } from './service'
import {
  DeleteFreightTemplateRequest,
  GetFreightTemplateInfoRequest,
  GetFreightTemplatePagesRequest,
} from './dto/request'

@Controller('admin/logistic/freight-template')
export class LogisticFreightTemplateAdminController {
  constructor(
    private readonly service: LogisticFreightTemplateAdminService,
  ) {}

  @Get('pages')
  @Admin()
  async pages(@Query() query: GetFreightTemplatePagesRequest) {
    return this.service.findPages(query)
  }

  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetFreightTemplateInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: FreightTemplatePayload) {
    return this.service.create(payload)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetFreightTemplateInfoRequest,
    @Body() payload: FreightTemplatePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteFreightTemplateRequest) {
    return this.service.delete(data.id)
  }
}
