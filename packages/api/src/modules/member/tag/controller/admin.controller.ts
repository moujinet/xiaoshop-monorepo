import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { MemberTagService } from '@/member/tag/domain/manage/service'
import { CreateMemberTagPayload, UpdateMemberTagPayload } from '@/member/tag/dto/payload'
import { DeleteMemberTagRequest, GetMemberTagPagesRequest, GetMemberTagRequest } from '@/member/tag/dto/request'

@Controller('admin/member/tag')
export class MemberTagAdminController {
  constructor(
    private readonly service: MemberTagService,
  ) {}

  /**
   * Get Member Tag Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetMemberTagPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Member Tag Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Member Tag Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetMemberTagRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Member Tag
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateMemberTagPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Member Tag
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetMemberTagRequest,
    @Body() payload: UpdateMemberTagPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Member Tag
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteMemberTagRequest) {
    return this.service.delete(data.id)
  }
}
