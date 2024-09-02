import {
  type IProductExportStatus,
  ProductExportStatus,
} from '@xiaoshop/shared'
import { ProductExportConditionsPayload } from './dto'
import { BaseEvent } from '~/common/events'

/**
 * 商品导出创建事件
 */
export class ProductExportCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly conditions: ProductExportConditionsPayload,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `创建商品导出 (#${this.id}) - ${JSON.stringify(this.conditions)}`
  }
}

/**
 * 商品导出完成事件
 */
export class ProductExportCompletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly status: IProductExportStatus,
    public readonly count: number,
    public readonly filePath: string,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    const status = this.status === ProductExportStatus.COMPLETED ? '成功' : '失败'
    return `商品导出${status} (#${this.id}) - 共 ${this.count} 条 - ${this.filePath}`
  }
}

/**
 * 商品导出删除事件
 */
export class ProductExportDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly filePath: string,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `删除商品导出记录及文件 (#${this.id}) - ${this.filePath}`
  }
}
