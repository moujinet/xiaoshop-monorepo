/**
 * 系统定时任务信息
 */
export interface ISystemMonitorCronInfo {
  /**
   * 任务 ID
   */
  id: number
  /**
   * 任务标识
   */
  key: string
  /**
   * 所在模块
   */
  module: string
  /**
   * 任务名称
   */
  name: string
  /**
   * 任务描述
   */
  desc: string
  /**
   * 定时时间
   */
  cron: string
  /**
   * 最后执行结果
   */
  result: string
  /**
   * 最后执行时间
   */
  lastExecTime: string
}

/**
 * 系统定时任务列表
 */
export type ISystemMonitorCronList = ISystemMonitorCronInfo
