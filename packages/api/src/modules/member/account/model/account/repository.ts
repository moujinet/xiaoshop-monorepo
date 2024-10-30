import type {
  IMemberAccountRepository,
  IMemberAccountSelect,
  IMemberAccountWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MemberAccountEntity } from './entity'

const defaultSelect: IMemberAccountSelect = ['id', 'key', 'value']

@Injectable()
export class MemberAccountRepository implements IMemberAccountRepository {
  constructor(
    @InjectRepository(MemberAccountEntity)
    private readonly repo: Repository<MemberAccountEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async find(
    where: IMemberAccountWhere,
    select: IMemberAccountSelect = defaultSelect,
  ) {
    return await this.repo.find({
      select,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IMemberAccountWhere,
    select: IMemberAccountSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberAccountWhere) {
    return await this.repo.exists({
      where,
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<MemberAccountEntity>) {
    return await this.repo.save(data)
  }

  /**
   * @inheritdoc
   */
  async update(
    account: MemberAccountEntity,
    data: Partial<MemberAccountEntity>,
  ) {
    if (data.memberId !== account.memberId)
      return account

    if (data.key === account.key && data.value !== account.value)
      account.value = data.value
    else
      return account

    return await this.repo.save(account)
  }
}
