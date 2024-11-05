import type { IProductServiceAdditionRepository } from '@/product/service/model/addition/interface'
import type {
  IApiPaginationData,
  IProductServiceAdditionDict,
  IProductServiceAdditionInfo,
  IProductServiceAdditionList,
} from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { GetProductServicePagesRequest } from '@/product/service/dto/request'
import { ProductServiceAdditionRepo } from '@/product/service/model/addition/provider'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateProductAdditionServicePayload, UpdateProductAdditionServicePayload } from '@/product/service/dto/payload'

import { ProductAdditionServiceCreateEvent, ProductAdditionServiceDeleteEvent, ProductAdditionServiceUpdateEvent } from './events'

@Injectable()
export class ProductServiceAdditionService {
  constructor(
    @ProductServiceAdditionRepo()
    private readonly repo: IProductServiceAdditionRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品附加服务分页列表
   *
   * @param query 查询条件
   * @returns 商品附加服务分页列表
   * @throws {FailedException} 获取商品附加服务分页列表失败
   */
  async findPages(
    query: GetProductServicePagesRequest,
  ): Promise<IApiPaginationData<IProductServiceAdditionList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(
        ['id', 'name', 'icon', 'desc', 'price', 'sort', 'updatedTime'],
        page,
        pagesize,
      )
    }
    catch (e) {
      throw new FailedException('获取商品附加服务分页列表', e.message)
    }
  }

  /**
   * 获取商品附加服务字典列表
   *
   * @returns 商品附加服务字典列表
   * @throws {FailedException} 获取商品附加服务字典列表失败
   */
  async findDictList(): Promise<IProductServiceAdditionDict[]> {
    try {
      return await this.repo.find(['id', 'name', 'icon', 'price'])
    }
    catch (e) {
      throw new FailedException('获取商品附加服务字典列表', e.message)
    }
  }

  /**
   * 获取商品附加服务详情
   *
   * @param id 商品附加服务 ID
   * @returns 获取商品附加服务详情失败
   */
  async findById(id: number): Promise<IProductServiceAdditionInfo> {
    try {
      const service = await this.repo.findOne(
        { id },
        ['id', 'name', 'icon', 'desc', 'price', 'sort'],
      )

      if (!service)
        throw new NotFoundException('商品附加服务')

      return service
    }
    catch (e) {
      throw new FailedException('获取商品附加服务详情', e.message, e.code)
    }
  }

  /**
   * 创建商品附加服务
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品附加服务失败
   * @throws {ExistsException} 商品附加服务已存在
   */
  async create(data: CreateProductAdditionServicePayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() })) {
        throw new ExistsException('商品附加服务')
      }

      const service = await this.repo.create(data)

      this.event.emit(
        new ProductAdditionServiceCreateEvent(service.id, service.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品附加服务', e.message, e.code)
    }
  }

  /**
   * 更新商品附加服务
   *
   * @param id 商品附加服务 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品附加服务失败
   * @throws {NotFoundException} 商品附加服务不存在
   * @throws {ExistsException} 商品附加服务已存在
   */
  async update(id: number, data: UpdateProductAdditionServicePayload) {
    try {
      const service = await this.repo.findOne({ id })

      if (!service)
        throw new NotFoundException('商品附加服务')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
      })) {
        throw new ExistsException('商品附加服务')
      }

      const updated = await this.repo.update(service, data)

      this.event.emit(
        new ProductAdditionServiceUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品附加服务', e.message, e.code)
    }
  }

  /**
   * 删除商品附加服务
   *
   * @param id 商品附加服务 ID
   * @throws {FailedException} 删除商品附加服务失败
   */
  async delete(id: number) {
    try {
      const service = await this.repo.findOne({ id }, ['id', 'name'])

      if (service) {
        await this.repo.destroy(service.id)

        this.event.emit(
          new ProductAdditionServiceDeleteEvent(service.id, service.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品附加服务', e.message)
    }
  }
}
