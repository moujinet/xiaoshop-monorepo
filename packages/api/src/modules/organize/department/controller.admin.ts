import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { OrganizeDepartmentService } from '@/organize/department/service'
import {
  DeleteOrganizeDepartmentByIdRequest,
  GetOrganizeDepartmentByIdRequest,
  OrganizeDepartmentDictResponse,
  OrganizeDepartmentDictTreeResponse,
  OrganizeDepartmentInfoResponse,
  OrganizeDepartmentListResponse,
  OrganizeDepartmentPayload,
} from '@/organize/department/dto'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/组织/部门')
@Controller('admin/organize/department')
export class OrganizeDepartmentAdminController {
  constructor(
    private readonly service: OrganizeDepartmentService,
  ) {}

  @ApiOperation({
    summary: '获取部门列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(OrganizeDepartmentListResponse)
  @ApiFailedExceptionResponse({ description: '获取部门列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取部门根列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(OrganizeDepartmentDictResponse)
  @ApiFailedExceptionResponse({ description: '获取部门根列表失败' })
  @Get('root/list')
  async listRoot() {
    return this.service.findRootList()
  }

  @ApiOperation({
    summary: '获取部门字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(OrganizeDepartmentDictTreeResponse)
  @ApiFailedExceptionResponse({ description: '获取部门字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取部门详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(OrganizeDepartmentInfoResponse)
  @ApiFailedExceptionResponse({ description: '获取部门详情失败' })
  @ApiNotFoundExceptionResponse({ description: '部门不存在' })
  @Get('detail')
  async detail(@Query() query: GetOrganizeDepartmentByIdRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建部门',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建部门失败' })
  @ApiExistsExceptionResponse({ description: '部门已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: OrganizeDepartmentPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新部门',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新部门失败' })
  @ApiNotFoundExceptionResponse({ description: '部门不存在' })
  @ApiExistsExceptionResponse({ description: '部门已存在' })
  @Put('update')
  async update(
    @Query() query: GetOrganizeDepartmentByIdRequest,
    @Body() data: OrganizeDepartmentPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除部门',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除部门失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteOrganizeDepartmentByIdRequest) {
    return this.service.delete(data.id)
  }
}
