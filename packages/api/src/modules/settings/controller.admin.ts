import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, ParseArrayPipe, Put, Query } from '@nestjs/common'
import { SettingsService } from '@/settings/service'
import { ApiDoneResponse, ApiFailedExceptionResponse, ApiListedResponse } from '~/common/decorators'
import { GetSettingsByKeyRequest, SettingOptionResponse, UpdateSettingsPayload } from '@/settings/dto'
import { exceptionFactory } from '~/common/exceptions'
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
  @ApiListedResponse(SettingOptionResponse)
  @ApiFailedExceptionResponse({ description: '获取系统设置失败' })
  @Get('list')
  async list() {
    return this.service.findAll()
  }

  @ApiOperation({
    summary: '获取指定系统设置',
    description: '支持通配符',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(SettingOptionResponse)
  @ApiFailedExceptionResponse({ description: '获取系统设置失败' })
  @Get('option')
  async option(@Query() query: GetSettingsByKeyRequest) {
    return this.service.findByKey(query.key)
  }

  @ApiOperation({
    summary: '更新系统设置',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新系统设置失败' })
  @ApiBody({ type: [UpdateSettingsPayload], required: true })
  @Put('update')
  async update(
    @Body(new ParseArrayPipe({ items: UpdateSettingsPayload, exceptionFactory }))
    data: UpdateSettingsPayload[],
  ) {
    return this.service.update(data)
  }
}
