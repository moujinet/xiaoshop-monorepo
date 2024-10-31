import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { LogisticFreightTemplateService } from '@/logistic/freight/domain/template/service'
import {
  CreateLogisticFreightTemplatePayload,
  UpdateLogisticFreightTemplatePayload,
} from '@/logistic/freight/dto/payload'
import {
  DeleteLogisticFreightTemplateRequest,
  GetLogisticFreightTemplateListRequest,
  GetLogisticFreightTemplatePagesRequest,
  GetLogisticFreightTemplateRequest,
} from '@/logistic/freight/dto/request'

@Controller('admin/logistic/freight/template')
export class LogisticFreightTemplateAdminController {
  constructor(
    private readonly service: LogisticFreightTemplateService,
  ) {}

  /**
   * Get Logistic Freight Template Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetLogisticFreightTemplatePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Logistic Freight Template Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList(@Query() query: GetLogisticFreightTemplateListRequest) {
    return this.service.findDictList(query.isEnabled)
  }

  /**
   * Get Logistic Freight Template Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetLogisticFreightTemplateRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Logistic Freight Template
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateLogisticFreightTemplatePayload) {
    return this.service.create(payload)
  }

  /**
   * Update Logistic Freight Template
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetLogisticFreightTemplateRequest,
    @Body() payload: UpdateLogisticFreightTemplatePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Logistic Freight Template
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteLogisticFreightTemplateRequest) {
    return this.service.delete(data.id)
  }
}
