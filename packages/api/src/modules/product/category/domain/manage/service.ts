import type { IProductCategoryRepository } from '@/product/category/model/interface'
import type { IProductCategoryDict, IProductCategoryInfo, IProductCategoryList, IProductCategoryNestedDict } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { ProductCategoryRepo } from '@/product/category/model/provider'
import { toProductCategoryNestedDict } from '@/product/category/model/mapper'
import { GetProductCategoryListRequest } from '@/product/category/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateProductCategoryPayload, UpdateProductCategoryPayload } from '@/product/category/dto/payload'

import { ProductCategoryCreateEvent, ProductCategoryDeleteEvent, ProductCategoryUpdateEvent } from './events'

@Injectable()
export class ProductCategoryService {
  constructor(
    @ProductCategoryRepo()
    private readonly repo: IProductCategoryRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品分类嵌套列表
   *
   * @param query 查询条件
   * @returns 商品分类嵌套列表
   * @throws {FailedException} 获取商品分类嵌套列表失败
   */
  async findList(query?: GetProductCategoryListRequest): Promise<IProductCategoryList[]> {
    try {
      return await this.repo.find(query)
    }
    catch (e) {
      throw new FailedException('获取商品分类嵌套列表', e.message)
    }
  }

  /**
   * 获取商品分类字典列表
   *
   * @param query 查询条件
   * @returns 商品分类字典列表
   * @throws {FailedException} 获取商品分类字典列表失败
   */
  async findDictList(query?: GetProductCategoryListRequest): Promise<IProductCategoryDict[]> {
    try {
      return await this.repo.find(query, ['id', 'parentId', 'name'])
    }
    catch (e) {
      throw new FailedException('获取商品分类字典列表', e.message)
    }
  }

  /**
   * 获取商品分类嵌套字典列表
   *
   * @param query 查询条件
   * @returns 商品分类嵌套字典列表
   * @throws {FailedException} 获取商品分类嵌套字典列表失败
   */
  async findNestedDict(query?: GetProductCategoryListRequest): Promise<IProductCategoryNestedDict[]> {
    try {
      return await this.repo.find(query, ['id', 'parentId', 'name'])
        .then(toProductCategoryNestedDict)
    }
    catch (e) {
      throw new FailedException('获取商品分类嵌套字典列表', e.message)
    }
  }

  /**
   * 获取商品分类详情
   *
   * @param id 商品分类 ID
   * @returns 获取商品分类详情失败
   */
  async findById(id: number): Promise<IProductCategoryInfo> {
    try {
      const category = await this.repo.findById(id)

      if (!category)
        throw new NotFoundException('商品分类')

      return category
    }
    catch (e) {
      throw new FailedException('获取商品分类详情', e.message, e.code)
    }
  }

  /**
   * 创建商品分类
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品分类失败
   * @throws {ExistsException} 商品分类已存在
   */
  async create(data: CreateProductCategoryPayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('商品分类')

      const category = await this.repo.create(data)

      this.event.emit(
        new ProductCategoryCreateEvent(category.id, category.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品分类', e.message, e.code)
    }
  }

  /**
   * 更新商品分类
   *
   * @param id 商品分类 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品分类失败
   * @throws {NotFoundException} 商品分类不存在
   * @throws {ExistsException} 商品分类已存在
   */
  async update(id: number, data: UpdateProductCategoryPayload) {
    try {
      const category = await this.repo.findById(id)

      if (!category)
        throw new NotFoundException('商品分类')

      if (await this.repo.exists({ id: Not(id), name: data.name.trim() }))
        throw new ExistsException('商品分类')

      const updated = await this.repo.update(category, data)

      this.event.emit(
        new ProductCategoryUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品分类', e.message, e.code)
    }
  }

  /**
   * 删除商品分类
   *
   * @param id 商品分类 ID
   * @throws {FailedException} 删除商品分类失败
   */
  async delete(id: number) {
    try {
      const category = await this.repo.findById(id, ['id', 'name'])

      if (category) {
        await this.repo.destroy(category.id)

        this.event.emit(
          new ProductCategoryDeleteEvent(category.id, category.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品分类', e.message)
    }
  }
}
