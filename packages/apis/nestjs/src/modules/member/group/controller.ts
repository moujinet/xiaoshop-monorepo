import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { MemberGroupService } from '@/member/group/service'
import { DeleteMemberGroupRequest, GetMemberGroupRequest, MemberGroupPayload, MemberGroupResponse } from '@/member/group/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'

@ApiTags('会员群体')
@Controller('member/group')
export class MemberGroupController {
  constructor(
    private readonly group: MemberGroupService,
  ) {}

  @ApiOperation({
    summary: '获取会员群体列表',
  })
  @ApiListedResponse(MemberGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.group.findList()
  }

  @ApiOperation({
    summary: '获取会员群体详情',
  })
  @ApiObjectResponse(MemberGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员群体不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberGroupRequest) {
    return this.group.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建会员群体',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员群体已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberGroupPayload) {
    return this.group.create(data)
  }

  @ApiOperation({
    summary: '更新会员群体',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员群体不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员群体已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetMemberGroupRequest, @Body() data: MemberGroupPayload) {
    return this.group.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除会员群体',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberGroupRequest) {
    return this.group.delete(+data.id)
  }
}
