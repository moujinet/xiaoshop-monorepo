import { Controller, Get, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { NotificationLogService } from '@/notification/log/service'
import {
  GetNotificationLogPagesRequest,
  GetNotificationLogRequest,
  NotificationLogListResponse,
  NotificationLogResponse,
} from '@/notification/log/dto'
import {
  ApiFailedExceptionResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/通知/发送日志')
@Controller('admin/notification/log')
export class NotificationLogAdminController {
  constructor(
    private readonly service: NotificationLogService,
  ) {}

  @ApiOperation({
    summary: '获取消息发送日志列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(NotificationLogListResponse)
  @ApiFailedExceptionResponse({ description: '获取消息发送日志列表失败' })
  @Get('pages')
  async pages(@Query() query: GetNotificationLogPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取消息发送日志详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(NotificationLogResponse)
  @ApiFailedExceptionResponse({ description: '获取消息发送日志详情失败' })
  @ApiNotFoundExceptionResponse({ description: '未找到消息发送日志' })
  @Get('detail')
  async detail(@Query() query: GetNotificationLogRequest) {
    return this.service.findById(+query.id)
  }
}
