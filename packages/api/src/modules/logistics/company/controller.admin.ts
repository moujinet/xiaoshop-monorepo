import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LogisticsCompanyService } from '@/logistics/company/service'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
} from '~/common/decorators'
import {
  DeleteLogisticsCompanyRequest,
  GetLogisticsCompanyRequest,
  LogisticsCompanyListResponse,
  LogisticsCompanyPayload,
  LogisticsCompanyResponse,
} from '@/logistics/company/dto'
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
  @ApiFailedExceptionResponse({ description: '获取物流公司列表失败' })
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
  @ApiFailedExceptionResponse({ description: '获取物流公司详情失败' })
  @ApiNotFoundExceptionResponse({ description: '物流公司不存在' })
  @Get('detail')
  async detail(@Query() query: GetLogisticsCompanyRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建物流公司',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建物流公司失败' })
  @ApiExistsExceptionResponse({ description: '物流公司已存在' })
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
  @ApiFailedExceptionResponse({ description: '更新物流公司失败' })
  @ApiNotFoundExceptionResponse({ description: '物流公司不存在' })
  @ApiExistsExceptionResponse({ description: '物流公司已存在' })
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
  @ApiFailedExceptionResponse({ description: '删除物流公司失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteLogisticsCompanyRequest) {
    return this.service.delete(data.id)
  }
}
