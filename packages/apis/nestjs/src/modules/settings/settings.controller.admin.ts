import type { ISettings } from '@xiaoshop/schema'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, ParseArrayPipe, Put } from '@nestjs/common'
import { SettingsService } from '@/settings/settings.service'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse } from '~/common/response/decorators'
import { SettingsOptionPayload, SettingsOptionResponse } from '@/settings/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND, exceptionFactory } from '~/common/exception'
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
}
