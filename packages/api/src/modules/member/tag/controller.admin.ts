import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberTagService } from '@/member/tag/service'
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
  DeleteMemberTagRequest,
  GetMemberTagPagesRequest,
  GetMemberTagRequest,
  MemberTagDictResponse,
  MemberTagListResponse,
  MemberTagPayload,
  MemberTagResponse,
} from '@/member/tag/dto'

@ApiTags('管理/会员/标签')
@Controller('admin/member/tag')
export class MemberTagAdminController {
  constructor(
    private readonly service: MemberTagService,
  ) {}

  @ApiOperation({
    summary: '获取标签列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberTagListResponse)
  @ApiFailedExceptionResponse({ description: '获取会员标签列表失败' })
  @Get('pages')
  async pages(@Query() query: GetMemberTagPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取标签字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberTagDictResponse)
  @ApiFailedExceptionResponse({ description: '获取会员标签字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取标签详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberTagResponse)
  @ApiFailedExceptionResponse({ description: '获取会员标签详情失败' })
  @ApiNotFoundExceptionResponse({ description: '会员标签不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberTagRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建会员标签失败' })
  @ApiExistsExceptionResponse({ description: '会员标签已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberTagPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新会员标签失败' })
  @ApiNotFoundExceptionResponse({ description: '会员标签不存在' })
  @ApiExistsExceptionResponse({ description: '会员标签已存在' })
  @Put('update')
  async update(
    @Query() query: GetMemberTagRequest,
    @Body() data: MemberTagPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除会员标签失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberTagRequest) {
    return this.service.delete(data.id)
  }
}
