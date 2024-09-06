import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { NotificationTemplateContentService } from '@/notification/template-content/service'
import {
  GetNotificationTemplateContentListRequest,
  GetNotificationTemplateContentRequest,
  NotificationTemplateContentInfoResponse,
  UpdateNotificationTemplateContentPayload,
} from '@/notification/template-content/dto'
import {
  ApiDoneResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/通知/消息模板')
@Controller('admin/notification/template/content')
export class NotificationTemplateContentAdminController {
  constructor(
    private readonly service: NotificationTemplateContentService,
  ) {}

  @ApiOperation({
    summary: '获取消息模板内容列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(NotificationTemplateContentInfoResponse)
  @ApiFailedExceptionResponse({ description: '获取消息模板内容列表失败' })
  @Get('list')
  async list(@Query() query: GetNotificationTemplateContentListRequest) {
    return this.service.findList(+query.templateId)
  }

  @ApiOperation({
    summary: '更新消息模板内容',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiNotFoundExceptionResponse({ description: '未找到消息模板内容' })
  @ApiFailedExceptionResponse({ description: '更新消息模板内容失败' })
  @Put('update')
  async update(
    @Query() query: GetNotificationTemplateContentRequest,
    @Body() data: UpdateNotificationTemplateContentPayload,
  ) {
    return this.service.update(+query.id, data)
  }
}
