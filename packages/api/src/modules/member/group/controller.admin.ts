import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { MemberGroupService } from './service'
import {
  DeleteMemberGroupRequest,
  GetMemberGroupInfoRequest,
  GetMemberGroupPagesRequest,
  MemberGroupPayload,
} from './dto'

@Controller('admin/member/group')
export class MemberGroupAdminController {
  constructor(
    private readonly service: MemberGroupService,
  ) {}

  @Get('pages')
  @Admin()
  async pages(@Query() query: GetMemberGroupPagesRequest) {
    return this.service.findPages(query)
  }

  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetMemberGroupInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() data: MemberGroupPayload) {
    return this.service.create(data)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetMemberGroupInfoRequest,
    @Body() data: MemberGroupPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteMemberGroupRequest) {
    return this.service.delete(data.id)
  }
}
