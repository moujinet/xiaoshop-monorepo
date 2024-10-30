import type { FindManyOptions } from 'typeorm'
import type { IApiPaginationData } from '@xiaoshop/shared'

import { MemberPointsChangeEntity } from './entity'

export type IMemberPointsChangeWhere = FindManyOptions<MemberPointsChangeEntity>['where']

export interface IMemberPointsChangeRepository<T = MemberPointsChangeEntity> {
  /**
   * 查询会员积分变动分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 会员积分变动分页列表
   */
  findAndCount: (where: IMemberPointsChangeWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 创建会员积分变动
   *
   * @param data 会员积分变动
   * @returns 保存后的会员积分变动
   */
  create: (data: Partial<T>) => Promise<T>
}
