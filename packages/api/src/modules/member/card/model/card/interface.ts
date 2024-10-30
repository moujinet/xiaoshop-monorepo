import type { FindManyOptions } from 'typeorm'

import { MemberCardEntity } from './entity'

export type IMemberCardSelect = FindManyOptions<MemberCardEntity>['select']
export type IMemberCardWhere = FindManyOptions<MemberCardEntity>['where']

export interface IMemberCardRepository<T = MemberCardEntity> {
  /**
   * 查询会员卡列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 会员卡列表
   */
  find: (where: IMemberCardWhere, select?: IMemberCardSelect) => Promise<T[]>

  /**
   * 根据 ID 查询会员卡
   *
   * @param id 会员卡 ID
   * @returns 会员卡
   */
  findById: (id: number, select?: IMemberCardSelect) => Promise<T>

  /**
   * 判断会员卡是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberCardWhere) => Promise<boolean>

  /**
   * 创建会员卡
   *
   * @param data 会员卡
   * @returns 保存后的会员卡
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新会员卡
   *
   * @param card 会员卡
   * @param data 更新信息
   * @returns 保存后的会员卡
   */
  update: (card: T, data: Partial<T>) => Promise<T>

  /**
   * 删除会员卡
   *
   * @param id 会员卡 ID
   */
  destroy: (id: number) => Promise<void>
}
