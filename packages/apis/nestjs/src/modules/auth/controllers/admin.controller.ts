import type { IStaffLoginProfile } from '@xiaoshop/schema'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, HttpCode, Inject, Post, Request } from '@nestjs/common'
import { Admin, Public } from '@/auth/decorators'
import { AuthService } from '@/auth/auth.service'
import { StaffLoginPayload, StaffLoginProfileResponse, StaffLoginTokenResponse } from '@/auth/dto'
import { ApiExceptionResponse, ApiObjectResponse } from '~/common/response/decorators'
import { EXCEPTION_FAILED } from '~/common/exception'

@ApiTags('管理/权限')
@Controller('/admin/staffs')
export class AuthAdminController {
  constructor(
    @Inject()
    private readonly auth: AuthService,
  ) {}

  @ApiOperation({
    summary: '员工登录',
  })
  @Public()
  @ApiObjectResponse(StaffLoginTokenResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '员工鉴权失败' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() data: StaffLoginPayload) {
    return this.auth.loginStaff(data.username, data.password)
  }

  @ApiOperation({
    summary: '员工信息',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(StaffLoginProfileResponse)
  @Get('auth/profile')
  async profile(@Request() request): Promise<IStaffLoginProfile> {
    return request.user
  }
}
