import type {
  IApiPaginationData,
  IProductAddition,
  IProductAdditionDict,
  IProductAdditionListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductAddition } from '@/product/addition/entity'
import {
  ProductAdditionCreatedEvent,
  ProductAdditionDeletedEvent,
  ProductAdditionUpdatedEvent,
} from '@/product/addition/events'
import {
  GetProductAdditionPagesRequest,
  ProductAdditionPayload,
} from '@/product/addition/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductAdditionService {
  constructor(
    @InjectRepository(ProductAddition)
    private readonly repository: Repository<ProductAddition>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品附加服务列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductAdditionListItem>>
   * @throws {FailedException} 获取商品附加服务列表失败
   */
  async findPages(
    query: GetProductAdditionPagesRequest,
  ): Promise<IApiPaginationData<IProductAdditionListItem>> {
    try {
      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'icon', 'price', 'desc', 'sort', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品附加服务列表', e.message)
    }
  }

  /**
   * 获取商品附加服务字典列表
   *
   * @returns Promise<IProductAdditionDict[]>
   * @throws {FailedException} 获取商品附加服务列表失败
   */
  async findDictList(): Promise<IProductAdditionDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'icon', 'price'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品附加服务字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品附加服务详情
   *
   * @param id 商品附加服务 ID
   * @returns Promise<IProductAddition>
   * @throws {FailedException} 获取商品附加服务详情失败
   * @throws {NotFoundException} 商品附加服务不存在
   */
  async findById(id: number): Promise<IProductAddition> {
    try {
      const result = await this.repository.findOneBy({ id })

      if (!result)
        throw new NotFoundException('商品附加服务')

      return result
    }
    catch (e) {
      throw new FailedException('获取商品附加服务详情', e.message, e.status)
    }
  }

  /**
   * 创建商品附加服务
   *
   * @param data 商品附加服务
   * @throws {FailedException} 创建商品附加服务失败
   * @throws {ExistsException} 商品附加服务已存在
   * @event ProductAdditionCreatedEvent
   */
  async create(data: ProductAdditionPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException('商品附加服务')

      const service = await this.repository.save(data)

      this.event.emit(
        toEventName(ProductAdditionCreatedEvent.name),
        new ProductAdditionCreatedEvent(service.id, service.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品附加服务', e.message, e.status)
    }
  }

  /**
   * 更新商品附加服务
   *
   * @param id 商品附加服务 ID
   * @param data 商品附加服务
   * @throws {FailedException} 更新商品附加服务失败
   * @throws {NotFoundException} 商品附加服务不存在
   * @throws {ExistsException} 商品附加服务已存在
   * @event ProductAdditionUpdatedEvent
   */
  async update(id: number, data: ProductAdditionPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('商品附加服务')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品附加服务')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(ProductAdditionUpdatedEvent.name),
        new ProductAdditionUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品附加服务', e.message, e.status)
    }
  }

  /**
   * 删除商品附加服务
   *
   * @param id 商品附加服务 ID
   * @throws {FailedException} 删除商品附加服务失败
   * @event ProductAdditionDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ProductAdditionDeletedEvent.name),
          new ProductAdditionDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品附加服务', e.message)
    }
  }
}
