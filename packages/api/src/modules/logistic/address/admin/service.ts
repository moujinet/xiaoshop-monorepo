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
import { LogisticAddressEntity } from '@/logistic/address/entity'
import { FailedException, NotFoundException } from '~/common/exceptions'

import { AddressPayload } from './dto/payload'
import { GetAddressListRequest, GetAddressPagesRequest } from './dto/request'
import {
  LogisticAdminAddressCreateEvent,
  LogisticAdminAddressDefaultUpdateEvent,
  LogisticAdminAddressDeleteEvent,
  LogisticAdminAddressUpdateEvent,
} from './events'

@Injectable()
export class LogisticAddressAdminService {
  constructor(
    @InjectRepository(LogisticAddressEntity)
    private readonly repo: Repository<LogisticAddressEntity>,

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
      const where: FindOptionsWhere<LogisticAddressEntity> = {
        owner: query.memberId ? LogisticAddressOwner.BUYER : LogisticAddressOwner.SELLER,
        type: query.type || LogisticAddressType.RECEIVE,
      }

      if (query.memberId)
        where.memberId = query.memberId

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repo.findAndCount({
        select: ['id', 'isDefault', 'name', 'mobile', 'location', 'address', 'postalCode', 'updatedTime'],
        where,
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          isDefault: 'DESC',
          updatedTime: 'DESC',
        },
      })

      return { list, total, page, pagesize }
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
      const where: FindOptionsWhere<LogisticAddressEntity> = {
        owner: query.memberId ? LogisticAddressOwner.BUYER : LogisticAddressOwner.SELLER,
        type: query.type || LogisticAddressType.DELIVERY,
      }

      if (query.memberId)
        where.memberId = query.memberId

      return await this.repo.find({
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
      const address = await this.repo.findOne({
        select: ['id', 'isDefault', 'name', 'mobile', 'landline', 'location', 'address', 'postalCode'],
        where: {
          id,
          owner: LogisticAddressOwner.SELLER,
        },
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
   * 设置默认地址
   *
   * @param id 地址信息 ID
   * @throws {FailedException} 设置默认地址失败
   * @throws {NotFoundException} 地址信息不存在
   */
  async setDefault(id: number) {
    try {
      const address = await this.repo.findOne({
        select: ['id', 'isDefault', 'type', 'address'],
        where: {
          id,
          owner: LogisticAddressOwner.SELLER,
        },
      })

      if (!address)
        throw new NotFoundException('地址信息')

      if (address.isDefault !== YesOrNo.YES)
        await this.repo.update({ id }, { isDefault: YesOrNo.YES })

      this.event.emit(
        toEventName(LogisticAdminAddressDefaultUpdateEvent.name),
        new LogisticAdminAddressDefaultUpdateEvent(
          address.id,
          address.address,
          address.type,
        ),
      )

      const where: FindOptionsWhere<LogisticAddressEntity> = {
        id: Not(address.id),
        type: address.type,
      }

      where.owner = LogisticAddressOwner.SELLER

      await this.repo.update(where, { isDefault: YesOrNo.NO })
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
      const address = new LogisticAddressEntity()

      address.name = data.name
      address.mobile = data.mobile
      address.landline = data.landline || ''
      address.location = data.location
      address.address = data.address
      address.postalCode = data.postalCode || ''
      address.isDefault = data.isDefault || 0
      address.owner = LogisticAddressOwner.SELLER
      address.type = data.type || LogisticAddressType.DELIVERY

      const created = await this.repo.save(address)

      this.event.emit(
        toEventName(LogisticAdminAddressCreateEvent.name),
        new LogisticAdminAddressCreateEvent(
          created.id,
          created.address,
          created.type,
        ),
      )

      if (created.isDefault === YesOrNo.YES)
        await this.setDefault(created.id)
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
      const address = await this.repo.findOne({
        select: ['id', 'type', 'address'],
        where: {
          id,
          owner: LogisticAddressOwner.SELLER,
        },
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

      await this.repo.save(address)

      this.event.emit(
        toEventName(LogisticAdminAddressUpdateEvent.name),
        new LogisticAdminAddressUpdateEvent(
          address.id,
          address.address,
          address.type,
        ),
      )

      if (address.isDefault === YesOrNo.YES)
        await this.setDefault(address.id)
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
      const address = await this.repo.findOne({
        select: ['id', 'type', 'address'],
        where: {
          id,
          owner: LogisticAddressOwner.SELLER,
        },
      })

      if (address) {
        await this.repo.delete(id)

        this.event.emit(
          toEventName(LogisticAdminAddressDeleteEvent.name),
          new LogisticAdminAddressDeleteEvent(
            address.id,
            address.address,
            address.type,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除地址信息', e.message)
    }
  }
}
