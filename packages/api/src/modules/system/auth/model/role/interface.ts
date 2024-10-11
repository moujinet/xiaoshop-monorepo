import type { FindManyOptions } from 'typeorm'
import type { IApiPaginationData } from '@xiaoshop/shared'

import { SystemRoleEntity } from './entity'

export type ISystemRoleSelect = FindManyOptions<SystemRoleEntity>['select']

export type ISystemRoleWhere = FindManyOptions<SystemRoleEntity>['where']

/**
 * 系统角色存储接口
 */
export interface ISystemRoleRepository<T = SystemRoleEntity> {
  /**
   * 查询分页角色列表
   *
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 分页角色列表
   */
  findAndCount: (page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询角色列表
   *
   * @param select 查询字段
   * @returns 角色列表
   */
  find: (select: ISystemRoleSelect) => Promise<T[]>

  /**
   * 根据 ID 查询角色信息
   *
   * @param id 角色 ID
   * @returns 角色信息
   */
  findById: (id: number, select?: ISystemRoleSelect) => Promise<T>

  /**
   * 判断角色是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: ISystemRoleWhere) => Promise<boolean>

  /**
   * 创建角色信息
   *
   * @param data 角色信息
   * @returns 保存后的角色
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新角色信息
   *
   * @param role 角色信息
   * @param data 更新信息
   * @returns 保存后的角色
   */
  update: (role: T, data: Partial<T>) => Promise<T>

  /**
   * 删除角色
   *
   * @param id 角色 ID
   */
  destroy: (id: number) => Promise<void>
}
