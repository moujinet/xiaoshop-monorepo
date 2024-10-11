import type { FindManyOptions } from 'typeorm'
import type { IApiPaginationData, SystemUserStatus } from '@xiaoshop/shared'

import { CreateSystemUserPayload, UpdateSystemUserPayload } from '@/system/auth/dto/payload'

import { SystemUserEntity } from './entity'

export type ISystemUserSelect = FindManyOptions<SystemUserEntity>['select']

export type ISystemUserWhere = FindManyOptions<SystemUserEntity>['where']

/**
 * 系统用户存储接口
 */
export interface ISystemUserRepository<T = SystemUserEntity> {
  /**
   * 查询分页用户列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 分页用户列表
   */
  findAndCount: (where: ISystemUserWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询用户列表
   *
   * @param select 查询字段
   * @returns 用户列表
   */
  find: (select?: ISystemUserSelect, where?: ISystemUserWhere) => Promise<T[]>

  /**
   * 根据条件查询用户
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 用户
   */
  findOne: (where: ISystemUserWhere, select?: ISystemUserSelect) => Promise<T>

  /**
   * 根据 ID 查询用户信息
   *
   * @param id 用户 ID
   * @returns 用户信息
   */
  findById: (id: number, select?: ISystemUserSelect) => Promise<T>

  /**
   * 判断用户是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: ISystemUserWhere) => Promise<boolean>

  /**
   * 创建用户信息
   *
   * @param data 用户信息
   * @returns 保存后的用户
   */
  create: (data: CreateSystemUserPayload) => Promise<T>

  /**
   * 更新用户信息
   *
   * @param user 用户信息
   * @param data 更新信息
   * @returns 保存后的用户
   */
  update: (user: T, data: UpdateSystemUserPayload) => Promise<T>

  /**
   * 更新用户状态
   *
   * @param id 用户 ID
   * @param status 用户状态
   */
  updateStatus: (id: number, status: SystemUserStatus) => Promise<void>

  /**
   * 更新用户密码
   *
   * @param id 用户 ID
   * @param password 用户密码
   */
  updatePassword: (id: number, password: string) => Promise<void>

  /**
   * 更新用户登录时间
   *
   * @param id 用户 ID
   * @param ip 登录 IP 及地区
   * @param time 登录时间
   */
  updateLoginTime: (id: number, ip: string, time: string) => Promise<void>

  /**
   * 更新用户锁定时间
   *
   * @param id 用户 ID
   * @param ip 锁定 IP 及地区
   * @param time 锁定时间
   */
  updateLockTime: (id: number, ip: string, time: string) => Promise<void>

  /**
   * 删除用户
   *
   * @param id 用户 ID
   */
  destroy: (id: number) => Promise<void>
}
