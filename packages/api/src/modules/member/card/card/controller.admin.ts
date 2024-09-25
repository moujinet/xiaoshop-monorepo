import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { MemberCardService } from './service'
import {
  DeleteMemberCardRequest,
  GetMemberCardInfoRequest,
  MemberCardPayload,
  MemberCardStatusPayload,
} from './dto'

@Controller('admin/member/card')
export class MemberCardAdminController {
  constructor(
    private readonly service: MemberCardService,
  ) {}

  @Get('level/list')
  @Admin()
  async levelCardList() {
    return this.service.findLevelCardList()
  }

  @Get('custom/list')
  @Admin()
  async customCardList() {
    return this.service.findCustomCardList()
  }

  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  @Get('detail')
  @Admin()
  async detail(@Query() query: GetMemberCardInfoRequest) {
    return this.service.findById(+query.id)
  }

  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: MemberCardPayload) {
    return this.service.create(payload)
  }

  @Put('update')
  @Admin()
  async update(
    @Query() query: GetMemberCardInfoRequest,
    @Body() payload: MemberCardPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  @Put('status/update')
  @Admin()
  async updateStatus(
    @Query() query: GetMemberCardInfoRequest,
    @Body() payload: MemberCardStatusPayload,
  ) {
    return this.service.updateStatus(+query.id, payload.isEnabled)
  }

  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteMemberCardRequest) {
    return this.service.delete(data.id)
  }
}
