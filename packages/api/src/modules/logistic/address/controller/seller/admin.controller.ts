import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { LogisticAddressSellerService } from '@/logistic/address/domain/seller/service'
import { CreateLogisticAddressPayload, UpdateLogisticAddressPayload } from '@/logistic/address/dto/payload'
import { DeleteLogisticAddressRequest, GetLogisticAddressListRequest, GetLogisticAddressRequest } from '@/logistic/address/dto/request'

@Controller('admin/logistic/seller/address')
export class LogisticAddressSellerAdminController {
  constructor(
    private readonly service: LogisticAddressSellerService,
  ) {}

  /**
   * Get Seller Address List
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetLogisticAddressListRequest) {
    return this.service.findList(+query.type, query.isDefault)
  }

  /**
   * Get Seller Address Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetLogisticAddressRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Seller Address
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateLogisticAddressPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Seller Address
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetLogisticAddressRequest,
    @Body() payload: UpdateLogisticAddressPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Set Default Seller Address
   */
  @Put('default/update')
  @Admin()
  async setDefault(@Query() query: GetLogisticAddressRequest) {
    return this.service.setDefault(+query.id)
  }

  /**
   * Delete Seller Address
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteLogisticAddressRequest) {
    return this.service.delete(data.id)
  }
}
