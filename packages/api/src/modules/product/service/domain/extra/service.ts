import type { IProductServiceExtraRepository } from '@/product/service/model/extra/interface'
import type {
  IApiPaginationData,
  IProductServiceExtraDict,
  IProductServiceExtraInfo,
  IProductServiceExtraList,
} from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { GetProductServicePagesRequest } from '@/product/service/dto/request'
import { ProductServiceExtraRepo } from '@/product/service/model/extra/provider'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateProductExtraServicePayload, UpdateProductExtraServicePayload } from '@/product/service/dto/payload'

import { ProductExtraServiceCreateEvent, ProductExtraServiceDeleteEvent, ProductExtraServiceUpdateEvent } from './events'

@Injectable()
export class ProductServiceExtraService {
  constructor(
    @ProductServiceExtraRepo()
    private readonly repo: IProductServiceExtraRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商品服务保障分页列表
   *
   * @param query 查询条件
   * @returns 商品服务保障分页列表
   * @throws {FailedException} 获取商品服务保障分页列表失败
   */
  async findPages(
    query: GetProductServicePagesRequest,
  ): Promise<IApiPaginationData<IProductServiceExtraList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(
        ['id', 'name', 'icon', 'desc', 'sort', 'updatedTime'],
        page,
        pagesize,
      )
    }
    catch (e) {
      throw new FailedException('获取商品服务保障分页列表', e.message)
    }
  }

  /**
   * 获取商品服务保障字典列表
   *
   * @returns 商品服务保障字典列表
   * @throws {FailedException} 获取商品服务保障字典列表失败
   */
  async findDictList(): Promise<IProductServiceExtraDict[]> {
    try {
      return await this.repo.find(['id', 'name', 'icon'])
    }
    catch (e) {
      throw new FailedException('获取商品服务保障字典列表', e.message)
    }
  }

  /**
   * 获取商品服务保障详情
   *
   * @param id 商品服务保障 ID
   * @returns 获取商品服务保障详情失败
   */
  async findById(id: number): Promise<IProductServiceExtraInfo> {
    try {
      const service = await this.repo.findOne({ id }, ['id', 'name', 'icon', 'desc', 'sort'])

      if (!service)
        throw new NotFoundException('商品服务保障')

      return service
    }
    catch (e) {
      throw new FailedException('获取商品服务保障详情', e.message, e.code)
    }
  }

  /**
   * 创建商品服务保障
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商品服务保障失败
   * @throws {ExistsException} 商品服务保障已存在
   */
  async create(data: CreateProductExtraServicePayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() })) {
        throw new ExistsException('商品服务保障')
      }

      const service = await this.repo.create(data)

      this.event.emit(
        new ProductExtraServiceCreateEvent(service.id, service.name),
      )
    }
    catch (e) {
      throw new FailedException('创建商品服务保障', e.message, e.code)
    }
  }

  /**
   * 更新商品服务保障
   *
   * @param id 商品服务保障 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商品服务保障失败
   * @throws {NotFoundException} 商品服务保障不存在
   * @throws {ExistsException} 商品服务保障已存在
   */
  async update(id: number, data: UpdateProductExtraServicePayload) {
    try {
      const service = await this.repo.findOne({ id })

      if (!service)
        throw new NotFoundException('商品服务保障')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
      })) {
        throw new ExistsException('商品服务保障')
      }

      const updated = await this.repo.update(service, data)

      this.event.emit(
        new ProductExtraServiceUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新商品服务保障', e.message, e.code)
    }
  }

  /**
   * 删除商品服务保障
   *
   * @param id 商品服务保障 ID
   * @throws {FailedException} 删除商品服务保障失败
   */
  async delete(id: number) {
    try {
      const service = await this.repo.findOne({ id }, ['id', 'name'])

      if (service) {
        await this.repo.destroy(service.id)

        this.event.emit(
          new ProductExtraServiceDeleteEvent(service.id, service.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商品服务保障', e.message)
    }
  }
}
