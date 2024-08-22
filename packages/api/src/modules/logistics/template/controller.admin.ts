import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LogisticsTemplateService } from '@/logistics/template/service'
import {
  DeleteLogisticsTemplateRequest,
  GetLogisticsTemplateRequest,
  LogisticsTemplateDictResponse,
  LogisticsTemplateListResponse,
  LogisticsTemplatePayload,
  LogisticsTemplateResponse,
} from '@/logistics/template/dto'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/物流发货/运费模板')
@Controller('admin/logistics/template')
export class LogisticsTemplateAdminController {
  constructor(
    private readonly service: LogisticsTemplateService,
  ) {}

  @ApiOperation({
    summary: '获取运费模板列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(LogisticsTemplateListResponse)
  @ApiFailedExceptionResponse({ description: '获取运费模板列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取运费模板字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(LogisticsTemplateDictResponse)
  @ApiFailedExceptionResponse({ description: '获取运费模板字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取运费模板详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(LogisticsTemplateResponse)
  @ApiFailedExceptionResponse({ description: '获取运费模板详情失败' })
  @ApiNotFoundExceptionResponse({ description: '运费模板不存在' })
  @Get('detail')
  async detail(@Query() query: GetLogisticsTemplateRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建运费模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建运费模板失败' })
  @ApiExistsExceptionResponse({ description: '运费模板已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: LogisticsTemplatePayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新运费模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新运费模板失败' })
  @ApiNotFoundExceptionResponse({ description: '运费模板不存在' })
  @ApiExistsExceptionResponse({ description: '运费模板已存在' })
  @Put('update')
  async update(
    @Query() query: GetLogisticsTemplateRequest,
    @Body() data: LogisticsTemplatePayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除运费模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除运费模板失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteLogisticsTemplateRequest) {
    return this.service.delete(data.id)
  }
}
