import type {
  IMemberAccount,
  IMemberAccountKey,
  IMemberAccountKeyValue,
} from '@xiaoshop/schema'
import { In, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberAccount } from '@/member/account/entity'
import { FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class MemberAccountService {
  constructor(
    @InjectRepository(MemberAccount)
    private readonly repository: Repository<MemberAccount>,
  ) {}

  /**
   * 获取会员账户
   *
   * @param memberId 会员 ID
   * @returns Promise<IMemberAccountKeyValue>
   * @throws {NotFoundException} 未找到会员账户
   * @throws {FailedException} 获取会员账户失败
   */
  async findMemberAccount(memberId: number): Promise<IMemberAccountKeyValue> {
    try {
      const accounts = await this.repository.find({
        where: {
          member: { id: memberId },
        },
      })

      if (!accounts.length)
        throw new NotFoundException('未找到会员账户')

      return await this.transformToKV(accounts)
    }
    catch (e) {
      throw new FailedException('获取会员账户', e.message, e.status)
    }
  }

  /**
   * 更新会员账户
   *
   * @param memberId 会员 ID
   * @param key 更新账户键名
   * @param value 更新账户值
   * @throws {FailedException} 更新会员账户失败
   */
  async updateMemberAccount(
    memberId: number,
    key: IMemberAccountKey,
    value: number,
  ) {
    try {
      await this.repository.update({
        member: { id: memberId },
        key,
      }, { value })
    }
    catch (e) {
      throw new FailedException('更新会员账户', e.message, e.status)
    }
  }

  /**
   * 批量更新会员账户
   *
   * @param memberIds 会员 ID 数组
   * @param key 更新账户键名
   * @param value 更新账户值
   * @throws {FailedException} 批量更新会员账户失败
   */
  async batchUpdateMemberAccount(
    memberIds: number[],
    key: IMemberAccountKey,
    value: number,
  ) {
    try {
      await this.repository.update({
        member: {
          id: In(memberIds),
        },
        key,
      }, {
        value,
      })
    }
    catch (e) {
      throw new FailedException('批量更新会员账户', e.message, e.status)
    }
  }

  /**
   * 删除会员账户
   *
   * @param memberId 会员 ID
   * @throws {FailedException} 删除会员账户失败
   */
  async deleteMemberAccount(memberId: number) {
    try {
      const founded = await this.repository.existsBy({ member: { id: memberId } })

      if (founded)
        await this.repository.delete({ member: { id: memberId } })
    }
    catch (e) {
      throw new FailedException('删除会员账户', e.message)
    }
  }

  /**
   * 转换会员账户列表为键值对
   *
   * @param accounts 会员账户列表
   * @returns IMemberAccountKeyValue
   */
  transformToKV(accounts: IMemberAccount[]): IMemberAccountKeyValue {
    return accounts.reduce((record, account) => {
      record[account.key] = account.value
      return record
    }, {} as IMemberAccountKeyValue)
  }
}
