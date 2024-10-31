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

import { LogisticAddressBuyerCreateEvent, LogisticAddressBuyerDeleteEvent, LogisticAddressBuyerUpdateEvent } from './events'

@Injectable()
export class LogisticAddressBuyerService {
  constructor(
    @LogisticAddressRepo()
    private readonly repo: ILogisticAddressRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取买家地址列表
   *
   * @param memberId 买家 ID
   * @param type 地址类型
   * @param isDefault 是否默认
   * @returns 买家地址列表
   * @throws {FailedException} 获取买家地址列表失败
   */
  async findList(
    memberId: number,
    type: LogisticAddressType,
    isDefault?: YesOrNo,
  ): Promise<ILogisticAddressList[]> {
    try {
      return await this.repo.find({
        owner: LogisticAddressOwner.BUYER,
        type,
        memberId,
        isDefault,
      })
    }
    catch (e) {
      throw new FailedException('获取买家地址列表', e.message)
    }
  }

  /**
   * 获取买家地址详情
   *
   * @param id 买家地址 ID
   * @param memberId 买家 ID
   * @returns 获取买家地址详情失败
   */
  async findById(
    id: number,
    memberId: number,
  ): Promise<ILogisticAddressInfo> {
    try {
      const address = await this.repo.findOne({
        id,
        memberId,
        owner: LogisticAddressOwner.BUYER,
      })

      if (!address)
        throw new NotFoundException('买家地址')

      return address
    }
    catch (e) {
      throw new FailedException('获取买家地址详情', e.message, e.code)
    }
  }

  /**
   * 创建买家地址
   *
   * @param memberId 买家 ID
   * @param data 创建数据
   * @throws {FailedException} 创建买家地址失败
   */
  async create(
    memberId: number,
    data: CreateLogisticAddressPayload,
  ) {
    try {
      const address = await this.repo.create({
        ...data,
        memberId,
        type: LogisticAddressType.RECEIVE,
        owner: LogisticAddressOwner.BUYER,
      })

      this.event.emit(
        new LogisticAddressBuyerCreateEvent(
          address.id,
          memberId,
          stringifyLocation(address.location) + address.address,
          address.type,
        ),
      )
    }
    catch (e) {
      throw new FailedException('创建买家地址', e.message, e.code)
    }
  }

  /**
   * 更新买家地址
   *
   * @param id 买家地址 ID
   * @param memberId 买家 ID
   * @param data 更新数据
   * @throws {FailedException} 更新买家地址失败
   * @throws {NotFoundException} 买家地址不存在
   */
  async update(
    id: number,
    memberId: number,
    data: UpdateLogisticAddressPayload,
  ) {
    try {
      const address = await this.repo.findOne({
        id,
        memberId,
        owner: LogisticAddressOwner.BUYER,
      })

      if (!address)
        throw new NotFoundException('买家地址')

      const updated = await this.repo.update(address, data)

      this.event.emit(
        new LogisticAddressBuyerUpdateEvent(
          updated.id,
          memberId,
          stringifyLocation(updated.location) + updated.address,
          updated.type,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新买家地址', e.message, e.code)
    }
  }

  /**
   * 设置默认买家地址
   *
   * @param id 买家地址 ID
   * @param memberId 买家 ID
   * @throws {FailedException} 更新买家地址失败
   * @throws {NotFoundException} 买家地址不存在
   */
  async setDefault(id: number, memberId: number) {
    try {
      const address = await this.repo.findOne({
        id,
        memberId,
        owner: LogisticAddressOwner.BUYER,
      })

      if (!address)
        throw new NotFoundException('买家地址')

      await this.repo.update(address, {
        isDefault: YesOrNo.YES,
      })
    }
    catch (e) {
      throw new FailedException('设置默认买家地址', e.message, e.code)
    }
  }

  /**
   * 删除买家地址
   *
   * @param id 买家地址 ID
   * @param memberId 买家 ID
   * @throws {FailedException} 删除买家地址失败
   */
  async delete(
    id: number,
    memberId: number,
  ) {
    try {
      const address = await this.repo.findOne({
        id,
        memberId,
        owner: LogisticAddressOwner.BUYER,
      }, ['id', 'type', 'address'])

      if (address) {
        await this.repo.destroy(address.id)

        this.event.emit(
          new LogisticAddressBuyerDeleteEvent(
            address.id,
            memberId,
            stringifyLocation(address.location) + address.address,
            address.type,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除买家地址', e.message)
    }
  }
}
