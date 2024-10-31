import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { LogisticExpressService } from '@/logistic/express/domain/manage/service'
import {
  CreateLogisticExpressPayload,
  UpdateLogisticExpressPayload,
} from '@/logistic/express/dto/payload'
import {
  DeleteLogisticExpressRequest,
  GetLogisticExpressPagesRequest,
  GetLogisticExpressRequest,
} from '@/logistic/express/dto/request'

@Controller('admin/logistic/express')
export class LogisticExpressAdminController {
  constructor(
    private readonly service: LogisticExpressService,
  ) {}

  /**
   * Get Logistic Express Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetLogisticExpressPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Logistic Express Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Logistic Express Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetLogisticExpressRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Logistic Express
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateLogisticExpressPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Logistic Express
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetLogisticExpressRequest,
    @Body() payload: UpdateLogisticExpressPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Logistic Express
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteLogisticExpressRequest) {
    return this.service.delete(data.id)
  }
}
