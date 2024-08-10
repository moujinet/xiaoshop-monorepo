import {
  Enabled,
  type IApiPaginationData,
  type IMemberAddress,
  type IMemberAddressInfo,
  type IMemberAddressListItem,
} from '@xiaoshop/schema'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Member } from '@/member/profile/entity'
import { MemberAddress } from '@/member/address/entity'
import { GetMemberAddressListRequest, GetMemberAddressPagesRequest, MemberAddressPayload } from '@/member/address/dto'
import { FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberAddressService {
  constructor(
    @InjectRepository(MemberAddress)
    private readonly repository: Repository<MemberAddress>,

    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  /**
   * 获取会员收货地址分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberAddressListItem>>
   * @throws {FailedException} 获取会员收货地址分页列表失败
   */
  async findPages(
    query: GetMemberAddressPagesRequest,
  ): Promise<IApiPaginationData<IMemberAddressListItem>> {
    try {
      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          contractName: true,
          mobile: true,
          location: true,
          address: true,
          isDefault: true,
          updatedTime: true,
        },
        where: {
          memberId: query.memberId,
        },
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          isDefault: 'DESC',
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员收货地址分页列表', e.message)
    }
  }

  /**
   * 获取会员收货地址字典列表
   *
   * @param query 查询条件
   * @returns Promise<IMemberAddressInfo[]>
   * @throws {FailedException} 获取会员收货地址字典失败
   */
  async findList(query: GetMemberAddressListRequest): Promise<IMemberAddressInfo[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          contractName: true,
          mobile: true,
          location: true,
          address: true,
        },
        where: {
          memberId: query.memberId,
        },
        order: {
          isDefault: 'DESC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取会员收货地址字典', e.message)
    }
  }

  /**
   * 获取会员收货地址详情
   *
   * @param id 会员收货地址 ID
   * @returns Promise<IMemberAddress>
   * @throws {NotFoundException} 未找到会员收货地址
   * @throws {FailedException} 获取会员收货地址详情失败
   */
  async findDetail(id: number): Promise<IMemberAddress> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员收货地址')

      return await this.repository.findOneBy({ id })
    }
    catch (e) {
      throw new FailedException('获取会员收货地址详情', e.message, e.status)
    }
  }

  /**
   * 创建会员收货地址
   *
   * @param data 会员收货地址
   * @throws {NotFoundException} 会员不存在
   * @throws {FailedException} 创建会员收货地址失败
   */
  async create(data: MemberAddressPayload) {
    try {
      const member = await this.memberRepo.findOneBy({ id: data.memberId })

      if (!member)
        throw new NotFoundException('会员不存在')

      const address = new MemberAddress()

      address.contractName = data.contractName
      address.mobile = data.mobile
      address.location = data.location
      address.address = data.address
      address.postCode = data.postCode || ''
      address.isDefault = data.isDefault || Enabled.NO
      address.member = member

      await this.repository.save(address)
    }
    catch (e) {
      throw new FailedException('创建会员收货地址', e.message, e.status)
    }
  }

  /**
   * 更新会员收货地址
   *
   * @param id 会员收货地址 ID
   * @param data 会员收货地址
   * @throws {NotFoundException} 未找到会员收货地址
   * @throws {NotFoundException} 会员不存在
   * @throws {FailedException} 更新会员收货地址失败
   */
  async update(id: number, data: MemberAddressPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员收货地址')

      const member = await this.memberRepo.findOneBy({ id: data.memberId })

      if (!member)
        throw new NotFoundException('会员不存在')

      const address = new MemberAddress()

      address.id = id
      address.contractName = data.contractName
      address.mobile = data.mobile
      address.location = data.location
      address.address = data.address
      address.postCode = data.postCode || ''
      address.isDefault = data.isDefault || Enabled.NO
      address.member = member

      await this.repository.save(address)
    }
    catch (e) {
      throw new FailedException('更新会员收货地址', e.message, e.status)
    }
  }

  /**
   * 获取默认会员收货地址
   *
   * @param memberId 会员 ID
   * @returns Promise<IMemberAddress>
   * @throws {NotFoundException} 会员不存在
   * @throws {FailedException} 获取默认收货地址失败
   */
  async findDefaultAddress(memberId: number): Promise<IMemberAddress> {
    try {
      const member = await this.memberRepo.existsBy({ id: memberId })

      if (!member)
        throw new NotFoundException('会员不存在')

      const founded = await this.repository.findOne({
        where: {
          memberId,
          isDefault: Enabled.YES,
        },
      })

      if (founded)
        return founded

      return await this.repository.findOne({
        where: {
          memberId,
        },
      })
    }
    catch (e) {
      throw new FailedException('获取默认收货地址', e.message, e.status)
    }
  }

  /**
   * 设置默认会员收货地址
   *
   * @param memberId 会员 ID
   * @param id 会员收货地址 ID
   * @throws {NotFoundException} 会员不存在
   * @throws {NotFoundException} 未找到会员收货地址
   * @throws {FailedException} 设置默认收货地址失败
   */
  async setDefault(memberId: number, id: number) {
    try {
      const member = await this.memberRepo.existsBy({ id: memberId })

      if (!member)
        throw new NotFoundException('会员不存在')

      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员收货地址')

      await this.repository.update({ memberId }, { isDefault: Enabled.NO })
      await this.repository.update({ id }, { isDefault: Enabled.YES })
    }
    catch (e) {
      throw new FailedException('设置默认收货地址', e.message, e.status)
    }
  }

  /**
   * 删除会员收货地址
   *
   * @param id 会员收货地址 ID
   * @throws {FailedException} 删除会员收货地址失败
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (founded)
        await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除会员收货地址', e.message, e.status)
    }
  }
}
