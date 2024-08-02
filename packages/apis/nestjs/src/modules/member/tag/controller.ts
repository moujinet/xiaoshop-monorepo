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
  DeleteMemberTagRequest,
  GetMemberTagPagesRequest,
  GetMemberTagRequest,
  MemberTagDictResponse,
  MemberTagListResponse,
  MemberTagPayload,
  MemberTagResponse,
} from '@/member/tag/dto'
import { MemberTagService } from '@/member/tag/service'

@ApiTags('会员/标签')
@Controller('member/tag')
export class MemberTagController {
  constructor(
    private readonly service: MemberTagService,
  ) {}

  @ApiOperation({
    summary: '获取「标签」列表',
  })
  @ApiPaginatedResponse(MemberTagListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员标签分页列表' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('pages')
  async pages(@Query() query: GetMemberTagPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取「标签」字典列表',
  })
  @ApiListedResponse(MemberTagDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员标签字典失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「标签」详情',
  })
  @ApiObjectResponse(MemberTagResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员标签详情失败' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail')
  async detail(@Query() query: GetMemberTagRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「标签」',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员标签」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberTagPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「标签」',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员标签」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员标签」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetMemberTagRequest,
    @Body() data: MemberTagPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「标签」',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberTagRequest) {
    return this.service.delete(data.id)
  }
}
