import type { FindManyOptions } from 'typeorm'

import { MemberAccountEntity } from './entity'

export type IMemberAccountSelect = FindManyOptions<MemberAccountEntity>['select']
export type IMemberAccountWhere = FindManyOptions<MemberAccountEntity>['where']

export interface IMemberAccountRepository<T = MemberAccountEntity> {
  /**
   * 查询会员账户列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 会员账户列表
   */
  find: (where: IMemberAccountWhere, select?: IMemberAccountSelect) => Promise<T[]>

  /**
   * 查询会员账户
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 会员账户
   */
  findOne: (where: IMemberAccountWhere, select?: IMemberAccountSelect) => Promise<T>

  /**
   * 判断会员账户是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberAccountWhere) => Promise<boolean>

  /**
   * 创建会员账户
   *
   * @param data 会员账户
   * @returns 保存后的会员账户
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新会员账户
   *
   * @param account 会员账户
   * @param data 更新信息
   * @returns 保存后的会员账户
   */
  update: (account: T, data: Partial<T>) => Promise<T>
}
