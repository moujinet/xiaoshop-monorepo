import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { LogisticExpressService } from './service'
import {
  DeleteLogisticExpressInfoRequest,
  GetLogisticExpressInfoRequest,
  GetLogisticExpressPagesRequest,
  LogisticExpressPayload,
} from './dto'

@Controller('admin/logistic/express')
export class LogisticExpressAdminController {
  constructor(
    private readonly service: LogisticExpressService,
  ) {}

  @Get('pages')
  @Admin()
  async pages(@Query() query: GetLogisticExpressPagesRequest) {
    return this.service.findPages(query)
  }

  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetLogisticExpressInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: LogisticExpressPayload) {
    return this.service.create(payload)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetLogisticExpressInfoRequest,
    @Body() payload: LogisticExpressPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteLogisticExpressInfoRequest) {
    return this.service.delete(data.id)
  }
}
