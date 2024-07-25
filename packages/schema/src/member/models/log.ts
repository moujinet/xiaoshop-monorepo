import type { IMemberInfo } from '@/member/models'
import type { IMemberLogType, IMemberSource } from '@/member/types'

/**
 * 会员日志
 */
export interface IMemberLog {
  /**
   * 日志编号
   */
  id: number
  /**
   * 日志类型
   *
   * @see {@link IMemberLogType}
   */
  type: IMemberLogType
  /**
   * 日志来源
   *
   * @see {@link IMemberSource}
   */
  source: IMemberSource
  /**
   * 会员信息
   *
   * @see {@link IMemberInfo}
   */
  member: IMemberInfo
  /**
   * 日志操作
   */
  action: string
  /**
   * 日志内容
   */
  content: string
  /**
   * 额外信息
   *
   * @see {@link IMemberLogExtra}
   */
  extra: IMemberLogExtra
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 日志额外信息
 */
export interface IMemberLogExtra {
  /**
   * IP 地址
   */
  ipAddress: string
  /**
   * 额外信息
   */
  [key: string]: any
}

/**
 * 会员常规操作日志
 */
export type IMemberOperateLog = Omit<IMemberLog, 'type'>

/**
 * 会员浏览商品日志
 */
export type IMemberVisitLog = Omit<IMemberLog, 'type' | 'source' | 'action' | 'content'>

/**
 * 会员收藏商品日志
 */
export type IMemberFavoriteLog = Omit<IMemberLog, 'type' | 'source' | 'action' | 'content'>

/**
 * 会员积分变动日志
 */
export type IMemberPointsLog = Omit<IMemberLog, 'type'>
