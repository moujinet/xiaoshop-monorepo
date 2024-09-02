import type {
  IApiPaginationData,
  IProductAttributeTemplate,
  IProductAttributeTemplateDict,
  IProductAttributeTemplateListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ProductAttributeTemplate } from '@/product/attribute-template/entity'
import {
  ProductAttributeTemplateCreatedEvent,
  ProductAttributeTemplateDeletedEvent,
  ProductAttributeTemplateUpdatedEvent,
} from '@/product/attribute-template/events'
import {
  GetProductAttributeTemplatePagesRequest,
  ProductAttributeTemplatePayload,
} from '@/product/attribute-template/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class ProductAttributeTemplateService {
  constructor(
    @InjectRepository(ProductAttributeTemplate)
    private readonly repository: Repository<ProductAttributeTemplate>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取商品参数模板分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IProductAttributeTemplateListItem>>
   * @throws {FailedException} 获取商品参数模板分页列表失败
   */
  async findPages(
    query: GetProductAttributeTemplatePagesRequest,
  ): Promise<IApiPaginationData<IProductAttributeTemplateListItem>> {
    try {
      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'desc', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取商品参数模板分页列表', e.message)
    }
  }

  /**
   * 获取商品参数模板字典列表
   *
   * @returns Promise<IProductAttributeTemplateDict[]>
   * @throws {FailedException} 获取商品参数模板列表失败
   */
  async findDictList(): Promise<IProductAttributeTemplateDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品参数模板字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取商品参数模板详情
   *
   * @param id 商品参数模板 ID
   * @returns Promise<IProductAttributeTemplate>
   * @throws {FailedException} 获取商品参数模板详情失败
   * @throws {NotFoundException} 商品参数模板不存在
   */
  async findById(id: number): Promise<IProductAttributeTemplate> {
    try {
      const result = await this.repository.findOneBy({ id })

      if (!result)
        throw new NotFoundException('商品参数模板')

      return result
    }
    catch (e) {
      throw new FailedException('获取商品参数模板详情', e.message, e.status)
    }
  }

  /**
   * 创建商品参数模板
   *
   * @param data 商品参数模板
   * @throws {FailedException} 创建商品参数模板失败
   * @throws {ExistsException} 商品参数模板已存在
   * @event ProductAttributeTemplateCreatedEvent
   */
  async create(data: ProductAttributeTemplatePayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException('商品参数模板')

      const template = await this.repository.save(data)

      this.event.emit(
        toEventName(ProductAttributeTemplateCreatedEvent.name),
        new ProductAttributeTemplateCreatedEvent(template.id, template.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品参数模板', e.message, e.status)
    }
  }

  /**
   * 更新商品参数模板
   *
   * @param id 商品参数模板 ID
   * @param data 商品参数模板
   * @throws {FailedException} 更新商品参数模板失败
   * @throws {NotFoundException} 商品参数模板不存在
   * @throws {ExistsException} 商品参数模板已存在
   * @event ProductAttributeTemplateUpdatedEvent
   */
  async update(id: number, data: ProductAttributeTemplatePayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException('商品参数模板')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException('商品参数模板')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(ProductAttributeTemplateUpdatedEvent.name),
        new ProductAttributeTemplateUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品参数模板', e.message, e.status)
    }
  }

  /**
   * 删除商品参数模板
   *
   * @param id 商品参数模板 ID
   * @throws {FailedException} 删除商品参数模板失败
   * @event ProductAttributeTemplateDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(ProductAttributeTemplateDeletedEvent.name),
          new ProductAttributeTemplateDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品参数模板', e.message)
    }
  }
}
