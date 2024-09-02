import type {
  IApiPaginationData,
  IProductCommitment,
  IProductCommitmentDict,
  IProductCommitmentListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductCommitment } from '@/product/commitment/entity'
import {
  ProductCommitmentCreatedEvent,
  ProductCommitmentDeletedEvent,
  ProductCommitmentUpdatedEvent,
} from '@/product/commitment/events'
import {
  GetProductCommitmentPagesRequest,
  ProductCommitmentPayload,
} from '@/product/commitment/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductCommitmentService {
  constructor(
    @InjectRepository(ProductCommitment)
    private readonly repository: Repository<ProductCommitment>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品服务承诺列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductCommitmentListItem>>
   * @throws {FailedException} 获取商品服务承诺列表失败
   */
  async findPages(
    query: GetProductCommitmentPagesRequest,
  ): Promise<IApiPaginationData<IProductCommitmentListItem>> {
    try {
      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'icon', 'desc', 'sort', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品服务承诺列表', e.message)
    }
  }

  /**
   * 获取商品服务承诺字典列表
   *
   * @returns Promise<IProductCommitmentDict[]>
   * @throws {FailedException} 获取商品服务承诺列表失败
   */
  async findDictList(): Promise<IProductCommitmentDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'icon'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品服务承诺字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品服务承诺详情
   *
   * @param id 商品服务承诺 ID
   * @returns Promise<IProductCommitment>
   * @throws {FailedException} 获取商品服务承诺详情失败
   * @throws {NotFoundException} 商品服务承诺不存在
   */
  async findById(id: number): Promise<IProductCommitment> {
    try {
      const result = await this.repository.findOneBy({ id })

      if (!result)
        throw new NotFoundException('商品服务承诺')

      return result
    }
    catch (e) {
      throw new FailedException('获取商品服务承诺详情', e.message, e.status)
    }
  }

  /**
   * 创建商品服务承诺
   *
   * @param data 商品服务承诺
   * @throws {FailedException} 创建商品服务承诺失败
   * @throws {ExistsException} 商品服务承诺已存在
   * @event ProductCommitmentCreatedEvent
   */
  async create(data: ProductCommitmentPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException('商品服务承诺')

      const service = await this.repository.save(data)

      this.event.emit(
        toEventName(ProductCommitmentCreatedEvent.name),
        new ProductCommitmentCreatedEvent(service.id, service.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品服务承诺', e.message, e.status)
    }
  }

  /**
   * 更新商品服务承诺
   *
   * @param id 商品服务承诺 ID
   * @param data 商品服务承诺
   * @throws {FailedException} 更新商品服务承诺失败
   * @throws {NotFoundException} 商品服务承诺不存在
   * @throws {ExistsException} 商品服务承诺已存在
   * @event ProductCommitmentUpdatedEvent
   */
  async update(id: number, data: ProductCommitmentPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('商品服务承诺')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品服务承诺')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(ProductCommitmentUpdatedEvent.name),
        new ProductCommitmentUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品服务承诺', e.message, e.status)
    }
  }

  /**
   * 删除商品服务承诺
   *
   * @param id 商品服务承诺 ID
   * @throws {FailedException} 删除商品服务承诺失败
   * @event ProductCommitmentDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ProductCommitmentDeletedEvent.name),
          new ProductCommitmentDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品服务承诺', e.message)
    }
  }
}
