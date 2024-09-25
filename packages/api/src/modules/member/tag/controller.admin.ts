import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { MemberTagService } from './service'
import {
  DeleteMemberTagRequest,
  GetMemberTagInfoRequest,
  GetMemberTagPagesRequest,
  MemberTagPayload,
} from './dto'

@Controller('admin/member/tag')
export class MemberTagAdminController {
  constructor(
    private readonly service: MemberTagService,
  ) {}

  @Admin()
  @Get('pages')
  async pages(@Query() query: GetMemberTagPagesRequest) {
    return this.service.findPages(query)
  }

  @Admin()
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @Admin()
  @Get('detail')
  async detail(@Query() query: GetMemberTagInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Admin()
  @Post('create')
  @HttpCode(200)
  async create(@Body() payload: MemberTagPayload) {
    return this.service.create(payload)
  }

  @Admin()
  @Put('update')
  async update(
    @Query() query: GetMemberTagInfoRequest,
    @Body() payload: MemberTagPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Admin()
  @Delete('delete')
  async delete(@Body() data: DeleteMemberTagRequest) {
    return this.service.delete(data.id)
  }
}
