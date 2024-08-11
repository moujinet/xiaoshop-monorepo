import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  DeleteMemberGroupRequest,
  GetMemberGroupPagesRequest,
  GetMemberGroupRequest,
  MemberGroupDictResponse,
  MemberGroupListResponse,
  MemberGroupPayload,
  MemberGroupResponse,
} from '@/member/group/dto'
import { MemberGroupService } from '@/member/group/service'

@ApiTags('管理/会员/群体')
@Controller('admin/member/group')
export class MemberGroupAdminController {
  constructor(
    private readonly service: MemberGroupService,
  ) {}

  @ApiOperation({
    summary: '获取「群体」分页列表',
  })
  @ApiPaginatedResponse(MemberGroupListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员群体分页列表' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('pages')
  async pages(@Query() query: GetMemberGroupPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取「群体」字典列表',
  })
  @ApiListedResponse(MemberGroupDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员群体字典失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「群体」详情',
  })
  @ApiObjectResponse(MemberGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员群体详情失败' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail')
  async detail(@Query() query: GetMemberGroupRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「群体」',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员群体」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberGroupPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「群体」',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员群体」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员群体」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetMemberGroupRequest,
    @Body() data: MemberGroupPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「群体」',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberGroupRequest) {
    return this.service.delete(data.id)
  }
}
