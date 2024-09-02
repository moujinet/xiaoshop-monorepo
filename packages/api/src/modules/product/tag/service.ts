import type {
  IApiPaginationData,
  IProductTag,
  IProductTagDict,
  IProductTagListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductTag } from '@/product/tag/entity'
import {
  ProductTagCreatedEvent,
  ProductTagDeletedEvent,
  ProductTagUpdatedEvent,
} from '@/product/tag/events'
import {
  GetProductTagPagesRequest,
  ProductTagPayload,
} from '@/product/tag/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductTagService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly repository: Repository<ProductTag>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品标签列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductTagListItem>>
   * @throws {FailedException} 获取商品标签列表失败
   */
  async findPages(
    query: GetProductTagPagesRequest,
  ): Promise<IApiPaginationData<IProductTagListItem>> {
    try {
      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'color', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品标签列表', e.message)
    }
  }

  /**
   * 获取商品标签字典列表
   *
   * @returns Promise<IProductTagDict[]>
   * @throws {FailedException} 获取商品标签列表失败
   */
  async findDictList(): Promise<IProductTagDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'color'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品标签字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品标签详情
   *
   * @param id 商品标签 ID
   * @returns Promise<IProductTag>
   * @throws {FailedException} 获取商品标签详情失败
   * @throws {NotFoundException} 商品标签不存在
   */
  async findById(id: number): Promise<IProductTag> {
    try {
      const result = await this.repository.findOneBy({ id })

      if (!result)
        throw new NotFoundException('商品标签')

      return result
    }
    catch (e) {
      throw new FailedException('获取商品标签详情', e.message, e.status)
    }
  }

  /**
   * 创建商品标签
   *
   * @param data 商品标签
   * @throws {FailedException} 创建商品标签失败
   * @throws {ExistsException} 商品标签已存在
   * @event ProductTagCreatedEvent
   */
  async create(data: ProductTagPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException('商品标签')

      const tag = await this.repository.save(data)

      this.event.emit(
        toEventName(ProductTagCreatedEvent.name),
        new ProductTagCreatedEvent(tag.id, tag.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品标签', e.message, e.status)
    }
  }

  /**
   * 更新商品标签
   *
   * @param id 商品标签 ID
   * @param data 商品标签
   * @throws {FailedException} 更新商品标签失败
   * @throws {NotFoundException} 商品标签不存在
   * @throws {ExistsException} 商品标签已存在
   * @event ProductTagUpdatedEvent
   */
  async update(id: number, data: ProductTagPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('商品标签')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品标签')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(ProductTagUpdatedEvent.name),
        new ProductTagUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品标签', e.message, e.status)
    }
  }

  /**
   * 删除商品标签
   *
   * @param id 商品标签 ID
   * @throws {FailedException} 删除商品标签失败
   * @event ProductTagDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ProductTagDeletedEvent.name),
          new ProductTagDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品标签', e.message)
    }
  }
}
