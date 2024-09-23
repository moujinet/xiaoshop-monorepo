import type {
  IApiPaginationData,
  ILogisticExpressDict,
  ILogisticExpressInfo,
  ILogisticExpressList,
} from '@xiaoshop/shared'

import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { toEventName } from '~/utils/transformers'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { LogisticExpress } from './entity'
import { ExpressPayload, GetExpressPagesRequest } from './dto'
import {
  LogisticExpressCreateEvent,
  LogisticExpressDeleteEvent,
  LogisticExpressUpdateEvent,
} from './events'

@Injectable()
export class LogisticExpressService {
  constructor(
    @InjectRepository(LogisticExpress)
    private readonly repository: Repository<LogisticExpress>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取物流公司列表
   *
   * @param query 查询条件
   * @returns 物流公司列表
   * @throws {FailedException} 获取物流公司列表失败
   */
  async findPages(
    query: GetExpressPagesRequest,
  ): Promise<IApiPaginationData<ILogisticExpressList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'desc', 'logo', 'url', 'sort', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取物流公司列表', e.message)
    }
  }

  /**
   * 获取物流公司字典列表
   *
   * @returns 物流公司字典列表
   * @throws {FailedException} 获取物流公司字典列表失败
   */
  async findDictList(): Promise<ILogisticExpressDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取物流公司字典列表', e.message)
    }
  }

  /**
   * 获取物流公司信息
   *
   * @param id 物流公司 ID
   * @returns 物流公司信息
   * @throws {NotFoundException} 物流公司不存在
   * @throws {FailedException} 获取物流公司信息失败
   */
  async findById(id: number): Promise<ILogisticExpressInfo> {
    try {
      const express = await this.repository.findOne({
        select: ['id', 'name', 'desc', 'logo', 'url', 'sort'],
        where: { id },
      })

      if (!express)
        throw new NotFoundException('物流公司')

      return express
    }
    catch (e) {
      throw new FailedException('获取物流公司信息', e.message, e.status)
    }
  }

  /**
   * 创建物流公司
   *
   * @param data 物流公司信息
   * @throws {FailedException} 创建物流公司失败
   * @throws {ExistsException} 物流公司已存在
   */
  async create(data: ExpressPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name.trim() })

      if (exists)
        throw new ExistsException('物流公司')

      const express = new LogisticExpress()

      express.name = data.name.trim()
      express.desc = data.desc || ''
      express.logo = data.logo || ''
      express.url = data.url || ''
      express.sort = data.sort || 1

      const created = await this.repository.save(express)

      this.event.emit(
        toEventName(LogisticExpressCreateEvent.name),
        new LogisticExpressCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建物流公司', e.message, e.status)
    }
  }

  /**
   * 更新物流公司
   *
   * @param id 物流公司 ID
   * @param data 物流公司信息
   * @throws {NotFoundException} 物流公司不存在
   * @throws {ExistsException} 物流公司已存在
   * @throws {FailedException} 更新物流公司失败
   */
  async update(id: number, data: ExpressPayload) {
    try {
      const express = await this.repository.findOne({
        select: ['id', 'name', 'desc', 'logo', 'url', 'sort'],
        where: { id },
      })

      if (!express)
        throw new NotFoundException('物流公司')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('物流公司')

      express.name = data.name.trim()

      if (express.logo !== undefined)
        express.logo = data.logo || ''

      if (express.desc !== undefined)
        express.desc = data.desc || ''

      if (express.url !== undefined)
        express.url = data.url || ''

      if (express.sort !== undefined)
        express.sort = data.sort || 1

      const updated = await this.repository.save(express)

      this.event.emit(
        toEventName(LogisticExpressUpdateEvent.name),
        new LogisticExpressUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新物流公司', e.message, e.status)
    }
  }

  /**
   * 删除物流公司
   *
   * @param id 物流公司 ID
   * @throws {FailedException} 删除物流公司失败
   */
  async delete(id: number) {
    try {
      const express = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (express) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(LogisticExpressDeleteEvent.name),
          new LogisticExpressDeleteEvent(express.id, express.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除物流公司', e.message)
    }
  }
}
