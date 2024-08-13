import type { ISettings } from '@xiaoshop/schema'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, ParseArrayPipe, Post, Put } from '@nestjs/common'
import { SettingsService } from '@/settings/settings.service'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse } from '~/common/response/decorators'
import { DeleteSettingsOptionRequest, SettingsOptionPayload, SettingsOptionResponse } from '@/settings/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND, exceptionFactory } from '~/common/exception'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/系统设置')
@Controller('admin/settings')
export class SettingsAdminController {
  constructor(
    private readonly service: SettingsService,
  ) {}

  @ApiOperation({
    summary: '获取所有系统设置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(SettingsOptionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list(): Promise<ISettings[]> {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '创建系统设置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '设置项已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @ApiBody({ type: [SettingsOptionPayload], required: true })
  @Post('create')
  @HttpCode(200)
  async create(
    @Body(new ParseArrayPipe({ items: SettingsOptionPayload, exceptionFactory }))
    data: SettingsOptionPayload[],
  ): Promise<void> {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新系统设置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '设置项不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @ApiBody({ type: [SettingsOptionPayload], required: true })
  @Put('update')
  async update(
    @Body(new ParseArrayPipe({ items: SettingsOptionPayload, exceptionFactory }))
    data: SettingsOptionPayload[],
  ): Promise<void> {
    return this.service.update(data)
  }

  @ApiOperation({
    summary: '删除系统设置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @ApiBody({ type: DeleteSettingsOptionRequest, required: true })
  @Delete('delete')
  async delete(@Body() data: DeleteSettingsOptionRequest): Promise<void> {
    return this.service.deleteByKeys(data.keys)
  }
}
