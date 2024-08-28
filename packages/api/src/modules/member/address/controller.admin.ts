import { Controller, Get, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberAddressService } from '@/member/address/service'
import {
  GetMemberAddressPagesByMemberRequest,
  GetMemberAddressPagesRequest,
  MemberAddressListResponse,
  MemberAddressMemberListResponse,
} from '@/member/address/dto'
import {
  ApiFailedExceptionResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/收货地址')
@Controller('admin/member/address')
export class MemberAddressAdminController {
  constructor(
    private readonly service: MemberAddressService,
  ) {}

  @ApiOperation({
    summary: '获取会员收货地址分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberAddressListResponse)
  @ApiFailedExceptionResponse({ description: '获取会员收货地址分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetMemberAddressPagesByMemberRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取指定会员收货地址分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberAddressMemberListResponse)
  @ApiFailedExceptionResponse({ description: '获取指定会员收货地址分页列表失败' })
  @Get('member/pages')
  async memberPages(@Query() query: GetMemberAddressPagesRequest) {
    return this.service.findMemberPages(query)
  }
}
