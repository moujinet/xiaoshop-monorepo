import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ResourceGroupService } from '@/resource/group/service'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
} from '~/common/decorators'
import {
  DeleteResourceGroupRequest,
  GetResourceGroupListRequest,
  GetResourceGroupRequest,
  ResourceGroupPayload,
  ResourceGroupResponse,
} from '@/resource/group/dto'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/素材/分组')
@Controller('admin/resource/group')
export class ResourceGroupAdminController {
  constructor(
    private readonly service: ResourceGroupService,
  ) {}

  @ApiOperation({
    summary: '获取素材分组列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ResourceGroupResponse)
  @ApiFailedExceptionResponse({ description: '获取素材分组列表失败' })
  @Get('list')
  async list(@Query() query: GetResourceGroupListRequest) {
    return this.service.findList(query)
  }

  @ApiOperation({
    summary: '获取素材分组根列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ResourceGroupResponse)
  @ApiFailedExceptionResponse({ description: '获取素材分组根列表失败' })
  @Get('root/list')
  async roots(@Query() query: GetResourceGroupListRequest) {
    return this.service.findRootList(query)
  }

  @ApiOperation({
    summary: '获取素材分组详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ResourceGroupResponse)
  @ApiFailedExceptionResponse({ description: '获取素材分组详情失败' })
  @ApiNotFoundExceptionResponse({ description: '素材分组不存在' })
  @Get('detail')
  async detail(@Query() query: GetResourceGroupRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建素材分组',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiExistsExceptionResponse({ description: '素材分组已存在' })
  @ApiFailedExceptionResponse({ description: '创建素材分组失败' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ResourceGroupPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新素材分组',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新素材分组失败' })
  @ApiNotFoundExceptionResponse({ description: '素材分组不存在' })
  @ApiExistsExceptionResponse({ description: '素材分组已存在' })
  @Put('update')
  async update(@Query() query: GetResourceGroupRequest, @Body() data: ResourceGroupPayload) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除素材分组',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除素材分组失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteResourceGroupRequest) {
    return this.service.delete(data.id)
  }
}
