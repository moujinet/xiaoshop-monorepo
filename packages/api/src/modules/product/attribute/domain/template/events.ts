import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/attribute/constants'

/**
 * Create Product Attribute Template Event
 */
export class ProductAttributeTemplateCreateEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品参数模板 - ${this.templateName}`
  }
}

/**
 * Update Product Attribute Template Event
 */
export class ProductAttributeTemplateUpdateEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品参数模板 - ${this.templateName}`
  }
}

/**
 * Delete Product Attribute Template Event
 */
export class ProductAttributeTemplateDeleteEvent extends AdminEvent {
  constructor(
    public readonly templateId: number,
    public readonly templateName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品参数模板 - ${this.templateName}`
  }
}
