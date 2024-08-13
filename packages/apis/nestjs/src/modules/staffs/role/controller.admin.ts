import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse, ApiPaginatedResponse } from '~/common/response/decorators'
import { DeleteRoleRequest, GetRolePagesRequest, GetRoleRequest, RoleDictResponse, RolePayload, RoleResponse } from '@/staffs/role/dto'
import { StaffRoleService } from '@/staffs/role/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/权限/员工角色')
@Controller('admin/staffs/role')
export class StaffRoleAdminController {
  constructor(
    private readonly service: StaffRoleService,
  ) {}

  @ApiOperation({
    summary: '获取角色分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(RoleResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetRolePagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取角色字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(RoleDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取角色详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(RoleResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '角色不存在' })
  @Get('detail')
  async detail(@Query() query: GetRoleRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建角色',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '角色已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: RolePayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新角色',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '角色不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '角色已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetRoleRequest, @Body() data: RolePayload) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteRoleRequest) {
    return this.service.delete(data.id)
  }
}
