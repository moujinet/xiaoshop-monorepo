import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiObjectResponse, ApiPaginatedResponse } from '~/common/response/decorators'
import { AccountResponse, DeleteAccountRequest, GetAccountPagesRequest, GetAccountRequest, RegisterAccountPayload, UpdateAccountPayload } from '@/staffs/account/dto'
import { AccountService } from '@/staffs/account/service'

@ApiTags('员工账号')
@Controller('staffs/account')
export class AccountController {
  constructor(
    private readonly service: AccountService,
  ) {}

  @ApiOperation({
    summary: '获取员工账号列表',
  })
  @ApiPaginatedResponse(AccountResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetAccountPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取员工账号详情',
  })
  @ApiObjectResponse(AccountResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '员工账号不存在' })
  @Get('detail')
  async detail(@Query() query: GetAccountRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建员工账号',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '员工账号已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: RegisterAccountPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新员工账号',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '员工账号不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '员工账号已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetAccountRequest, @Body() data: UpdateAccountPayload) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除员工账号',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteAccountRequest) {
    return this.service.delete(data.id)
  }
}
