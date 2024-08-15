import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { LogisticsFreightTemplateService } from '@/logistics/freight-template/service'
import {
  DeleteFreightTemplateRequest,
  FreightTemplateDictResponse,
  FreightTemplateListResponse,
  FreightTemplatePayload,
  FreightTemplateResponse,
  GetFreightTemplateRequest,
} from '@/logistics/freight-template/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/物流发货/运费模板')
@Controller('admin/logistics/freight-template')
export class LogisticsTemplateFreightAdminController {
  constructor(
    private readonly service: LogisticsFreightTemplateService,
  ) {}

  @ApiOperation({
    summary: '获取运费模板列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(FreightTemplateListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取运费模板字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(FreightTemplateDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取运费模板详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(FreightTemplateResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '运费模板不存在' })
  @Get('detail')
  async detail(@Query() query: GetFreightTemplateRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建运费模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '运费模板已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: FreightTemplatePayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新运费模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '运费模板不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '运费模板已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetFreightTemplateRequest,
    @Body() data: FreightTemplatePayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除运费模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteFreightTemplateRequest) {
    return this.service.delete(data.id)
  }
}
