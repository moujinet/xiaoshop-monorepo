import type {
  IProductCategory,
  IProductCategoryDict,
  IProductCategoryListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductCategory } from '@/product/category/entity'
import {
  ProductCategoryCreatedEvent,
  ProductCategoryDeletedEvent,
  ProductCategoryUpdatedEvent,
} from '@/product/category/events'
import {
  ProductCategoryPayload,
} from '@/product/category/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly repository: Repository<ProductCategory>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品分类列表
   *
   * @param parentId 父分类 ID
   * @returns Promise<IProductCategoryListItem[]>
   * @throws {FailedException} 获取商品分类列表失败
   */
  async findList(parentId?: number): Promise<IProductCategoryListItem[]> {
    try {
      const where = parentId !== undefined ? { parentId } : {}

      return await this.repository.find({
        select: ['id', 'parentId', 'name', 'desc', 'image', 'sort', 'updatedTime'],
        where,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品分类列表', e.message)
    }
  }

  /**
   * 获取商品分类字典列表
   *
   * @param parentId 父分类 ID
   * @returns Promise<IProductCategoryDict[]>
   * @throws {FailedException} 获取商品分类列表失败
   */
  async findDictList(parentId?: number): Promise<IProductCategoryDict[]> {
    try {
      const where = parentId !== undefined ? { parentId } : {}

      return await this.repository.find({
        select: ['id', 'parentId', 'name'],
        where,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品分类字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品分类详情
   *
   * @param id 商品分类 ID
   * @returns Promise<IProductCategory>
   * @throws {FailedException} 获取商品分类详情失败
   * @throws {NotFoundException} 商品分类不存在
   */
  async findById(id: number): Promise<IProductCategory> {
    try {
      const result = await this.repository.findOneBy({ id })

      if (!result)
        throw new NotFoundException('商品分类')

      return result
    }
    catch (e) {
      throw new FailedException('获取商品分类详情', e.message, e.status)
    }
  }

  /**
   * 创建商品分类
   *
   * @param data 商品分类
   * @throws {FailedException} 创建商品分类失败
   * @throws {ExistsException} 商品分类已存在
   * @event ProductCategoryCreatedEvent
   */
  async create(data: ProductCategoryPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException('商品分类')

      const category = await this.repository.save(data)

      this.event.emit(
        toEventName(ProductCategoryCreatedEvent.name),
        new ProductCategoryCreatedEvent(category.id, category.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品分类', e.message, e.status)
    }
  }

  /**
   * 更新商品分类
   *
   * @param id 商品分类 ID
   * @param data 商品分类
   * @throws {FailedException} 更新商品分类失败
   * @throws {NotFoundException} 商品分类不存在
   * @throws {ExistsException} 商品分类已存在
   * @event ProductCategoryUpdatedEvent
   */
  async update(id: number, data: ProductCategoryPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('商品分类')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品分类')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(ProductCategoryUpdatedEvent.name),
        new ProductCategoryUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品分类', e.message, e.status)
    }
  }

  /**
   * 删除商品分类
   *
   * @param id 商品分类 ID
   * @throws {FailedException} 删除商品分类失败
   * @event ProductCategoryDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ProductCategoryDeletedEvent.name),
          new ProductCategoryDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品分类', e.message)
    }
  }
}
