import {
  GoodsExportRecordStatus,
  type IApiPaginationData,
  type IGoodsExportConditions,
  type IGoodsExportRecordListItem,
  type IGoodsExportRecordStatus,
} from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FailedException } from '~/common/exception'
import { GoodsExportEvent } from '@/goods/goods.events'
import { GoodsExportRecord } from '@/goods/export/entity'
import { GetGoodsExportRecordPagesRequest } from '@/goods/export/dto'

@Injectable()
export class GoodsExportRecordService {
  constructor(
    @InjectRepository(GoodsExportRecord)
    private readonly repository: Repository<GoodsExportRecord>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 获取导出记录分页列表
   *
   * @param query GetGoodsExportRecordPagesRequest
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IGoodsExportRecordListItem>>
   * @see {@link IGoodsExportRecordListItem}
   */
  async findPages(
    query: GetGoodsExportRecordPagesRequest,
  ): Promise<IApiPaginationData<IGoodsExportRecordListItem>> {
    try {
      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          createdTime: 'DESC',
        },
      })

      return {
        result,
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取导出记录分页列表', e.message)
    }
  }

  /**
   * 创建导出记录
   *
   * @param conditions IGoodsExportConditions
   * @emits GoodsExportEvent
   * @throws FailedException
   * @see {@link IGoodsExportConditions}
   */
  async create(conditions: IGoodsExportConditions) {
    try {
      const record = new GoodsExportRecord()

      record.count = 0
      record.status = GoodsExportRecordStatus.PENDING
      record.conditions = conditions

      const res = await this.repository.save(record)

      this.eventEmitter.emitAsync(
        GoodsExportEvent.name,
        new GoodsExportEvent(res.id, conditions),
      )
    }
    catch (e) {
      throw new FailedException('创建导出记录', e.message)
    }
  }

  /**
   * 更新导出记录状态和数量
   *
   * @param id number
   * @param status IGoodsExportRecordStatus
   * @param count number
   * @param result string
   */
  async updateStatusAndCount(
    id: number,
    status: IGoodsExportRecordStatus,
    count: number,
    result?: string,
  ) {
    try {
      await this.repository.update(id, {
        status,
        count,
        result: result || '',
      })
    }
    catch (e) {
      throw new FailedException('更新导出记录', e.message)
    }
  }

  /**
   * 删除导出记录
   *
   * @param id number
   * @throws FailedException
   */
  async delete(id: number) {
    try {
      await this.repository.delete(id)
    }
    catch (e) {
      throw new FailedException('删除导出记录', e.message)
    }
  }
}
