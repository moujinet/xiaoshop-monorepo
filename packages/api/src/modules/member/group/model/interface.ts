import type { FindManyOptions } from 'typeorm'
import type { IApiPaginationData, IMemberGroupInfo, MemberGroupFilterKey, MemberGroupFilterOperator } from '@xiaoshop/shared'

import { MemberGroupEntity } from './entity'

export type IMemberGroupSelect = FindManyOptions<MemberGroupEntity>['select']
export type IMemberGroupWhere = FindManyOptions<MemberGroupEntity>['where']

export type IMemberGroupInfoPayload = Pick<
  IMemberGroupInfo,
  | 'name'
>
& Partial<
  Pick<IMemberGroupInfo, 'desc' | 'total'>
>
& {
  filters: IMemberGroupFilterPayload[]
}

export interface IMemberGroupFilterPayload {
  /**
   * 筛选条件标识
   */
  key: MemberGroupFilterKey
  /**
   * 筛选条件运算符
   */
  operator: MemberGroupFilterOperator
  /**
   * 筛选条件名
   */
  name: string
  /**
   * 筛选条件值
   */
  value: Array<string | number>
}

export interface IMemberGroupRepository<T = MemberGroupEntity> {
  /**
   * 查询会员群体分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 会员群体分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询会员群体列表
   *
   * @param select 查询字段
   * @returns 会员群体列表
   */
  find: (select?: IMemberGroupSelect) => Promise<T[]>

  /**
   * 根据 ID 查询会员群体
   *
   * @param id 会员群体 ID
   * @returns 会员群体
   */
  findById: (id: number, select?: IMemberGroupSelect) => Promise<T>

  /**
   * 判断会员群体是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberGroupWhere) => Promise<boolean>

  /**
   * 创建会员群体
   *
   * @param data 会员群体
   * @returns 保存后的会员群体
   */
  create: (data: IMemberGroupInfoPayload) => Promise<T>

  /**
   * 更新会员群体
   *
   * @param group 会员群体
   * @param data 更新信息
   * @returns 保存后的会员群体
   */
  update: (group: T, data: Partial<IMemberGroupInfoPayload>) => Promise<T>

  /**
   * 删除会员群体
   *
   * @param id 会员群体 ID
   */
  destroy: (id: number) => Promise<void>
}
