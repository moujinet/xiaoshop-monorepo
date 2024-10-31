import type {
  ILogisticAddressRepository,
  ILogisticAddressSelect,
  ILogisticAddressWhere,
} from './interface'

import { Injectable } from '@nestjs/common'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { LogisticAddressOwner, LogisticAddressType, YesOrNo } from '@xiaoshop/shared'

import { LogisticAddressEntity } from './entity'

const defaultSelect: ILogisticAddressSelect = [
  'id',
  'isDefault',
  'name',
  'mobile',
  'landline',
  'location',
  'address',
  'postalCode',
  'updatedTime',
]

@Injectable()
export class LogisticAddressRepository implements ILogisticAddressRepository {
  constructor(
    @InjectRepository(LogisticAddressEntity)
    private readonly repo: Repository<LogisticAddressEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async find(
    where: ILogisticAddressWhere,
    select: ILogisticAddressSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
      order: {
        isDefault: 'DESC',
        updatedTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: ILogisticAddressWhere,
    select: ILogisticAddressSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async findById(
    id: number,
    select: ILogisticAddressSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where: { id },
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: ILogisticAddressWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<LogisticAddressEntity>) {
    const address = this.newEntity(data)

    address.owner = data.owner || LogisticAddressOwner.BUYER
    address.type = data.type || LogisticAddressType.RECEIVE
    address.memberId = data.memberId || 0
    address.isDefault = data.isDefault || YesOrNo.NO
    address.name = data.name ? data.name.trim() : ''
    address.mobile = data.mobile ? data.mobile.trim() : ''
    address.landline = data.landline ? data.landline.trim() : ''
    address.address = data.address ? data.address.trim() : ''
    address.postalCode = data.postalCode ? data.postalCode.trim() : ''
    address.location = data.location || []

    if (data.isDefault === YesOrNo.YES)
      await this.resetDefault(address)

    return await this.repo.save(address)
  }

  /**
   * @inheritdoc
   */
  async update(
    address: LogisticAddressEntity,
    data: Partial<LogisticAddressEntity>,
  ) {
    if (data.name && data.name !== address.name)
      address.name = data.name.trim()

    if (data.mobile && data.mobile !== address.mobile)
      address.mobile = data.mobile.trim()

    if (data.landline && data.landline !== address.landline)
      address.landline = data.landline.trim()

    if (data.address && data.address !== address.address)
      address.address = data.address.trim()

    if (data.postalCode && data.postalCode !== address.postalCode)
      address.postalCode = data.postalCode.trim()

    if (data.location && data.location !== address.location)
      address.location = data.location

    if (data.isDefault && data.isDefault !== address.isDefault) {
      address.isDefault = data.isDefault

      if (address.isDefault === YesOrNo.YES)
        await this.resetDefault(address)
    }

    return await this.repo.save(address)
  }

  /**
   * @inheritdoc
   */
  async destroy(id: number) {
    await this.repo.delete(id)
  }

  /**
   * @inheritdoc
   */
  newEntity(entity: DeepPartial<LogisticAddressEntity>): LogisticAddressEntity {
    return this.repo.create(entity)
  }

  /**
   * 将默认地址设置为非默认
   *
   * @param address 收货地址实例
   */
  private async resetDefault(address: LogisticAddressEntity) {
    if (address.isDefault === YesOrNo.YES) {
      await this.repo.update({
        owner: address.owner,
        type: address.type,
        memberId: address.owner === LogisticAddressOwner.BUYER
          ? address.memberId
          : 0,
      }, {
        isDefault: YesOrNo.NO,
      })
    }
  }
}
