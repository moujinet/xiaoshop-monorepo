import type {
  IApiPaginationData,
  IProductBrand,
  IProductBrandDict,
  IProductBrandListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductBrand } from '@/product/brand/entity'
import {
  ProductBrandCreatedEvent,
  ProductBrandDeletedEvent,
  ProductBrandUpdatedEvent,
} from '@/product/brand/events'
import {
  GetProductBrandPagesRequest,
  ProductBrandPayload,
} from '@/product/brand/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductBrandService {
  constructor(
    @InjectRepository(ProductBrand)
    private readonly repository: Repository<ProductBrand>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品品牌列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductBrandListItem>>
   * @throws {FailedException} 获取商品品牌列表失败
   */
  async findPages(
    query: GetProductBrandPagesRequest,
  ): Promise<IApiPaginationData<IProductBrandListItem>> {
    try {
      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'logo', 'desc', 'sort', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品品牌列表', e.message)
    }
  }

  /**
   * 获取商品品牌字典列表
   *
   * @returns Promise<IProductBrandDict[]>
   * @throws {FailedException} 获取商品品牌列表失败
   */
  async findDictList(): Promise<IProductBrandDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品品牌字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品品牌详情
   *
   * @param id 商品品牌 ID
   * @returns Promise<IProductBrand>
   * @throws {FailedException} 获取商品品牌详情失败
   * @throws {NotFoundException} 商品品牌不存在
   */
  async findById(id: number): Promise<IProductBrand> {
    try {
      const result = await this.repository.findOneBy({ id })

      if (!result)
        throw new NotFoundException('商品品牌')

      return result
    }
    catch (e) {
      throw new FailedException('获取商品品牌详情', e.message, e.status)
    }
  }

  /**
   * 创建商品品牌
   *
   * @param data 商品品牌
   * @throws {FailedException} 创建商品品牌失败
   * @throws {ExistsException} 商品品牌已存在
   * @event ProductBrandCreatedEvent
   */
  async create(data: ProductBrandPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException('商品品牌')

      const brand = await this.repository.save(data)

      this.event.emit(
        toEventName(ProductBrandCreatedEvent.name),
        new ProductBrandCreatedEvent(brand.id, brand.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品品牌', e.message, e.status)
    }
  }

  /**
   * 更新商品品牌
   *
   * @param id 商品品牌 ID
   * @param data 商品品牌
   * @throws {FailedException} 更新商品品牌失败
   * @throws {NotFoundException} 商品品牌不存在
   * @throws {ExistsException} 商品品牌已存在
   * @event ProductBrandUpdatedEvent
   */
  async update(id: number, data: ProductBrandPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('商品品牌')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品品牌')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(ProductBrandUpdatedEvent.name),
        new ProductBrandUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品品牌', e.message, e.status)
    }
  }

  /**
   * 删除商品品牌
   *
   * @param id 商品品牌 ID
   * @throws {FailedException} 删除商品品牌失败
   * @event ProductBrandDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ProductBrandDeletedEvent.name),
          new ProductBrandDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品品牌', e.message)
    }
  }
}
