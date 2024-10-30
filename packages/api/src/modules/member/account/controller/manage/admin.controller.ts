import { MemberStatus } from '@xiaoshop/shared'
import { Body, Controller, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { MemberService } from '@/member/account/domain/manage/service'
import { GetMemberPagesRequest, GetMemberRequest } from '@/member/account/dto/request'
import { CreateMemberPayload, ResetMemberPasswordPayload, UpdateMemberTagsPayload } from '@/member/account/dto/payload'

@Controller('admin/member')
export class MemberAdminController {
  constructor(
    private readonly service: MemberService,
  ) {}

  /**
   * Get Member Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetMemberPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Member Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetMemberRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Member
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateMemberPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Member Tag
   */
  @Put('tags/update')
  @Admin()
  async updateTags(@Body() payload: UpdateMemberTagsPayload) {
    return this.service.updateTags(payload.ids, payload.tagIds)
  }

  /**
   * Block Member
   */
  @Put('block')
  @Admin()
  async block(@Query() query: GetMemberRequest) {
    return this.service.updateStatus(+query.id, MemberStatus.BLOCKED)
  }

  /**
   * Recover Member
   */
  @Put('recover')
  @Admin()
  async recover(@Query() query: GetMemberRequest) {
    return this.service.updateStatus(+query.id, MemberStatus.NORMAL)
  }

  /**
   * Reset Member Password
   */
  @Put('password/reset')
  @Admin()
  async resetPassword(
    @Query() query: GetMemberRequest,
    @Body() payload: ResetMemberPasswordPayload,
  ) {
    return this.service.resetPassword(+query.id, payload.password)
  }
}
