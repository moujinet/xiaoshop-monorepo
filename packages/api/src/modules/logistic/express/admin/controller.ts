import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { ExpressPayload } from './dto/payload'
import { LogisticExpressAdminService } from './service'
import {
  DeleteExpressRequest,
  GetExpressInfoRequest,
  GetExpressPagesRequest,
} from './dto/request'

@Controller('admin/logistic/express')
export class LogisticExpressAdminController {
  constructor(
    private readonly service: LogisticExpressAdminService,
  ) {}

  @Get('pages')
  @Admin()
  async pages(@Query() query: GetExpressPagesRequest) {
    return this.service.findPages(query)
  }

  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetExpressInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: ExpressPayload) {
    return this.service.create(payload)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetExpressInfoRequest,
    @Body() payload: ExpressPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteExpressRequest) {
    return this.service.delete(data.id)
  }
}
