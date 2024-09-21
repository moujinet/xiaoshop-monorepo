import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { LogisticFreightTemplateService } from './service'
import {
  DeleteLogisticFreightTemplateInfoRequest,
  GetLogisticFreightTemplateInfoRequest,
  GetLogisticFreightTemplatePagesRequest,
  LogisticFreightTemplatePayload,
} from './dto'

@Controller('admin/logistic/freight-template')
export class LogisticFreightTemplateAdminController {
  constructor(
    private readonly service: LogisticFreightTemplateService,
  ) {}

  @Get('pages')
  @Admin()
  async pages(@Query() query: GetLogisticFreightTemplatePagesRequest) {
    return this.service.findPages(query)
  }

  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetLogisticFreightTemplateInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: LogisticFreightTemplatePayload) {
    return this.service.create(payload)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetLogisticFreightTemplateInfoRequest,
    @Body() payload: LogisticFreightTemplatePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteLogisticFreightTemplateInfoRequest) {
    return this.service.delete(data.id)
  }
}
