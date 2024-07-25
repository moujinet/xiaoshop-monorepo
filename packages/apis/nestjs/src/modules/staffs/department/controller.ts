import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'
import { DeleteDepartmentRequest, DepartmentPayload, DepartmentResponse, GetDepartmentRequest } from '@/staffs/department/dto'
import { DepartmentService } from '@/staffs/department/service'

@ApiTags('组织部门')
@Controller('staffs/department')
export class DepartmentController {
  constructor(
    private readonly service: DepartmentService,
  ) {}

  @ApiOperation({
    summary: '获取部门列表',
  })
  @ApiListedResponse(DepartmentResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取部门根列表',
  })
  @ApiListedResponse(DepartmentResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('root/list')
  async roots() {
    return this.service.findRootList()
  }

  @ApiOperation({
    summary: '获取部门详情',
  })
  @ApiObjectResponse(DepartmentResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '部门不存在' })
  @Get('detail')
  async detail(@Query() query: GetDepartmentRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建部门',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '部门已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: DepartmentPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新部门',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '部门不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '部门已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetDepartmentRequest, @Body() data: DepartmentPayload) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除部门',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteDepartmentRequest) {
    return this.service.delete(data.id)
  }
}
