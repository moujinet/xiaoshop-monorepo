import type { ISystemLogList } from '@xiaoshop/shared'
import type { ISystemLogRepository } from '@/system/log/model/interface'

import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus'
import { SystemLogRepo } from '@/system/log/model/provider'
import { toSystemLogList } from '@/system/log/model/mapper'
import { ExcelExporterService } from '~/services/excel-exporter'
import { SystemSettingReadService } from '@/system/setting/domain/read/service'

import { SystemLogCleanupEvent } from './events'

@Injectable()
export class SystemLogCleanupService {
  private readonly logger = new Logger(SystemLogCleanupService.name)

  constructor(
    @SystemLogRepo()
    private readonly repo: ISystemLogRepository,

    @Inject(SystemSettingReadService)
    private readonly setting: SystemSettingReadService,

    @Inject(ExcelExporterService)
    private readonly exporter: ExcelExporterService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 每天凌晨 00:00 执行, 清理系统日志
   */
  @Cron(
    CronExpression.EVERY_DAY_AT_MIDNIGHT,
    { name: '@SystemLogCleanup' },
  )
  async handleSystemLogCleanup() {
    try {
      const options = await this.setting.find('system.log.cleanup.*')

      if (!options['system.log.cleanup.enable'])
        return

      const logs = await this.repo.findBeforeDays(
        options['system.log.cleanup.beforeDays'],
      ).then(toSystemLogList)

      if (!logs.length)
        return

      await this.exportExcel(logs)

      await this.cleanup(
        options['system.log.cleanup.beforeDays'],
        logs.map(log => log.id),
      )
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  /**
   * 导出系统日志 Excel
   *
   * @param logs 系统日志
   */
  async exportExcel(logs: ISystemLogList[]) {
    try {
      const output = this.exporter.export<ISystemLogList>(logs, {
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

      this.logger.debug(`导出系统日志 - ${output}`)
    }
    catch (e) {
      throw new FailedException('导出系统日志', e.message)
    }
  }

  /**
   * 清理系统日志
   *
   * @param days 天数
   * @param ids 日志 ID 列表
   */
  async cleanup(days: number, ids: number[]) {
    try {
      await this.repo.destroyByIds(ids)

      this.event.emit(
        new SystemLogCleanupEvent(days, ids.length),
      )
    }
    catch (e) {
      throw new FailedException('自动清理通知', e.message)
    }
  }
}
