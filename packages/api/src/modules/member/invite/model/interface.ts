import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { MemberInviteEntity } from './entity'

export type IMemberInviteSelect = FindManyOptions<MemberInviteEntity>['select']
export type IMemberInviteWhere = FindManyOptions<MemberInviteEntity>['where']

export interface IMemberInviteRepository<T = MemberInviteEntity> {
  /**
   * 查询会员邀请信息分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 会员邀请信息分页列表
   */
  findAndCount: (where: IMemberInviteWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询会员邀请信息列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 会员邀请信息列表
   */
  find: (where: IMemberInviteWhere, select?: IMemberInviteSelect) => Promise<T[]>

  /**
   * 根据条件查询会员邀请信息
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 会员邀请信息
   */
  findOne: (where: IMemberInviteWhere, select?: IMemberInviteSelect) => Promise<T>

  /**
   * 根据 ID 查询会员邀请信息
   *
   * @param id 会员邀请信息 ID
   * @param select 查询字段
   * @returns 会员邀请信息
   */
  findById: (id: number, select?: IMemberInviteSelect) => Promise<T>

  /**
   * 判断会员邀请信息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberInviteWhere) => Promise<boolean>

  /**
   * 创建会员邀请信息
   *
   * @param data 会员邀请信息
   * @returns 保存后的会员邀请信息
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 创建会员邀请信息实例
   *
   * @param entity 实例数据
   * @returns 会员邀请信息实例
   */
  newEntity: (entity: DeepPartial<T>) => T
}
