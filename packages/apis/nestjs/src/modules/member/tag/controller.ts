import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { MemberTagService } from '@/member/tag/service'
import { DeleteMemberTagRequest, GetMemberTagRequest, MemberTagPayload, MemberTagResponse } from '@/member/tag/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'

@ApiTags('会员标签')
@Controller('member/tag')
export class MemberTagController {
  constructor(
    private readonly tag: MemberTagService,
  ) {}

  @ApiOperation({
    summary: '获取会员标签列表',
  })
  @ApiListedResponse(MemberTagResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.tag.findList()
  }

  @ApiOperation({
    summary: '获取会员标签详情',
  })
  @ApiObjectResponse(MemberTagResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员标签不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberTagRequest) {
    return this.tag.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建会员标签',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员标签已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberTagPayload) {
    return this.tag.create(data)
  }

  @ApiOperation({
    summary: '更新会员标签',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员标签不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员标签已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetMemberTagRequest, @Body() data: MemberTagPayload) {
    return this.tag.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除会员标签',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberTagRequest) {
    return this.tag.delete(+data.id)
  }
}
