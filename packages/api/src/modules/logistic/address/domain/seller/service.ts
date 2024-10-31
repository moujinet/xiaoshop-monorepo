import type { ILogisticAddressRepository } from '@/logistic/address/model/interface'

import { Inject, Injectable } from '@nestjs/common'
import {
  type ILogisticAddressInfo,
  type ILogisticAddressList,
  LogisticAddressOwner,
  LogisticAddressType,
  stringifyLocation,
  YesOrNo,
} from '@xiaoshop/shared'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { LogisticAddressRepo } from '@/logistic/address/model/provider'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { CreateLogisticAddressPayload, UpdateLogisticAddressPayload } from '@/logistic/address/dto/payload'

import { LogisticAddressSellerCreateEvent, LogisticAddressSellerDeleteEvent, LogisticAddressSellerUpdateEvent } from './events'

@Injectable()
export class LogisticAddressSellerService {
  constructor(
    @LogisticAddressRepo()
    private readonly repo: ILogisticAddressRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商家地址列表
   *
   * @param type 地址类型
   * @param isDefault 是否默认
   * @returns 商家地址列表
   * @throws {FailedException} 获取商家地址列表失败
   */
  async findList(type: LogisticAddressType, isDefault?: YesOrNo): Promise<ILogisticAddressList[]> {
    try {
      return await this.repo.find({
        owner: LogisticAddressOwner.SELLER,
        type,
        isDefault,
      })
    }
    catch (e) {
      throw new FailedException('获取商家地址列表', e.message)
    }
  }

  /**
   * 获取商家地址详情
   *
   * @param id 商家地址 ID
   * @returns 获取商家地址详情失败
   */
  async findById(id: number): Promise<ILogisticAddressInfo> {
    try {
      const address = await this.repo.findOne({
        id,
        owner: LogisticAddressOwner.SELLER,
      })

      if (!address)
        throw new NotFoundException('商家地址')

      return address
    }
    catch (e) {
      throw new FailedException('获取商家地址详情', e.message, e.code)
    }
  }

  /**
   * 创建商家地址
   *
   * @param data 创建数据
   * @throws {FailedException} 创建商家地址失败
   */
  async create(data: CreateLogisticAddressPayload) {
    try {
      const address = await this.repo.create({
        ...data,
        memberId: 0,
        type: LogisticAddressType.DELIVERY,
        owner: LogisticAddressOwner.SELLER,
      })

      this.event.emit(
        new LogisticAddressSellerCreateEvent(
          address.id,
          stringifyLocation(address.location) + address.address,
          address.type,
        ),
      )
    }
    catch (e) {
      throw new FailedException('创建商家地址', e.message, e.code)
    }
  }

  /**
   * 更新商家地址
   *
   * @param id 商家地址 ID
   * @param data 更新数据
   * @throws {FailedException} 更新商家地址失败
   * @throws {NotFoundException} 商家地址不存在
   */
  async update(id: number, data: UpdateLogisticAddressPayload) {
    try {
      const address = await this.repo.findOne({
        id,
        owner: LogisticAddressOwner.SELLER,
      }, [
        'id',
        'type',
        'address',
        'name',
        'mobile',
        'landline',
        'location',
        'postalCode',
        'isDefault',
      ])

      if (!address)
        throw new NotFoundException('商家地址')

      const updated = await this.repo.update(address, data)

      this.event.emit(
        new LogisticAddressSellerUpdateEvent(
          address.id,
          stringifyLocation(updated.location) + updated.address,
          address.type,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新商家地址', e.message, e.code)
    }
  }

  /**
   * 设置默认商家地址
   *
   * @param id 商家地址 ID
   * @throws {FailedException} 更新商家地址失败
   * @throws {NotFoundException} 商家地址不存在
   */
  async setDefault(id: number) {
    try {
      const address = await this.repo.findOne({
        id,
        owner: LogisticAddressOwner.SELLER,
      })

      if (!address)
        throw new NotFoundException('商家地址')

      await this.repo.update(address, {
        isDefault: YesOrNo.YES,
      })
    }
    catch (e) {
      throw new FailedException('设置默认商家地址', e.message, e.code)
    }
  }

  /**
   * 删除商家地址
   *
   * @param id 商家地址 ID
   * @throws {FailedException} 删除商家地址失败
   */
  async delete(id: number) {
    try {
      const address = await this.repo.findOne({
        id,
        owner: LogisticAddressOwner.SELLER,
      }, ['id', 'type', 'address'])

      if (address) {
        await this.repo.destroy(address.id)

        this.event.emit(
          new LogisticAddressSellerDeleteEvent(
            address.id,
            stringifyLocation(address.location) + address.address,
            address.type,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除商家地址', e.message)
    }
  }
}
