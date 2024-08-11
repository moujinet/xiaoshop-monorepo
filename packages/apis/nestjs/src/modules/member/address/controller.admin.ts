import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  DeleteMemberAddressRequest,
  GetMemberAddressByMemberIdRequest,
  GetMemberAddressListRequest,
  GetMemberAddressPagesRequest,
  GetMemberAddressRequest,
  MemberAddressInfoResponse,
  MemberAddressListResponse,
  MemberAddressPayload,
  MemberAddressResponse,
} from '@/member/address/dto'
import { MemberAddressService } from '@/member/address/service'

@ApiTags('管理/会员/收货地址')
@Controller('admin/member/address')
export class MemberAddressAdminController {
  constructor(
    private readonly service: MemberAddressService,
  ) {}

  @ApiOperation({
    summary: '获取「收货地址」列表',
  })
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
  @ApiListedResponse(MemberAddressInfoResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员收货地址字典失败' })
  @Get('list')
  async list(@Query() query: GetMemberAddressListRequest) {
    return this.service.findList(query)
  }

  @ApiOperation({
    summary: '获取「收货地址」详情',
  })
  @ApiObjectResponse(MemberAddressResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员收货地址详情失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员收货地址未找到' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail')
  async detail(@Query() query: GetMemberAddressRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '获取默认「收货地址」',
  })
  @ApiObjectResponse(MemberAddressResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员收货地址详情失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('default')
  async findDefaultAddress(@Query() query: GetMemberAddressByMemberIdRequest) {
    return this.service.findDefaultAddress(query.memberId)
  }

  @ApiOperation({
    summary: '设置默认「收货地址」',
  })
  @ApiObjectResponse(MemberAddressResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '设置默认收货地址失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员收货地址' })
  @Put('default/update')
  async setDefaultAddress(
    @Query() query: GetMemberAddressByMemberIdRequest,
    @Body('id') id: number,
  ) {
    return this.service.setDefault(query.memberId, id)
  }

  @ApiOperation({
    summary: '创建「收货地址」',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员收货地址」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberAddressPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「收货地址」',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员收货地址」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员收货地址」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetMemberAddressRequest,
    @Body() data: MemberAddressPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「收货地址」',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberAddressRequest) {
    return this.service.delete(data.id)
  }
}
