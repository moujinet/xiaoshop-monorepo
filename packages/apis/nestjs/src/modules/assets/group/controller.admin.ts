import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { AssetGroupService } from '@/assets/group/service'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'
import { AssetGroupPayload, AssetGroupResponse, DeleteAssetGroupRequest, GetAssetGroupListRequest, GetAssetGroupRequest } from '@/assets/group/dto'

@ApiTags('管理/素材/分组')
@Controller('admin/assets/group')
export class AssetGroupAdminController {
  constructor(
    private readonly group: AssetGroupService,
  ) {}

  @ApiOperation({
    summary: '获取「分组」列表',
  })
  @ApiListedResponse(AssetGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list(@Query() query: GetAssetGroupListRequest) {
    return this.group.findList(query)
  }

  @ApiOperation({
    summary: '获取「分组」根列表',
  })
  @ApiListedResponse(AssetGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('root/list')
  async roots(@Query() query: GetAssetGroupListRequest) {
    return this.group.findRootList(query)
  }

  @ApiOperation({
    summary: '获取「分组」详情',
  })
  @ApiObjectResponse(AssetGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「分组」不存在' })
  @Get('detail')
  async detail(@Query() query: GetAssetGroupRequest) {
    return this.group.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「分组」',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「分组」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: AssetGroupPayload) {
    return this.group.create(data)
  }

  @ApiOperation({
    summary: '更新「分组」',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「分组」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「分组」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetAssetGroupRequest, @Body() data: AssetGroupPayload) {
    return this.group.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「分组」',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteAssetGroupRequest) {
    return this.group.delete(data.id)
  }
}
