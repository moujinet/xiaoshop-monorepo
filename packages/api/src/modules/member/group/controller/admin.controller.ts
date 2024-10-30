import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { MemberGroupService } from '@/member/group/domain/manage/service'
import { CreateMemberGroupPayload, UpdateMemberGroupPayload } from '@/member/group/dto/payload'
import { DeleteMemberGroupRequest, GetMemberGroupPagesRequest, GetMemberGroupRequest } from '@/member/group/dto/request'

@Controller('admin/member/group')
export class MemberGroupAdminController {
  constructor(
    private readonly service: MemberGroupService,
  ) {}

  /**
   * Get Member Group Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetMemberGroupPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Member Group Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Member Group Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetMemberGroupRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Member Group
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateMemberGroupPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Member Group
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetMemberGroupRequest,
    @Body() payload: UpdateMemberGroupPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Member Group
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteMemberGroupRequest) {
    return this.service.delete(data.id)
  }
}
