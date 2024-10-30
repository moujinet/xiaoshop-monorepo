import type { FindManyOptions } from 'typeorm'
import type { MemberCardBindEntity } from './entity'
import type { MemberCardEntity } from '../card/entity'

export type IMemberCardBindSelect = FindManyOptions<MemberCardBindEntity>['select']
export type IMemberCardBindWhere = FindManyOptions<MemberCardBindEntity>['where']

export interface IMemberCardBindRepository<T = MemberCardBindEntity> {
  /**
   * 根据条件查询会员绑定信息
   *
   * @param where 查询条件
   * @returns 会员绑定信息
   */
  findOne: (where: IMemberCardBindWhere, select?: IMemberCardBindSelect) => Promise<T>

  /**
   * 判断会员绑定信息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberCardBindWhere) => Promise<boolean>

  /**
   * 创建/更新会员绑定信息
   *
   * @param card 会员卡信息
   * @param data 会员绑定信息
   * @returns 保存后的会员绑定信息
   */
  upsert: (card: MemberCardEntity, data: Partial<T>) => Promise<T>
}
