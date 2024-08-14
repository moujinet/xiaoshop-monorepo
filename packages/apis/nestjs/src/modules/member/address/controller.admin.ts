import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  GetMemberAddressByMemberIdRequest,
  GetMemberAddressListRequest,
  GetMemberAddressPagesRequest,
  MemberAddressInfoResponse,
  MemberAddressListResponse,
  MemberAddressResponse,
} from '@/member/address/dto'
import { MemberAddressService } from '@/member/address/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/收货地址')
@Controller('admin/member/address')
export class MemberAddressAdminController {
  constructor(
    private readonly service: MemberAddressService,
  ) {}

  @ApiOperation({
    summary: '获取「收货地址」列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberAddressListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员收货地址分页列表' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('pages')
  async pages(@Query() query: GetMemberAddressPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取「收货地址」字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberAddressInfoResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员收货地址字典失败' })
  @Get('list')
  async list(@Query() query: GetMemberAddressListRequest) {
    return this.service.findList(query)
  }

  @ApiOperation({
    summary: '获取默认「收货地址」',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberAddressResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员收货地址详情失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('default')
  async findDefaultAddress(@Query() query: GetMemberAddressByMemberIdRequest) {
    return this.service.findDefaultAddress(query.memberId)
  }
}
