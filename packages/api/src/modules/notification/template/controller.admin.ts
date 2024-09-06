import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { NotificationTemplateService } from '@/notification/template/service'
import {
  GetNotificationTemplateListRequest,
  GetNotificationTemplateRequest,
  NotificationTemplateListResponse,
  NotificationTemplateResponse,
  UpdateNotificationTemplateStatusPayload,
} from '@/notification/template/dto'
import {
  ApiDoneResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/通知/消息模板')
@Controller('admin/notification/template')
export class NotificationTemplateAdminController {
  constructor(
    private readonly service: NotificationTemplateService,
  ) {}

  @ApiOperation({
    summary: '获取消息模板列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(NotificationTemplateListResponse)
  @ApiFailedExceptionResponse({ description: '获取消息模板列表失败' })
  @Get('list')
  async list(@Query() query: GetNotificationTemplateListRequest) {
    return this.service.findList(query)
  }

  @ApiOperation({
    summary: '获取消息模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(NotificationTemplateResponse)
  @ApiFailedExceptionResponse({ description: '获取消息模板失败' })
  @ApiNotFoundExceptionResponse({ description: '未找到消息模板' })
  @Get('detail')
  async detail(@Query() query: GetNotificationTemplateRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '更新消息模板状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiNotFoundExceptionResponse({ description: '未找到消息模板' })
  @ApiFailedExceptionResponse({ description: '更新消息模板失败' })
  @Put('status/update')
  async updateStatus(
    @Query() query: GetNotificationTemplateRequest,
    @Body() data: UpdateNotificationTemplateStatusPayload,
  ) {
    return this.service.updateStatus(+query.id, data.enable)
  }
}
