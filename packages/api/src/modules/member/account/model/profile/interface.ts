import type { FindManyOptions, Repository } from 'typeorm'
import type { IApiPaginationData } from '@xiaoshop/shared'

import { MemberProfileEntity } from './entity'

export type IMemberProfileSelect = FindManyOptions<MemberProfileEntity>['select']
export type IMemberProfileWhere = FindManyOptions<MemberProfileEntity>['where']
export type IMemberProfileRelations = FindManyOptions<MemberProfileEntity>['relations']

export interface IMemberProfileRepository<T = MemberProfileEntity> {
  /**
   * 查询会员信息分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 会员信息分页列表
   */
  findAndCount: (where: IMemberProfileWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询会员信息列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @param relations 关联关系
   * @returns 会员信息列表
   */
  find: (where: IMemberProfileWhere, select?: IMemberProfileSelect, relations?: IMemberProfileRelations) => Promise<T[]>

  /**
   * 根据条件查询会员信息
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 会员信息
   */
  findOne: (where: IMemberProfileWhere, select?: IMemberProfileSelect) => Promise<T>

  /**
   * 判断会员信息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberProfileWhere) => Promise<boolean>

  /**
   * 创建会员信息
   *
   * @param data 会员信息
   * @returns 保存后的会员信息
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新会员信息
   *
   * @param profile 会员信息
   * @param data 更新信息
   * @returns 保存后的会员信息
   */
  update: (profile: T, data: Partial<T>) => Promise<T>

  /**
   * 删除会员信息
   *
   * @param id 会员信息 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 获取 Repository
   *
   * @returns Repository<T>
   */
  getRepository: () => Repository<T>
}
