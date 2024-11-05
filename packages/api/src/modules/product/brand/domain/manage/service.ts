import type { IProductBrandRepository } from '@/product/brand/model/interface'
import type { IApiPaginationData, IProductBrandDict, IProductBrandInfo, IProductBrandList } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { ProductBrandRepo } from '@/product/brand/model/provider'
import { GetProductBrandPagesRequest } from '@/product/brand/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateProductBrandPayload, UpdateProductBrandPayload } from '@/product/brand/dto/payload'

import { ProductBrandCreateEvent, ProductBrandDeleteEvent, ProductBrandUpdateEvent } from './events'

@Injectable()
export class ProductBrandService {
  constructor(
    @ProductBrandRepo()
    private readonly repo: IProductBrandRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品品牌分页列表
   *
   * @param query 查询条件
   * @returns 商品品牌分页列表
   * @throws {FailedException} 获取商品品牌分页列表失败
   */
  async findPages(
    query: GetProductBrandPagesRequest,
  ): Promise<IApiPaginationData<IProductBrandList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取商品品牌分页列表', e.message)
    }
  }

  /**
   * 获取商品品牌字典列表
   *
   * @returns 商品品牌字典列表
   * @throws {FailedException} 获取商品品牌字典列表失败
   */
  async findDictList(): Promise<IProductBrandDict[]> {
    try {
      return await this.repo.find(['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取商品品牌字典列表', e.message)
    }
  }

  /**
   * 获取商品品牌详情
   *
   * @param id 商品品牌 ID
   * @returns 获取商品品牌详情失败
   */
  async findById(id: number): Promise<IProductBrandInfo> {
    try {
      const brand = await this.repo.findById(id)

      if (!brand)
        throw new NotFoundException('商品品牌')

      return brand
    }
    catch (e) {
      throw new FailedException('获取商品品牌详情', e.message, e.code)
    }
  }

  /**
   * 创建商品品牌
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品品牌失败
   * @throws {ExistsException} 商品品牌已存在
   */
  async create(data: CreateProductBrandPayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('商品品牌')

      const brand = await this.repo.create(data)

      this.event.emit(
        new ProductBrandCreateEvent(brand.id, brand.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品品牌', e.message, e.code)
    }
  }

  /**
   * 更新商品品牌
   *
   * @param id 商品品牌 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品品牌失败
   * @throws {NotFoundException} 商品品牌不存在
   * @throws {ExistsException} 商品品牌已存在
   */
  async update(id: number, data: UpdateProductBrandPayload) {
    try {
      const brand = await this.repo.findById(id)

      if (!brand)
        throw new NotFoundException('商品品牌')

      if (await this.repo.exists({ id: Not(id), name: data.name.trim() }))
        throw new ExistsException('商品品牌')

      const updated = await this.repo.update(brand, data)

      this.event.emit(
        new ProductBrandUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品品牌', e.message, e.code)
    }
  }

  /**
   * 删除商品品牌
   *
   * @param id 商品品牌 ID
   * @throws {FailedException} 删除商品品牌失败
   */
  async delete(id: number) {
    try {
      const brand = await this.repo.findById(id, ['id', 'name'])

      if (brand) {
        await this.repo.destroy(brand.id)

        this.event.emit(
          new ProductBrandDeleteEvent(brand.id, brand.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品品牌', e.message)
    }
  }
}
