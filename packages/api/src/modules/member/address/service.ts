import type {
  IApiPaginationData,
  IMemberAddressListItem,
  IMemberAddressMemberListItem,
} from '@xiaoshop/shared'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { GetMemberAddressPagesByMemberRequest, GetMemberAddressPagesRequest } from './dto'
import { MemberAddress } from '@/member/address/entity'
import { FailedException } from '~/common/exceptions'

@Injectable()
export class MemberAddressService {
  constructor(
    @InjectRepository(MemberAddress)
    private readonly repository: Repository<MemberAddress>,
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
      const where: FindOptionsWhere<MemberAddress> = {}

      if (query.memberId)
        where.memberId = query.memberId

      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'member', 'name', 'mobile', 'location', 'address', 'postalCode', 'isDefault', 'updatedTime'],
        where,
        skip: pagesize * (page - 1),
        take: pagesize,
        relations: ['member'],
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
   * 获取指定会员收货地址分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberAddressMemberListItem>>
   * @throws {FailedException} 获取指定会员收货地址分页列表失败
   */
  async findMemberPages(
    query: GetMemberAddressPagesByMemberRequest,
  ): Promise<IApiPaginationData<IMemberAddressMemberListItem>> {
    try {
      const {
        page = 1,
        pagesize = 10,
        memberId,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'mobile', 'location', 'address', 'postalCode', 'isDefault', 'updatedTime'],
        where: {
          memberId,
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
      throw new FailedException('获取指定会员收货地址分页列表', e.message)
    }
  }
}
