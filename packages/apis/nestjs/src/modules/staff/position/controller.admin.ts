import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse, ApiPaginatedResponse } from '~/common/response/decorators'
import { DeletePositionRequest, GetPositionListRequest, GetPositionPagesRequest, GetPositionRequest, PositionPayload, PositionResponse } from '@/staff/position/dto'
import { StaffPositionService } from '@/staff/position/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/权限/组织职位')
@Controller('admin/staff/position')
export class StaffPositionAdminController {
  constructor(
    private readonly service: StaffPositionService,
  ) {}

  @ApiOperation({
    summary: '获取职位列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(PositionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetPositionPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取指定部门的职位列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(PositionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list(@Query() query: GetPositionListRequest) {
    return this.service.findList(+query.departmentId)
  }

  @ApiOperation({
    summary: '获取职位详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(PositionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '职位不存在' })
  @Get('detail')
  async detail(@Query() query: GetPositionRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建职位',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '职位已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: PositionPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新职位',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '职位不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '职位已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetPositionRequest, @Body() data: PositionPayload) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除职位',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeletePositionRequest) {
    return this.service.delete(data.id)
  }
}
