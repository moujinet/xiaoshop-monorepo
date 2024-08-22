import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { OrganizePositionService } from '@/organize/position/service'
import { Admin } from '@/auth/decorators'
import {
  DeleteOrganizePositionRequest,
  GetOrganizePositionListRequest,
  GetOrganizePositionPagesRequest,
  GetOrganizePositionRequest,
  OrganizePositionDictResponse,
  OrganizePositionPayload,
  OrganizePositionResponse,
} from '@/organize/position/dto'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'

@ApiTags('管理/组织/职位')
@Controller('admin/organize/position')
export class OrganizePositionAdminController {
  constructor(
    private readonly service: OrganizePositionService,
  ) {}

  @ApiOperation({
    summary: '获取职位分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(OrganizePositionResponse)
  @ApiFailedExceptionResponse({ description: '获取职位列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetOrganizePositionPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取职位字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(OrganizePositionDictResponse)
  @ApiFailedExceptionResponse({ description: '获取职位字典列表失败' })
  @Get('dict/list')
  async listDict(@Query() query: GetOrganizePositionListRequest) {
    return this.service.findDictListByDepartmentId(+query.departmentId)
  }

  @ApiOperation({
    summary: '获取职位详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(OrganizePositionResponse)
  @ApiFailedExceptionResponse({ description: '获取职位详情失败' })
  @ApiNotFoundExceptionResponse({ description: '职位不存在' })
  @Get('detail')
  async detail(@Query() query: GetOrganizePositionRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建职位',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建职位失败' })
  @ApiExistsExceptionResponse({ description: '职位已存在' })
  @ApiNotFoundExceptionResponse({ description: '部门不存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: OrganizePositionPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新职位',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新职位失败' })
  @ApiNotFoundExceptionResponse({ description: '职位不存在' })
  @ApiExistsExceptionResponse({ description: '职位已存在' })
  @ApiNotFoundExceptionResponse({ description: '部门不存在' })
  @Put('update')
  async update(
    @Query() query: GetOrganizePositionRequest,
    @Body() data: OrganizePositionPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除职位',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除职位失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteOrganizePositionRequest) {
    return this.service.delete(data.id)
  }
}
