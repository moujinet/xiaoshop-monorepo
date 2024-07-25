import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  DeleteMemberCardRequest,
  GetMemberCardRequest,
  MemberCardDictResponse,
  MemberCardPayload,
  MemberCardResponse,
  MemberLevelCardResponse,
} from '@/member/card/dto'
import { MemberCardService } from '@/member/card/service'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiListedResponse, ApiObjectResponse } from '~/common/response/decorators'

@ApiTags('会员卡')
@Controller('member/card')
export class MemberCardController {
  constructor(
    private readonly card: MemberCardService,
  ) {}

  @ApiOperation({
    summary: '获取会员字典列表',
  })
  @ApiListedResponse(MemberCardDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('dict/list')
  async dictList() {
    return this.card.findAllCardList()
  }

  @ApiOperation({
    summary: '获取会员等级列表',
  })
  @ApiListedResponse(MemberLevelCardResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('level/list')
  async levelList() {
    return this.card.findLevelCardList()
  }

  @ApiOperation({
    summary: '获取自定义会员列表 (超级会员卡)',
  })
  @ApiListedResponse(MemberCardResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('custom/list')
  async customList() {
    return this.card.findCustomCardList()
  }

  @ApiOperation({
    summary: '获取会员卡详情',
  })
  @ApiObjectResponse(MemberCardResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员卡不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberCardRequest) {
    return this.card.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建会员卡',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员卡已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberCardPayload) {
    return this.card.create(data)
  }

  @ApiOperation({
    summary: '更新会员卡',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员卡不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员卡已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(@Query() query: GetMemberCardRequest, @Body() data: MemberCardPayload) {
    return this.card.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除会员卡',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberCardRequest) {
    return this.card.deleteCustomCard(+data.id)
  }
}
