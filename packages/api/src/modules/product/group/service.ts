import type {
  IApiPaginationData,
  IProductGroup,
  IProductGroupDict,
  IProductGroupListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductGroup } from '@/product/group/entity'
import {
  ProductGroupCreatedEvent,
  ProductGroupDeletedEvent,
  ProductGroupUpdatedEvent,
} from '@/product/group/events'
import {
  GetProductGroupPagesRequest,
  ProductGroupPayload,
} from '@/product/group/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductGroupService {
  constructor(
    @InjectRepository(ProductGroup)
    private readonly repository: Repository<ProductGroup>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品分组列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductGroupListItem>>
   * @throws {FailedException} 获取商品分组列表失败
   */
  async findPages(
    query: GetProductGroupPagesRequest,
  ): Promise<IApiPaginationData<IProductGroupListItem>> {
    try {
      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'desc', 'sort', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品分组列表', e.message)
    }
  }

  /**
   * 获取商品分组字典列表
   *
   * @returns Promise<IProductGroupDict[]>
   * @throws {FailedException} 获取商品分组列表失败
   */
  async findDictList(): Promise<IProductGroupDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品分组字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品分组详情
   *
   * @param id 商品分组 ID
   * @returns Promise<IProductGroup>
   * @throws {FailedException} 获取商品分组详情失败
   * @throws {NotFoundException} 商品分组不存在
   */
  async findById(id: number): Promise<IProductGroup> {
    try {
      const result = await this.repository.findOneBy({ id })

      if (!result)
        throw new NotFoundException('商品分组')

      return result
    }
    catch (e) {
      throw new FailedException('获取商品分组详情', e.message, e.status)
    }
  }

  /**
   * 创建商品分组
   *
   * @param data 商品分组
   * @throws {FailedException} 创建商品分组失败
   * @throws {ExistsException} 商品分组已存在
   * @event ProductGroupCreatedEvent
   */
  async create(data: ProductGroupPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException('商品分组')

      const group = await this.repository.save(data)

      this.event.emit(
        toEventName(ProductGroupCreatedEvent.name),
        new ProductGroupCreatedEvent(group.id, group.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品分组', e.message, e.status)
    }
  }

  /**
   * 更新商品分组
   *
   * @param id 商品分组 ID
   * @param data 商品分组
   * @throws {FailedException} 更新商品分组失败
   * @throws {NotFoundException} 商品分组不存在
   * @throws {ExistsException} 商品分组已存在
   * @event ProductGroupUpdatedEvent
   */
  async update(id: number, data: ProductGroupPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('商品分组')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品分组')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(ProductGroupUpdatedEvent.name),
        new ProductGroupUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品分组', e.message, e.status)
    }
  }

  /**
   * 删除商品分组
   *
   * @param id 商品分组 ID
   * @throws {FailedException} 删除商品分组失败
   * @event ProductGroupDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ProductGroupDeletedEvent.name),
          new ProductGroupDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品分组', e.message)
    }
  }
}
