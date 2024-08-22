import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthRoleService } from '@/auth/role/service'
import { Admin } from '@/auth/decorators'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import {
  AuthRoleDictResponse,
  AuthRoleListResponse,
  AuthRolePayload,
  AuthRoleResponse,
  DeleteAuthRoleRequest,
  GetAuthRolePagesRequest,
  GetAuthRoleRequest,
} from '@/auth/role/dto'

@ApiTags('管理/权限/角色')
@Controller('admin/auth/role')
export class AuthRoleAdminController {
  constructor(
    private readonly service: AuthRoleService,
  ) {}

  @ApiOperation({
    summary: '获取角色分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(AuthRoleListResponse)
  @ApiFailedExceptionResponse({ description: '获取角色列表失败' })
  @Get('pages')
  async pages(@Query() query: GetAuthRolePagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取角色字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(AuthRoleDictResponse)
  @ApiFailedExceptionResponse({ description: '获取角色字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取角色详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(AuthRoleResponse)
  @ApiFailedExceptionResponse({ description: '获取角色详情失败' })
  @ApiNotFoundExceptionResponse({ description: '角色不存在' })
  @Get('detail')
  async detail(@Query() query: GetAuthRoleRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建角色',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建角色失败' })
  @ApiExistsExceptionResponse({ description: '角色已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: AuthRolePayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新角色',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新角色失败' })
  @ApiNotFoundExceptionResponse({ description: '角色不存在' })
  @ApiExistsExceptionResponse({ description: '角色已存在' })
  @Put('update')
  async update(@Query() query: GetAuthRoleRequest, @Body() data: AuthRolePayload) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除角色失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteAuthRoleRequest) {
    return this.service.delete(data.id)
  }
}
