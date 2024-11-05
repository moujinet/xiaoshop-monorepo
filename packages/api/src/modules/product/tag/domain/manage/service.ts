import type { IProductTagRepository } from '@/product/tag/model/interface'
import type { IApiPaginationData, IProductTagDict, IProductTagInfo, IProductTagList } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { ProductTagRepo } from '@/product/tag/model/provider'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { GetProductTagPagesRequest } from '@/product/tag/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateProductTagPayload, UpdateProductTagPayload } from '@/product/tag/dto/payload'

import { ProductTagCreateEvent, ProductTagDeleteEvent, ProductTagUpdateEvent } from './events'

@Injectable()
export class ProductTagService {
  constructor(
    @ProductTagRepo()
    private readonly repo: IProductTagRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品标签分页列表
   *
   * @param query 查询条件
   * @returns 商品标签分页列表
   * @throws {FailedException} 获取商品标签分页列表失败
   */
  async findPages(
    query: GetProductTagPagesRequest,
  ): Promise<IApiPaginationData<IProductTagList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取商品标签分页列表', e.message)
    }
  }

  /**
   * 获取商品标签字典列表
   *
   * @returns 商品标签字典列表
   * @throws {FailedException} 获取商品标签字典列表失败
   */
  async findDictList(): Promise<IProductTagDict[]> {
    try {
      return await this.repo.find(['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取商品标签字典列表', e.message)
    }
  }

  /**
   * 获取商品标签详情
   *
   * @param id 商品标签 ID
   * @returns 获取商品标签详情失败
   */
  async findById(id: number): Promise<IProductTagInfo> {
    try {
      const tag = await this.repo.findById(id)

      if (!tag)
        throw new NotFoundException('商品标签')

      return tag
    }
    catch (e) {
      throw new FailedException('获取商品标签详情', e.message, e.code)
    }
  }

  /**
   * 创建商品标签
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品标签失败
   * @throws {ExistsException} 商品标签已存在
   */
  async create(data: CreateProductTagPayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('商品标签')

      const tag = await this.repo.create(data)

      this.event.emit(
        new ProductTagCreateEvent(tag.id, tag.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品标签', e.message, e.code)
    }
  }

  /**
   * 更新商品标签
   *
   * @param id 商品标签 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品标签失败
   * @throws {NotFoundException} 商品标签不存在
   * @throws {ExistsException} 商品标签已存在
   */
  async update(id: number, data: UpdateProductTagPayload) {
    try {
      const tag = await this.repo.findById(id)

      if (!tag)
        throw new NotFoundException('商品标签')

      if (await this.repo.exists({ id: Not(id), name: data.name.trim() }))
        throw new ExistsException('商品标签')

      const updated = await this.repo.update(tag, data)

      this.event.emit(
        new ProductTagUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品标签', e.message, e.code)
    }
  }

  /**
   * 删除商品标签
   *
   * @param id 商品标签 ID
   * @throws {FailedException} 删除商品标签失败
   */
  async delete(id: number) {
    try {
      const tag = await this.repo.findById(id, ['id', 'name'])

      if (tag) {
        await this.repo.destroy(tag.id)

        this.event.emit(
          new ProductTagDeleteEvent(tag.id, tag.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品标签', e.message)
    }
  }
}
