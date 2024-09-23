import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Not, Repository } from 'typeorm'
import {
  type IApiPaginationData,
  type ILogisticAddressInfo,
  type ILogisticAddressList,
  LogisticAddressOwner,
  LogisticAddressType,
  YesOrNo,
} from '@xiaoshop/shared'

import { toEventName } from '~/utils/transformers'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { FailedException, NotFoundException } from '~/common/exceptions'

import { LogisticAddress } from './entity'
import {
  AddressPayload,
  GetAddressListRequest,
  GetAddressPagesRequest,
} from './dto'
import {
  LogisticAddressCreateEvent,
  LogisticAddressDeleteEvent,
  LogisticAddressUpdateEvent,
} from './events'

@Injectable()
export class LogisticAddressService {
  constructor(
    @InjectRepository(LogisticAddress)
    private readonly repository: Repository<LogisticAddress>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取地址分页列表
   *
   * @param query 查询条件
   * @returns 地址信息列表
   * @throws {FailedException} 获取地址信息列表失败
   */
  async findPages(
    query: GetAddressPagesRequest,
  ): Promise<IApiPaginationData<ILogisticAddressList>> {
    try {
      const where: FindOptionsWhere<LogisticAddress> = {
        owner: query.memberId ? LogisticAddressOwner.BUYER : LogisticAddressOwner.SELLER,
        type: query.type || LogisticAddressType.RECEIVE,
      }

      if (query.memberId)
        where.memberId = query.memberId

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'isDefault', 'name', 'mobile', 'location', 'address', 'postalCode', 'updatedTime'],
        where,
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          isDefault: 'DESC',
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取地址信息列表', e.message)
    }
  }

  /**
   * 获取地址列表
   *
   * @param query 查询条件
   * @returns 地址信息列表
   * @throws {FailedException} 获取地址信息列表失败
   */
  async findList(
    query: GetAddressListRequest,
  ): Promise<ILogisticAddressList[]> {
    try {
      const where: FindOptionsWhere<LogisticAddress> = {
        owner: query.memberId ? LogisticAddressOwner.BUYER : LogisticAddressOwner.SELLER,
        type: query.type || LogisticAddressType.RECEIVE,
      }

      if (query.memberId)
        where.memberId = query.memberId

      return await this.repository.find({
        select: ['id', 'isDefault', 'name', 'mobile', 'location', 'address', 'postalCode', 'updatedTime'],
        where,
        order: {
          isDefault: 'DESC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取地址信息列表', e.message)
    }
  }

  /**
   * 获取地址信息
   *
   * @param id 地址信息 ID
   * @returns 地址信息
   * @throws {FailedException} 获取地址信息失败
   * @throws {NotFoundException} 地址信息不存在
   */
  async findById(id: number): Promise<ILogisticAddressInfo> {
    try {
      const address = await this.repository.findOne({
        select: ['id', 'isDefault', 'name', 'mobile', 'landline', 'location', 'address', 'postalCode'],
        where: { id },
      })

      if (!address)
        throw new NotFoundException('地址信息')

      return address
    }
    catch (e) {
      throw new FailedException('获取地址信息', e.message, e.status)
    }
  }

  /**
   * 获取默认地址信息
   *
   * @param query 查询条件
   * @returns 默认地址信息
   * @throws {FailedException} 获取默认地址信息失败
   */
  async findDefaultAddress(
    query: GetAddressListRequest,
  ): Promise<ILogisticAddressInfo> {
    try {
      const where: FindOptionsWhere<LogisticAddress> = {
        owner: query.memberId ? LogisticAddressOwner.BUYER : LogisticAddressOwner.SELLER,
        type: query.type || LogisticAddressType.RECEIVE,
        isDefault: YesOrNo.YES,
      }

      if (query.memberId)
        where.memberId = query.memberId

      return await this.repository.findOne({
        select: ['id', 'isDefault', 'name', 'mobile', 'landline', 'location', 'address', 'postalCode'],
        where,
      })
    }
    catch (e) {
      throw new FailedException('获取默认地址信息', e.message)
    }
  }

  /**
   * 设置默认地址
   *
   * @param id 地址信息 ID
   * @throws {FailedException} 设置默认地址失败
   * @throws {NotFoundException} 地址信息不存在
   */
  async setDefault(id: number) {
    try {
      const address = await this.repository.findOne({
        select: ['id', 'isDefault', 'type', 'memberId'],
        where: { id },
      })

      if (!address)
        throw new NotFoundException('地址信息')

      if (address.isDefault !== YesOrNo.YES)
        await this.repository.update({ id }, { isDefault: YesOrNo.YES })

      const where: FindOptionsWhere<LogisticAddress> = {
        id: Not(address.id),
        type: address.type,
      }

      if (address.memberId)
        where.memberId = address.memberId
      else
        where.owner = LogisticAddressOwner.SELLER

      await this.repository.update(where, { isDefault: YesOrNo.NO })
    }
    catch (e) {
      throw new FailedException('设置默认地址', e.message, e.status)
    }
  }

  /**
   * 创建地址信息
   *
   * @param data 地址信息
   * @throws {FailedException} 创建地址信息失败
   */
  async create(data: AddressPayload) {
    try {
      const address = new LogisticAddress()

      address.name = data.name
      address.mobile = data.mobile
      address.landline = data.landline || ''
      address.location = data.location
      address.address = data.address
      address.postalCode = data.postalCode || ''
      address.isDefault = data.isDefault || 0
      address.memberId = data.memberId || 0
      address.owner = data.memberId ? LogisticAddressOwner.BUYER : LogisticAddressOwner.SELLER
      address.type = data.type || LogisticAddressType.RECEIVE

      const created = await this.repository.save(address)

      this.event.emit(
        toEventName(LogisticAddressCreateEvent.name),
        new LogisticAddressCreateEvent(created.id, created.address),
      )
    }
    catch (e) {
      throw new FailedException('创建地址信息', e.message)
    }
  }

  /**
   * 更新地址信息
   *
   * @param id 地址信息 ID
   * @param data 地址信息
   * @throws {FailedException} 更新地址信息失败
   * @throws {NotFoundException} 地址信息不存在
   */
  async update(id: number, data: AddressPayload) {
    try {
      const address = await this.repository.findOne({
        select: ['id', 'address'],
        where: { id },
      })

      if (!address)
        throw new NotFoundException('地址信息')

      address.name = data.name
      address.mobile = data.mobile
      address.location = data.location
      address.address = data.address

      if (data.landline !== undefined)
        address.landline = data.landline

      if (data.postalCode !== undefined)
        address.postalCode = data.postalCode

      if (data.isDefault !== undefined)
        address.isDefault = data.isDefault

      const updated = await this.repository.save(address)

      this.event.emit(
        toEventName(LogisticAddressUpdateEvent.name),
        new LogisticAddressUpdateEvent(updated.id, updated.address),
      )
    }
    catch (e) {
      throw new FailedException('更新地址信息', e.message, e.status)
    }
  }

  /**
   * 删除地址信息
   *
   * @param id 地址信息 ID
   * @throws {FailedException} 删除地址信息失败
   */
  async delete(id: number) {
    try {
      const address = await this.repository.findOne({
        select: ['id', 'address'],
        where: { id },
      })

      if (address) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(LogisticAddressDeleteEvent.name),
          new LogisticAddressDeleteEvent(address.id, address.address),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除地址信息', e.message)
    }
  }
}
