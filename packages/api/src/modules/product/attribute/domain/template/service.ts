import type { IProductAttributeTemplateRepository } from '@/product/attribute/model/template/interface'
import type { IApiPaginationData, IProductAttributeTemplateDict, IProductAttributeTemplateInfo, IProductAttributeTemplateList } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { GetProductAttributeTemplatePagesRequest } from '@/product/attribute/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { ProductAttributeTemplateRepo } from '@/product/attribute/model/template/provider'
import { CreateProductAttributeTemplatePayload, UpdateProductAttributeTemplatePayload } from '@/product/attribute/dto/payload'

import { ProductAttributeTemplateCreateEvent, ProductAttributeTemplateDeleteEvent, ProductAttributeTemplateUpdateEvent } from './events'

@Injectable()
export class ProductAttributeTemplateService {
  constructor(
    @ProductAttributeTemplateRepo()
    private readonly repo: IProductAttributeTemplateRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品参数模板分页列表
   *
   * @param query 查询条件
   * @returns 商品参数模板分页列表
   * @throws {FailedException} 获取商品参数模板分页列表失败
   */
  async findPages(
    query: GetProductAttributeTemplatePagesRequest,
  ): Promise<IApiPaginationData<IProductAttributeTemplateList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取商品参数模板分页列表', e.message)
    }
  }

  /**
   * 获取商品参数模板字典列表
   *
   * @returns 商品参数模板字典列表
   * @throws {FailedException} 获取商品参数模板字典列表失败
   */
  async findDictList(): Promise<IProductAttributeTemplateDict[]> {
    try {
      return await this.repo.find(['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取商品参数模板字典列表', e.message)
    }
  }

  /**
   * 获取商品参数模板详情
   *
   * @param id 商品参数模板 ID
   * @returns 获取商品参数模板详情失败
   */
  async findById(id: number): Promise<IProductAttributeTemplateInfo> {
    try {
      const template = await this.repo.findById(id)

      if (!template)
        throw new NotFoundException('商品参数模板')

      return template
    }
    catch (e) {
      throw new FailedException('获取商品参数模板详情', e.message, e.code)
    }
  }

  /**
   * 创建商品参数模板
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品参数模板失败
   * @throws {ExistsException} 商品参数模板已存在
   */
  async create(data: CreateProductAttributeTemplatePayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('商品参数模板')

      const template = await this.repo.create(data)

      this.event.emit(
        new ProductAttributeTemplateCreateEvent(template.id, template.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品参数模板', e.message, e.code)
    }
  }

  /**
   * 更新商品参数模板
   *
   * @param id 商品参数模板 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品参数模板失败
   * @throws {NotFoundException} 商品参数模板不存在
   * @throws {ExistsException} 商品参数模板已存在
   */
  async update(id: number, data: UpdateProductAttributeTemplatePayload) {
    try {
      const template = await this.repo.findById(id)

      if (!template)
        throw new NotFoundException('商品参数模板')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
      })) {
        throw new ExistsException('商品参数模板')
      }

      const updated = await this.repo.update(template, data)

      this.event.emit(
        new ProductAttributeTemplateUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品参数模板', e.message, e.code)
    }
  }

  /**
   * 删除商品参数模板
   *
   * @param id 商品参数模板 ID
   * @throws {FailedException} 删除商品参数模板失败
   */
  async delete(id: number) {
    try {
      const template = await this.repo.findById(id, ['id', 'name'])

      if (template) {
        await this.repo.destroy(template.id)

        this.event.emit(
          new ProductAttributeTemplateDeleteEvent(template.id, template.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品参数模板', e.message)
    }
  }
}
