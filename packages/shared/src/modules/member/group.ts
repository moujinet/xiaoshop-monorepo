import type { IDict } from '~/common'

import type { MemberGroupFilterKey, MemberGroupFilterOperator } from './constants'

/**
 * 会员群体信息
 */
export interface IMemberGroupInfo {
  /**
   * 会员群体 ID
   */
  id: number
  /**
   * 会员群体名称
   */
  name: string
  /**
   * 会员群体描述
   */
  desc: string
  /**
   * 会员群体筛选条件 (JSON)
   */
  filters: IMemberGroupFilterDict[]
  /**
   * 会员群体人数
   */
  total: number
}

/**
 * 会员群体字典
 */
export type IMemberGroupDict = Pick<
  IMemberGroupInfo,
  | 'id'
  | 'name'
>

/**
 * 会员群体列表
 */
export type IMemberGroupList = Pick<
  IMemberGroupInfo,
  | 'id'
  | 'name'
  | `desc`
  | `total`
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 会员群体筛选条件
 */
export interface IMemberGroupFilter {
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

/**
 * 会员群体筛选条件字典
 */
export type IMemberGroupFilterDict = Pick<
  IMemberGroupFilter,
  | 'name'
  | 'value'
> & {
  /**
   * 筛选条件标识
   *
   * @see {@link MemberGroupFilterKey}
   */
  key: IDict
  /**
   * 筛选条件运算符
   *
   * @see {@link MemberGroupFilterOperator}
   */
  operator: IDict
}

/**
 * 会员群体筛选列表
 */
export type IMemberGroupFilterList = Pick<
  IMemberGroupInfo,
  | 'id'
  | 'name'
  | 'filters'
  | 'total'
>
