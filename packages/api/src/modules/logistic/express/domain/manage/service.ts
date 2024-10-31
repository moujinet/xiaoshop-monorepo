import type { ILogisticExpressRepository } from '@/logistic/express/model/interface'
import type { IApiPaginationData, ILogisticExpressDict, ILogisticExpressInfo, ILogisticExpressList } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { LogisticExpressRepo } from '@/logistic/express/model/provider'
import { GetLogisticExpressPagesRequest } from '@/logistic/express/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { CreateLogisticExpressPayload, UpdateLogisticExpressPayload } from '@/logistic/express/dto/payload'

import { LogisticExpressCreateEvent, LogisticExpressDeleteEvent, LogisticExpressUpdateEvent } from './events'

@Injectable()
export class LogisticExpressService {
  constructor(
    @LogisticExpressRepo()
    private readonly repo: ILogisticExpressRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取快递公司分页列表
   *
   * @param query 查询条件
   * @returns 快递公司分页列表
   * @throws {FailedException} 获取快递公司分页列表失败
   */
  async findPages(
    query: GetLogisticExpressPagesRequest,
  ): Promise<IApiPaginationData<ILogisticExpressList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize)
    }
    catch (e) {
      throw new FailedException('获取快递公司分页列表', e.message)
    }
  }

  /**
   * 获取快递公司字典列表
   *
   * @returns 快递公司字典列表
   * @throws {FailedException} 获取快递公司字典列表失败
   */
  async findDictList(): Promise<ILogisticExpressDict[]> {
    try {
      return await this.repo.find(null, ['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取快递公司字典列表', e.message)
    }
  }

  /**
   * 获取快递公司详情
   *
   * @param id 快递公司 ID
   * @returns 获取快递公司详情失败
   */
  async findById(id: number): Promise<ILogisticExpressInfo> {
    try {
      const express = await this.repo.findById(id)

      if (!express)
        throw new NotFoundException('快递公司')

      return express
    }
    catch (e) {
      throw new FailedException('获取快递公司详情', e.message, e.code)
    }
  }

  /**
   * 创建快递公司
   *
   * @param data 创建数据
   * @throws {FailedException} 创建快递公司失败
   * @throws {ExistsException} 快递公司已存在
   */
  async create(data: CreateLogisticExpressPayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('快递公司')

      const express = await this.repo.create(data)

      this.event.emit(
        new LogisticExpressCreateEvent(express.id, express.name),
      )
    }
    catch (e) {
      throw new FailedException('创建快递公司', e.message, e.code)
    }
  }

  /**
   * 更新快递公司
   *
   * @param id 快递公司 ID
   * @param data 更新数据
   * @throws {FailedException} 更新快递公司失败
   * @throws {NotFoundException} 快递公司不存在
   * @throws {ExistsException} 快递公司已存在
   */
  async update(id: number, data: UpdateLogisticExpressPayload) {
    try {
      const express = await this.repo.findById(id)

      if (!express)
        throw new NotFoundException('快递公司')

      if (await this.repo.exists({ id: Not(id), name: data.name.trim() }))
        throw new ExistsException('快递公司')

      const updated = await this.repo.update(express, data)

      this.event.emit(
        new LogisticExpressUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新快递公司', e.message, e.code)
    }
  }

  /**
   * 删除快递公司
   *
   * @param id 快递公司 ID
   * @throws {FailedException} 删除快递公司失败
   */
  async delete(id: number) {
    try {
      const express = await this.repo.findById(id, ['id', 'name'])

      if (express) {
        await this.repo.destroy(express.id)

        this.event.emit(
          new LogisticExpressDeleteEvent(express.id, express.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除快递公司', e.message)
    }
  }
}
