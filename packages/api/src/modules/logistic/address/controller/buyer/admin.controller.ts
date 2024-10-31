import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { LogisticAddressBuyerService } from '@/logistic/address/domain/buyer/service'
import { GetLogisticMemberAddressListRequest, GetLogisticMemberAddressRequest } from '@/logistic/address/dto/request'

@Controller('admin/logistic/buyer/address')
export class LogisticAddressBuyerAdminController {
  constructor(
    private readonly service: LogisticAddressBuyerService,
  ) {}

  /**
   * Get Buyer Address List
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetLogisticMemberAddressListRequest) {
    return this.service.findList(+query.memberId, +query.type, query.isDefault)
  }

  /**
   * Get Buyer Address Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetLogisticMemberAddressRequest) {
    return this.service.findById(+query.id, +query.memberId)
  }
}
