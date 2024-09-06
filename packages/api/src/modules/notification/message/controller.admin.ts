import { Body, Controller, Delete, Get, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { NotificationMessageService } from '@/notification/message/service'
import {
  DeleteNotificationMessageRequest,
  GetNotificationMessageListRequest,
  GetNotificationMessagePagesRequest,
  GetNotificationMessageRequest,
  NotificationMessageListResponse,
  NotificationMessageResponse,
} from '@/notification/message/dto'
import {
  ApiDoneResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/通知/消息')
@Controller('admin/notification/message')
export class NotificationMessageAdminController {
  constructor(
    private readonly service: NotificationMessageService,
  ) {}

  @ApiOperation({
    summary: '获取消息分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(NotificationMessageListResponse)
  @ApiFailedExceptionResponse({ description: '获取消息分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetNotificationMessagePagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取消息列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(NotificationMessageListResponse)
  @ApiFailedExceptionResponse({ description: '获取消息列表失败' })
  @Get('list')
  async list(@Query() query: GetNotificationMessageListRequest) {
    return this.service.findList(query)
  }

  @ApiOperation({
    summary: '获取消息详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(NotificationMessageResponse)
  @ApiFailedExceptionResponse({ description: '获取消息详情失败' })
  @ApiNotFoundExceptionResponse({ description: '未找到消息内容' })
  @Get('detail')
  async detail(@Query() query: GetNotificationMessageRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '删除消息',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除通知消息失败' })
  @ApiNotFoundExceptionResponse({ description: '未找到消息内容' })
  @Delete('delete')
  async delete(@Body() data: DeleteNotificationMessageRequest) {
    return this.service.delete(data.id, data.memberId)
  }
}
