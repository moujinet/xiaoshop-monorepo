import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { LogisticsCompanyService } from '@/logistics/company/service'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'
import { DeleteLogisticsCompanyRequest, GetLogisticsCompanyRequest, LogisticsCompanyListResponse, LogisticsCompanyPayload, LogisticsCompanyResponse } from '@/logistics/company/dto'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/物流发货/物流公司')
@Controller('admin/logistics/company')
export class LogisticsCompanyAdminController {
  constructor(
    private readonly service: LogisticsCompanyService,
  ) {}

  @ApiOperation({
    summary: '获取物流公司列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(LogisticsCompanyListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取物流公司详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(LogisticsCompanyResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '物流公司不存在' })
  @Get('detail')
  async detail(@Query() query: GetLogisticsCompanyRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建物流公司',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '物流公司已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: LogisticsCompanyPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新物流公司',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '地区不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '地区已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetLogisticsCompanyRequest,
    @Body() data: LogisticsCompanyPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除物流公司',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteLogisticsCompanyRequest) {
    return this.service.delete(data.id)
  }
}
