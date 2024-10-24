import { ISystemLogList } from '@xiaoshop/shared'

import { SYSTEM_USER_STATUSES } from '~/dicts/system/user'
import { objectToDict, pipeDict } from '~/utils/transformer'
import { SYSTEM_LOG_LEVELS, SYSTEM_LOG_TYPES } from '~/dicts/system/log'

import { SystemLogEntity } from './entity'

/**
 * 转换系统日志列表
 *
 * @param logs 系统日志列表
 */
export function toSystemLogList(logs: SystemLogEntity[]) {
  return pipeDict<ISystemLogList>(logs, [
    log => objectToDict(log, 'type', SYSTEM_LOG_TYPES),
    log => objectToDict(log, 'level', SYSTEM_LOG_LEVELS),
    log => objectToDict(log, 'user.status', SYSTEM_USER_STATUSES),
  ])
}
