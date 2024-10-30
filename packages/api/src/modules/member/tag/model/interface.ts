import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { MemberTagEntity } from './entity'

export type IMemberTagSelect = FindManyOptions<MemberTagEntity>['select']
export type IMemberTagWhere = FindManyOptions<MemberTagEntity>['where']

export interface IMemberTagRepository<T = MemberTagEntity> {
  /**
   * 查询会员标签分页列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 会员标签分页列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询会员标签列表
   *
   * @param select 查询字段
   * @returns 会员标签列表
   */
  find: (select?: IMemberTagSelect) => Promise<T[]>

  /**
   * 根据 ID 查询会员标签
   *
   * @param id 会员标签 ID
   * @returns 会员标签
   */
  findById: (id: number, select?: IMemberTagSelect) => Promise<T>

  /**
   * 判断会员标签是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberTagWhere) => Promise<boolean>

  /**
   * 创建会员标签
   *
   * @param data 会员标签
   * @returns 保存后的会员标签
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新会员标签
   *
   * @param MemberTag 会员标签
   * @param data 更新信息
   * @returns 保存后的会员标签
   */
  update: (MemberTag: T, data: Partial<T>) => Promise<T>

  /**
   * 删除会员标签
   *
   * @param id 会员标签 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建会员标签实例
   *
   * @param entity 实例数据
   * @returns 会员标签实例
   */
  newEntity: (entity: DeepPartial<T>) => T
}
