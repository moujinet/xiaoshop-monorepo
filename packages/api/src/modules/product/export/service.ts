import {
  type IApiPaginationData,
  type IProductExport,
  ProductExportStatus,
} from '@xiaoshop/shared'
import { Between, FindOptionsWhere, Repository } from 'typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductExport } from '@/product/export/entity'
import {
  ProductExportCompletedEvent,
  ProductExportCreatedEvent,
  ProductExportDeletedEvent,
} from '@/product/export/events'
import {
  GetProductExportPagesRequest,
  ProductExportConditionsPayload,
} from '@/product/export/dto'
import { FailedException } from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductExportService {
  constructor(
    @InjectRepository(ProductExport)
    private readonly repository: Repository<ProductExport>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品导出列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductExport>>
   * @throws {FailedException} 获取商品导出列表失败
   */
  async findPages(
    query: GetProductExportPagesRequest,
  ): Promise<IApiPaginationData<IProductExport>> {
    try {
      const where: FindOptionsWhere<ProductExport> = {}

      if (query.status)
        where.status = query.status

      if (query.createdTime) {
        const [from, to] = query.createdTime.split(',')
        where.createdTime = Between(`${from} 00:00:00`, `${to} 23:59:59`)
      }

      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        where,
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          createdTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品导出列表失败', e.message)
    }
  }

  /**
   * 创建商品导出记录
   *
   * @param conditions 导出条件
   * @throws {FailedException} 创建商品导出记录失败
   * @event ProductExportCreatedEvent
   */
  async create(conditions: ProductExportConditionsPayload) {
    try {
      const record = new ProductExport()

      record.conditions = conditions

      const created = await this.repository.save(record)

      if (created) {
        this.event.emit(
          toEventName(ProductExportCreatedEvent.name),
          new ProductExportCreatedEvent(created.id, conditions),
        )
      }
    }
    catch (e) {
      throw new FailedException('创建商品导出记录', e.message)
    }
  }

  /**
   * 更新商品导出记录
   *
   * @param id 记录 ID
   * @param count 导出数量
   * @param filePath 导出文件路径
   * @throws {FailedException} 更新商品导出记录失败
   * @event ProductExportCompletedEvent
   */
  async update(id: number, count: number, filePath: string) {
    try {
      const status = filePath
        ? ProductExportStatus.COMPLETED
        : ProductExportStatus.FAILED

      await this.repository.update(id, {
        status,
        count,
        filePath,
      })

      this.event.emit(
        toEventName(ProductExportCompletedEvent.name),
        new ProductExportCompletedEvent(id, status, count, filePath),
      )
    }
    catch (e) {
      throw new FailedException('更新商品导出记录', e.message)
    }
  }

  /**
   * 删除商品导出记录
   *
   * @param id 记录 ID
   * @throws {FailedException} 删除商品导出记录
   * @event ProductExportDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        return

      await this.repository.delete(id)

      this.event.emit(
        toEventName(ProductExportDeletedEvent.name),
        new ProductExportDeletedEvent(id, founded.filePath),
      )
    }
    catch (e) {
      throw new FailedException('删除商品导出记录', e.message)
    }
  }
}
