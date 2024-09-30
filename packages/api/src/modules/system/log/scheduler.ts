import type { ISystemLogList } from '@xiaoshop/shared'

import { utils, writeFile } from 'xlsx'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { ensureDir } from '~/utils'
import { nowStr } from '~/utils/datetime'
import { SystemSettingService } from '@/system/setting/setting/service'

import { SystemLogService } from './service'

@Injectable()
export class SystemLogScheduler {
  private readonly logger = new Logger(SystemLogScheduler.name)
  private period: number = 0

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(SystemSettingService)
    private readonly settings: SystemSettingService,

    @Inject(SystemLogService)
    private readonly log: SystemLogService,
  ) {}

  /**
   * 清理日志 (每天 1:00 执行一次)
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCleanupSystemLog() {
    try {
      const options = await this.settings.findByKey('system.log.*')

      if (!options.enableCleanup)
        return

      this.period = Number(options.cleanupPeriod) || 90

      const logs = await this.log.findListBeforeDays(this.period)

      if (!logs.length)
        return

      this.logger.debug(`开始备份系统日志, 共计 ${logs.length} 条`)

      await this.exportSystemLogs(logs)
      await this.log.deleteByIds(logs.map(log => log.id))

      this.logger.debug('清理系统日志完成')
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 导出系统日志
   *
   * @param logs 系统日志
   */
  async exportSystemLogs(logs: ISystemLogList[]) {
    const rows: any[] = []

    for (const log of logs) {
      rows.push({
        id: log.id,
        type: log.type.value,
        level: log.level.value,
        module: log.module,
        user: log.user.name,
        content: log.content,
        device: log.device,
        ip: log.ip,
        createdTime: log.createdTime,
      })
    }

    const workbook = utils.book_new()
    const worksheet = utils.json_to_sheet(logs)

    utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    utils.sheet_add_aoa(worksheet, [[
      'ID',
      '日志类型',
      '日志等级',
      '触发模块',
      '操作人',
      '日志内容',
      '操作设备',
      '操作 IP',
      '操作日期',
    ]], { origin: 'A1' })

    worksheet['!cols'] = [
      { wch: rows.reduce((w, r) => Math.max(w, r.id.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.type.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.level.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.module.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.user.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.content.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.device.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.ip.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.createdTime.length), 10) },
    ]

    const backupFolder = this.config.get<string>('backup.path')
    const dest = ensureDir(backupFolder, 'xlsx')
    const returnDest = `${dest.replace(`${backupFolder.replace('./', '')}/`, '')}/${nowStr()}.xlsx`

    writeFile(workbook, `${dest}/${nowStr()}.xlsx`, {
      compression: true,
    })

    this.logger.debug(`备份系统日志成功: ${returnDest}`)

    return returnDest
  }
}
