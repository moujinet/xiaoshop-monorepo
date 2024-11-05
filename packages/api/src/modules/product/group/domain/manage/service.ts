import type { IProductGroupRepository } from '@/product/group/model/interface'
import type { IApiPaginationData, IProductGroupDict, IProductGroupInfo, IProductGroupList } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { ProductGroupRepo } from '@/product/group/model/provider'
import { GetProductGroupPagesRequest } from '@/product/group/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateProductGroupPayload, UpdateProductGroupPayload } from '@/product/group/dto/payload'

import { ProductGroupCreateEvent, ProductGroupDeleteEvent, ProductGroupUpdateEvent } from './events'

@Injectable()
export class ProductGroupService {
  constructor(
    @ProductGroupRepo()
    private readonly repo: IProductGroupRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品分组分页列表
   *
   * @param query 查询条件
   * @returns 商品分组分页列表
   * @throws {FailedException} 获取商品分组分页列表失败
   */
  async findPages(
    query: GetProductGroupPagesRequest,
  ): Promise<IApiPaginationData<IProductGroupList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取商品分组分页列表', e.message)
    }
  }

  /**
   * 获取商品分组字典列表
   *
   * @returns 商品分组字典列表
   * @throws {FailedException} 获取商品分组字典列表失败
   */
  async findDictList(): Promise<IProductGroupDict[]> {
    try {
      return await this.repo.find(['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取商品分组字典列表', e.message)
    }
  }

  /**
   * 获取商品分组详情
   *
   * @param id 商品分组 ID
   * @returns 获取商品分组详情失败
   */
  async findById(id: number): Promise<IProductGroupInfo> {
    try {
      const group = await this.repo.findById(id)

      if (!group)
        throw new NotFoundException('商品分组')

      return group
    }
    catch (e) {
      throw new FailedException('获取商品分组详情', e.message, e.code)
    }
  }

  /**
   * 创建商品分组
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品分组失败
   * @throws {ExistsException} 商品分组已存在
   */
  async create(data: CreateProductGroupPayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('商品分组')

      const group = await this.repo.create(data)

      this.event.emit(
        new ProductGroupCreateEvent(group.id, group.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品分组', e.message, e.code)
    }
  }

  /**
   * 更新商品分组
   *
   * @param id 商品分组 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品分组失败
   * @throws {NotFoundException} 商品分组不存在
   * @throws {ExistsException} 商品分组已存在
   */
  async update(id: number, data: UpdateProductGroupPayload) {
    try {
      const group = await this.repo.findById(id)

      if (!group)
        throw new NotFoundException('商品分组')

      if (await this.repo.exists({ id: Not(id), name: data.name.trim() }))
        throw new ExistsException('商品分组')

      const updated = await this.repo.update(group, data)

      this.event.emit(
        new ProductGroupUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品分组', e.message, e.code)
    }
  }

  /**
   * 删除商品分组
   *
   * @param id 商品分组 ID
   * @throws {FailedException} 删除商品分组失败
   */
  async delete(id: number) {
    try {
      const group = await this.repo.findById(id, ['id', 'name'])

      if (group) {
        await this.repo.destroy(group.id)

        this.event.emit(
          new ProductGroupDeleteEvent(group.id, group.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品分组', e.message)
    }
  }
}
