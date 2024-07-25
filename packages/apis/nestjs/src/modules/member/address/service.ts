import { EnabledEnum, type IMemberAddress } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberAddress } from '@/member/address/entity'
import { MemberAddressPayload } from '@/member/address/dto'
import { FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberAddressService {
  constructor(
    @InjectRepository(MemberAddress)
    private readonly repository: Repository<MemberAddress>,
  ) {}

  /**
   * 获取会员地址列表
   *
   * @param {number} memberId
   * @throws FailedException
   * @returns Promise<IMemberAddress[]>
   * @see {@link IMemberAddress}
   */
  async findList(memberId: number): Promise<IMemberAddress[]> {
    try {
      return await this.repository.find({
        where: {
          memberId,
        },
      }).then(
        list => list.sort(a => a.isDefault === EnabledEnum.YES ? -1 : 1),
      )
    }
    catch (e) {
      throw new FailedException('获取会员地址列表', e.message)
    }
  }

  /**
   * 获取会员默认地址
   *
   * @param {number} memberId
   * @returns {Promise<IMemberAddress>} Promise<IMemberAddress>
   * @see {@link IMemberAddress}
   */
  async findDefault(memberId: number): Promise<IMemberAddress> {
    try {
      return await this.repository.findOne({
        where: {
          memberId,
          isDefault: EnabledEnum.YES,
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员默认地址', e.message)
    }
  }

  /**
   * 获取会员地址详情
   *
   * @param {number} id
   * @param {number} memberId
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IMemberAddress>
   * @see {@link IMemberAddress}
   */
  async findDetail(id: number, memberId: number): Promise<IMemberAddress> {
    try {
      const detail = await this.repository.findOne({
        where: {
          id,
          memberId,
        },
      })

      if (!detail)
        throw new NotFoundException('会员地址')

      return detail
    }
    catch (e) {
      throw new FailedException('获取会员地址详情', e.message, e.status)
    }
  }

  /**
   * 创建会员地址
   *
   * @param data MemberAddressPayload
   * @throws FailedException
   * @see {@link MemberAddressPayload}
   */
  async create(data: MemberAddressPayload) {
    try {
      const address = new MemberAddress()

      address.memberId = data.memberId
      address.contractName = data.contractName
      address.mobile = data.mobile
      address.location = data.location
      address.address = data.address
      address.postCode = data.postCode
      address.isDefault = data.isDefault

      const { id } = await this.repository.save(address)

      if (address.isDefault === EnabledEnum.YES) {
        await this.repository.update({
          id: Not(id),
          memberId: data.memberId,
        }, {
          isDefault: EnabledEnum.NO,
        })
      }
    }
    catch (e) {
      throw new FailedException('创建会员地址', e.message, e.status)
    }
  }

  /**
   * 更新会员地址
   *
   * @param id number
   * @param data MemberAddressPayload
   * @throws NotFoundException
   * @throws FailedException
   * @see {@link MemberAddressPayload}
   */
  async update(id: number, data: MemberAddressPayload) {
    try {
      const founded = await this.repository.exists({
        where: {
          id,
          memberId: data.memberId,
        },
      })

      if (!founded)
        throw new NotFoundException('会员地址')

      const address = new MemberAddress()

      address.id = id
      address.memberId = data.memberId
      address.contractName = data.contractName
      address.mobile = data.mobile
      address.location = data.location
      address.address = data.address
      address.postCode = data.postCode
      address.isDefault = data.isDefault

      await this.repository.save(address)

      if (address.isDefault === EnabledEnum.YES) {
        await this.repository.update({
          id: Not(id),
          memberId: data.memberId,
        }, {
          isDefault: EnabledEnum.NO,
        })
      }
    }
    catch (e) {
      throw new FailedException('更新会员地址', e.message, e.status)
    }
  }

  /**
   * 设置默认地址
   *
   * @param {number} id
   * @param {number} memberId
   * @throws {NotFoundException}
   * @throws {FailedException}
   */
  async setDefault(id: number, memberId: number) {
    try {
      const founded = await this.repository.exists({
        where: {
          id,
          memberId,
        },
      })

      if (!founded)
        throw new NotFoundException('会员地址')

      await this.repository.update({ id }, { isDefault: EnabledEnum.YES })
      await this.repository.update({ id: Not(id), memberId }, { isDefault: EnabledEnum.NO })
    }
    catch (e) {
      throw new FailedException('设置默认地址', e.message, e.status)
    }
  }

  /**
   * 删除会员地址
   *
   * @param {number} id
   * @param {number} memberId
   * @throws {NotFoundException}
   * @throws {FailedException}
   */
  async delete(id: number, memberId: number) {
    try {
      const founded = await this.repository.exists({
        where: {
          id,
          memberId,
        },
      })

      if (!founded)
        throw new NotFoundException('会员地址')

      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除会员地址', e.message, e.status)
    }
  }
}
