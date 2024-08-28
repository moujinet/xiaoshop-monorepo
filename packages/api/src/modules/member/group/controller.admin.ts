import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
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
  DeleteMemberGroupRequest,
  GetMemberGroupPagesRequest,
  GetMemberGroupRequest,
  MemberGroupDictResponse,
  MemberGroupListResponse,
  MemberGroupPayload,
  MemberGroupResponse,
} from '@/member/group/dto'
import { MemberGroupService } from '@/member/group/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/群体')
@Controller('admin/member/group')
export class MemberGroupAdminController {
  constructor(
    private readonly service: MemberGroupService,
  ) {}

  @ApiOperation({
    summary: '获取群体分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberGroupListResponse)
  @ApiFailedExceptionResponse({ description: '获取会员群体分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetMemberGroupPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取群体字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(MemberGroupDictResponse)
  @ApiFailedExceptionResponse({ description: '获取会员群体字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取群体详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberGroupResponse)
  @ApiFailedExceptionResponse({ description: '获取会员群体详情失败' })
  @ApiNotFoundExceptionResponse({ description: '会员群体不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberGroupRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建群体',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建会员群体失败' })
  @ApiExistsExceptionResponse({ description: '会员群体已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberGroupPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新群体',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新会员群体失败' })
  @ApiNotFoundExceptionResponse({ description: '会员群体不存在' })
  @ApiExistsExceptionResponse({ description: '会员群体已存在' })
  @Put('update')
  async update(
    @Query() query: GetMemberGroupRequest,
    @Body() data: MemberGroupPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除群体',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除会员群体失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberGroupRequest) {
    return this.service.delete(data.id)
  }
}
