import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { LogisticAddressService } from './service'
import {
  AddressPayload,
  DeleteAddressRequest,
  GetAddressInfoRequest,
  GetAddressListRequest,
  GetAddressPagesRequest,
} from './dto'

@Controller('admin/logistic/address')
export class LogisticAddressAdminController {
  constructor(
    private readonly service: LogisticAddressService,
  ) {}

  @Get('pages')
  @Admin()
  async pages(@Query() query: GetAddressPagesRequest) {
    return this.service.findPages(query)
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetAddressInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Get('default')
  @Admin()
  async defaultAddress(@Query() query: GetAddressListRequest) {
    return this.service.findDefaultAddress(query)
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
