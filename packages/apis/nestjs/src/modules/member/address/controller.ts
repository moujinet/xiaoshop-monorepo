import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { MemberAddressService } from '@/member/address/service'
import {
  DeleteMemberAddressRequest,
  GetMemberAddressByIdRequest,
  GetMemberAddressByMemberRequest,
  GetMemberAddressRequest,
  MemberAddressPayload,
  MemberAddressResponse,
} from '@/member/address/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'

@ApiTags('会员地址')
@Controller('member/address')
export class MemberAddressController {
  constructor(
    private readonly address: MemberAddressService,
  ) {}

  @ApiOperation({
    summary: '获取会员地址列表',
  })
  @ApiListedResponse(MemberAddressResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list(@Query() query: GetMemberAddressByMemberRequest) {
    return this.address.findList(+query.memberId)
  }

  @ApiOperation({
    summary: '获取会员地址详情',
  })
  @ApiObjectResponse(MemberAddressResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员地址不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberAddressRequest) {
    return this.address.findDetail(+query.id, +query.memberId)
  }

  @ApiOperation({
    summary: '创建会员地址',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员地址已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberAddressPayload) {
    return this.address.create(data)
  }

  @ApiOperation({
    summary: '更新会员地址',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员地址不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员地址已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetMemberAddressByIdRequest, @Body() data: MemberAddressPayload) {
    return this.address.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除会员地址',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberAddressRequest) {
    return this.address.delete(+data.id, +data.memberId)
  }
}
