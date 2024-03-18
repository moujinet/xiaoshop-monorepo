import type { ITagOption } from '~/types'

/**
 * Settings store message template types
 */
export const SETTINGS_STORE_MESSAGE_TEMPLATE_TYPES: ITagOption[] = [
  { label: '全部', value: 0, theme: 'default' },
  { label: '买家通知', value: 1, theme: 'success' },
  { label: '商家通知', value: 2, theme: 'primary' },
]

/**
 * Settings store message send status
 */
export const SETTINGS_STORE_MESSAGE_SEND_STATUS: ITagOption[] = [
  { label: '全部', value: 0, theme: 'default' },
  { label: '待发送', value: 1, theme: 'warning' },
  { label: '发送成功', value: 2, theme: 'success' },
  { label: '发送失败', value: 3, theme: 'danger' },
]

/**
 * Settings store shipment express invoices
 */
export const SETTINGS_STORE_SHIPMENT_EXPRESS_INVOICES: ITagOption[] = [
  { label: '不支持', value: 0, theme: 'default' },
  { label: '支持', value: 1, theme: 'success' },
]
