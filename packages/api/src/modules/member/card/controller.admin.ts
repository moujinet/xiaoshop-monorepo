import type { YesOrNo } from '@xiaoshop/shared'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
} from '~/common/decorators'
import {
  DeleteMemberCardRequest,
  GetMemberCardRequest,
  MemberCardDictResponse,
  MemberCardPayload,
  MemberCardResponse,
  MemberCustomCardListResponse,
  MemberLevelListResponse,
} from '@/member/card/dto'
import { MemberCardService } from '@/member/card/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/会员卡')
@Controller('admin/member/card')
export class MemberCardAdminController {
  constructor(
    private readonly service: MemberCardService,
  ) {}

  @ApiOperation({
    summary: '获取会员等级列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberLevelListResponse)
  @ApiFailedExceptionResponse({ description: '获取会员等级列表失败' })
  @Get('level/list')
  async levelList() {
    return this.service.findLevelList()
  }

  @ApiOperation({
    summary: '获取自定义会员卡列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberCustomCardListResponse)
  @ApiFailedExceptionResponse({ description: '获取自定义会员卡列表失败' })
  @Get('custom/list')
  async customList() {
    return this.service.findCustomList()
  }

  @ApiOperation({
    summary: '获取会员卡字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberCardDictResponse)
  @ApiFailedExceptionResponse({ description: '获取会员卡字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取会员卡详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberCardResponse)
  @ApiFailedExceptionResponse({ description: '获取会员卡详情失败' })
  @ApiExistsExceptionResponse({ description: '会员卡不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberCardRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建自定义会员卡',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建自定义会员卡失败' })
  @ApiExistsExceptionResponse({ description: '会员卡已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberCardPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新会员卡',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新会员卡失败' })
  @ApiExistsExceptionResponse({ description: '会员卡已存在' })
  @ApiNotFoundExceptionResponse({ description: '会员卡不存在' })
  @Put('update')
  async update(
    @Query() query: GetMemberCardRequest,
    @Body() data: MemberCardPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '更新会员卡启用状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新会员卡启用状态失败' })
  @ApiNotFoundExceptionResponse({ description: '会员卡不存在' })
  @Put('status/update')
  async updateStatus(
    @Query() query: GetMemberCardRequest,
    @Body('status') status: YesOrNo,
  ) {
    return this.service.updateStatus(+query.id, status)
  }

  @ApiOperation({
    summary: '删除自定义会员卡',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除自定义会员卡失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberCardRequest) {
    return this.service.delete(data.id)
  }
}
