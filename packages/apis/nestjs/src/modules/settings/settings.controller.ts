import type { ISettings } from '@xiaoshop/schema'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, ParseArrayPipe, Post, Put } from '@nestjs/common'
import { SettingsService } from '@/settings/settings.service'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse } from '~/common/response/decorators'
import { DeleteSettingsOptionRequest, SettingsOptionPayload, SettingsOptionResponse } from '@/settings/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND, exceptionFactory } from '~/common/exception'

@ApiTags('系统设置')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  @ApiOperation({
    summary: '获取所有系统设置',
  })
  @ApiListedResponse(SettingsOptionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list(): Promise<ISettings[]> {
    return this.settingsService.findList()
  }

  @ApiOperation({
    summary: '创建系统设置',
  })
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
    return this.settingsService.create(data)
  }

  @ApiOperation({
    summary: '更新系统设置',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '设置项不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @ApiBody({ type: [SettingsOptionPayload], required: true })
  @Put('update')
  async update(
    @Body(new ParseArrayPipe({ items: SettingsOptionPayload, exceptionFactory }))
    data: SettingsOptionPayload[],
  ): Promise<void> {
    return this.settingsService.update(data)
  }

  @ApiOperation({
    summary: '删除系统设置',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @ApiBody({ type: DeleteSettingsOptionRequest, required: true })
  @Delete('delete')
  async delete(@Body() data: DeleteSettingsOptionRequest): Promise<void> {
    return this.settingsService.deleteByKeys(data.keys)
  }
}
