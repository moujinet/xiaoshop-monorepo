import type {
  IAuthUserProfile,
} from '@xiaoshop/shared'
import { ClsService } from 'nestjs-cls'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Inject, Post, Put, Query } from '@nestjs/common'
import { AuthUserService } from '@/auth/user/service'
import { Admin, Public } from '@/auth/decorators'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import {
  AuthUserResponse,
  AuthUserTokenResponse,
  CreateAuthUserPayload,
  DeleteAuthUserRequest,
  GetAuthUserPagesRequest,
  GetAuthUserRequest,
  LoginAuthUserPayload,
  UpdateAuthUserPayload,
} from '@/auth/user/dto'

@ApiTags('管理/权限/账号')
@Controller('admin/auth/user')
export class AuthUserAdminController {
  constructor(
    private readonly service: AuthUserService,

    @Inject()
    private readonly cls: ClsService,
  ) {}

  @ApiOperation({
    summary: '员工登录',
  })
  @Public()
  @ApiObjectResponse(AuthUserTokenResponse)
  @ApiFailedExceptionResponse({ description: '登录失败' })
  @ApiFailedExceptionResponse({ description: '员工账号不存在' })
  @ApiFailedExceptionResponse({ description: '密码错误' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginAuthUserPayload) {
    return this.service.login(data.username, data.password)
  }

  @ApiOperation({
    summary: '登录员工信息',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(AuthUserResponse)
  @Get('profile')
  async profile() {
    return this.cls.get<IAuthUserProfile>('USER')
  }

  @ApiOperation({
    summary: '获取员工账号列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(AuthUserResponse)
  @ApiFailedExceptionResponse({ description: '获取员工账号分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetAuthUserPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取员工账号详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(AuthUserResponse)
  @ApiFailedExceptionResponse({ description: '获取员工账号详情失败' })
  @ApiNotFoundExceptionResponse({ description: '员工账号不存在' })
  @Get('detail')
  async detail(@Query() query: GetAuthUserRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建员工账号',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建员工账号失败' })
  @ApiExistsExceptionResponse({ description: '员工姓名已存在' })
  @ApiExistsExceptionResponse({ description: '员工账号已存在' })
  @ApiExistsExceptionResponse({ description: '员工手机已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: CreateAuthUserPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新员工账号',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新员工账号失败' })
  @ApiNotFoundExceptionResponse({ description: '员工账号不存在' })
  @ApiExistsExceptionResponse({ description: '员工姓名已存在' })
  @ApiExistsExceptionResponse({ description: '员工账号已存在' })
  @ApiExistsExceptionResponse({ description: '员工手机已存在' })
  @Put('update')
  async update(@Query() query: GetAuthUserRequest, @Body() data: UpdateAuthUserPayload) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '禁用员工账号',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('禁用成功')
  @ApiFailedExceptionResponse({ description: '禁用员工账号失败' })
  @ApiNotFoundExceptionResponse({ description: '员工账号不存在' })
  @Put('block')
  async block(@Body() data: DeleteAuthUserRequest) {
    return this.service.blockUser(data.id)
  }

  @ApiOperation({
    summary: '恢复员工账号',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('恢复成功')
  @ApiFailedExceptionResponse({ description: '恢复员工账号失败' })
  @ApiNotFoundExceptionResponse({ description: '员工账号不存在' })
  @Put('unblock')
  async unblock(@Body() data: DeleteAuthUserRequest) {
    return this.service.unblockUser(data.id)
  }

  @ApiOperation({
    summary: '删除员工账号',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除员工账号失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteAuthUserRequest) {
    return this.service.delete(data.id)
  }
}
