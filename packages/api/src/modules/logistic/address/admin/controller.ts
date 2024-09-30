import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { AddressPayload } from './dto/payload'
import { LogisticAddressAdminService } from './service'
import { DeleteAddressRequest, GetAddressInfoRequest, GetAddressListRequest, GetAddressPagesRequest } from './dto/request'

@Controller('admin/logistic/address')
export class LogisticAddressAdminController {
  constructor(
    private readonly service: LogisticAddressAdminService,
  ) {}

  @Get('pages')
  @Admin()
  async pages(@Query() query: GetAddressPagesRequest) {
    return this.service.findPages(query)
  }

  @Get('list')
  @Admin()
  async list(@Query() query: GetAddressListRequest) {
    return this.service.findList(query)
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetAddressInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Put('default/update')
  @Admin()
  async updateDefaultAddress(@Query() query: GetAddressInfoRequest) {
    return this.service.setDefault(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: AddressPayload) {
    return this.service.create(payload)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetAddressInfoRequest,
    @Body() payload: AddressPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Delete('delete')
  @Admin()
  async delete(
    @Body() data: DeleteAddressRequest,
  ) {
    return this.service.delete(data.id)
  }
}
