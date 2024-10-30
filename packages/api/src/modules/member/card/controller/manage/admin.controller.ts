import { MemberCardType } from '@xiaoshop/shared'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { MemberCardService } from '@/member/card/domain/manage/service'
import {
  DeleteMemberCustomCardRequest,
  GetMemberCardRequest,
} from '@/member/card/dto/request'
import {
  CreateMemberCustomCardPayload,
  UpdateMemberCustomCardPayload,
  UpdateMemberLevelPayload,
} from '@/member/card/dto/payload'

@Controller('admin/member/card')
export class MemberCardAdminController {
  constructor(
    private readonly service: MemberCardService,
  ) {}

  /**
   * Get Member Level List
   */
  @Get('level/list')
  @Admin()
  async levelList() {
    return this.service.findLevelList()
  }

  /**
   * Get Member Custom Card List
   */
  @Get('custom/list')
  @Admin()
  async customCardList() {
    return this.service.findCustomCardList()
  }

  /**
   * Get Member Card Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Member Card Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetMemberCardRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Member Custom Card
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateMemberCustomCardPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Member Custom Card
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetMemberCardRequest,
    @Body() payload: UpdateMemberCustomCardPayload,
  ) {
    return this.service.update(+query.id, MemberCardType.CUSTOM, payload)
  }

  /**
   * Update Member Level
   */
  @Put('level/update')
  @Admin()
  async updateLevel(
      @Query() query: GetMemberCardRequest,
      @Body() payload: UpdateMemberLevelPayload,
  ) {
    return this.service.update(+query.id, MemberCardType.LEVEL, payload)
  }

  /**
   * Delete Member Custom Card
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteMemberCustomCardRequest) {
    return this.service.delete(data.id)
  }
}
