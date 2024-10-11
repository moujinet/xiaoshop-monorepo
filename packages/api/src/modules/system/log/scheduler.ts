import type { ISystemLogList } from '@xiaoshop/shared'

import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { ExcelExporterService } from '~/services/excel-exporter/service'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'

import { SystemLogStoreService } from './domain/store/service'

@Injectable()
export class SystemLogScheduler {
  private readonly logger = new Logger(SystemLogScheduler.name)

  constructor(
    @Inject(SystemSettingReadService)
    private readonly settings: SystemSettingReadService,

    @Inject(ExcelExporterService)
    private readonly exporter: ExcelExporterService,

    @Inject(SystemLogStoreService)
    private readonly log: SystemLogStoreService,
  ) {}

  /**
   * 清理日志 (每天 1:00 执行一次)
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCleanupSystemLog() {
    try {
      const options = await this.settings.find('system.log.cleanup.*')

      if (!options.enable)
        return

      const logs = await this.log.findBeforeDays(Number(options.period) || 90)

      if (!logs.length)
        return

      this.logger.debug(`开始备份系统日志, 共计 ${logs.length} 条`)

      this.exporter.export<ISystemLogList>(logs, {
        outDir: 'logs',
        fileName: 'system-log',
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'type', label: '日志类型', dictionary: true },
          { key: 'level', label: '日志等级', dictionary: true },
          { key: 'module', label: '触发模块' },
          { key: 'user', label: '操作人', mapper: value => value.name },
          { key: 'content', label: '日志内容' },
          { key: 'device', label: '操作设备' },
          { key: 'ip', label: '操作 IP' },
          { key: 'createdTime', label: '操作日期' },
        ],
      })

      await this.log.deleteByIds(logs.map(log => log.id))

      this.logger.debug('清理系统日志完成')
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
