import { Body, Controller, Get, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { AuditMemberUnregisterPayload } from '@/member/unregister/dto/payload'
import { MemberUnregisterAuditService } from '@/member/unregister/domain/audit/service'
import { GetMemberUnregisterPagesRequest, GetMemberUnregisterRequest } from '@/member/unregister/dto/request'

@Controller('admin/member/unregister')
export class MemberUnregisterAuditController {
  constructor(
    private readonly service: MemberUnregisterAuditService,
  ) {}

  /**
   * Get Member Unregister Pages
   */
  @Get('apply/pages')
  @Admin()
  async pages(@Query() query: GetMemberUnregisterPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Member Unregister Detail
   */
  @Get('apply/detail')
  @Admin()
  async detail(@Query() query: GetMemberUnregisterRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Audit Member Unregister
   */
  @Put('audit')
  @Admin()
  async audit(
    @Query() query: GetMemberUnregisterRequest,
    @Body() payload: AuditMemberUnregisterPayload,
  ) {
    return this.service.audit(+query.id, payload)
  }
}
